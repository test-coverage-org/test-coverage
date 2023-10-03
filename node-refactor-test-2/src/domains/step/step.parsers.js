const fs = require('fs');
const csvParser = require('csv-parser');
const XLSX = require('xlsx');
const { NotImplementedError } = require('@utils/errors');

// Convert some steps values from string into json, such as step and listingFlow
function convertSomeStepsValuesIntoJson(steps) {
  steps.forEach((step) => {
    step.step = JSON.parse(step.step);
    step.listingFlow = JSON.parse(step.listingFlow);
  });
}

// Parse the CSV file given by the user and return the steps
async function parseCsv(file, delimiter = ',') {
  const steps = await new Promise((resolve, reject) => {
    const steps = [];
    fs.createReadStream(file.path)
      .pipe(csvParser({ separator: delimiter, trim: true }))
      .on('data', (row) => {
        steps.push(trimRowValues(row));
      })
      .on('end', () => {
        resolve(steps);
      })
      .on('error', (error) => reject(error));
  });
  convertSomeStepsValuesIntoJson(steps);
  return steps;
}

// Parse the XLSX file given by the user and return the steps
async function parseXlsx(file) {
  const workbook = XLSX.readFile(file.path);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const jsonOutput = XLSX.utils.sheet_to_json(sheet, { raw: false });
  let steps = jsonOutput.map((row) => trimRowValues(row));
  convertSomeStepsValuesIntoJson(steps);
  return steps;
}

// eslint-disable-next-line no-unused-vars
async function parseJson(file) {
  throw new NotImplementedError('Not implemented');
}

// eslint-disable-next-line no-unused-vars
async function parseJs(file) {
  throw new NotImplementedError('Not implemented');
}

// Trim the values of the given row
function trimRowValues(row) {
  const trimmedRow = {};
  for (const [key, value] of Object.entries(row)) {
    trimmedRow[key.trim()] = value.toString().trim();
  }
  return trimmedRow;
}

module.exports = {
  parseCsv,
  parseXlsx,
  parseJson,
  parseJs,
};
