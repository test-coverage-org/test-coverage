const HttpStatus = require('http-status');
const logger = require('@utils/logger');

// HttpException is a custom error class that can be used to throw errors with a specific HTTP status code
class HttpException extends Error {
  constructor(code, message, error) {
    super(message);
    this.code = code;
    this.message = message;
    this.error = error;
  }
}

class UnauthorizedException extends HttpException {
  constructor() {
    super(HttpStatus.UNAUTHORIZED, 'Unauthorized. You must login to access this content.');
  }
}

class ValidationException extends HttpException {
  constructor(errors) {
    super(HttpStatus.BAD_REQUEST, 'Validation Error', errors);
  }
}

class ForbiddenException extends HttpException {
  constructor(errorMessage) {
    super(HttpStatus.FORBIDDEN, `Forbidden. You are not allowed to perform this action. ${errorMessage}`);
  }
}

class NotFoundException extends HttpException {
  constructor(model) {
    // eslint-disable-next-line quotes
    super(HttpStatus.NOT_FOUND, `Not found.${model ? " Couldn't find " + model : ''}`);
  }
}

class BadRequestException extends HttpException {
  constructor(errorMessage) {
    super(HttpStatus.BAD_REQUEST, `Bad Request. ${errorMessage}`);
  }
}

class ConflictException extends HttpException {
  constructor(errorCode) {
    super(HttpStatus.CONFLICT, 'Conflict', { error_code: errorCode });
  }
}

class NotSupportedFile extends HttpException {
  constructor(extension) {
    super(HttpStatus.NOT_ACCEPTABLE, `Not supported file ${extension ? 'with extension: ' + extension : ''}`);
  }
}

class ParsingFileError extends HttpException {
  constructor(message, extension) {
    super(HttpStatus.INTERNAL_SERVER_ERROR, `Error parsing the file: ${message}. File with extension: ${extension}`);
  }
}

class NotImplementedError extends HttpException {
  constructor() {
    super(HttpStatus.NOT_IMPLEMENTED, 'Not implemented');
  }
}

// Error handling middleware
function ErrorHandling(error, req, res, next) {
  if (!error) next(error);
  logger.error(error.code + ' ' + error.stack);
  if (error instanceof HttpException) {
    // if (error.code === HttpStatus.INTERNAL_SERVER_ERROR) error(error.message);
    return res.status(error.code).json({
      message: error.message,
      code: error.code,
      errors: error.error,
    });
  }
  return res.status(error.code).json({ message: error.message, code: error.code });
}

// The asyncHandler function
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = {
  UnauthorizedException,
  ValidationException,
  ForbiddenException,
  NotFoundException,
  ConflictException,
  BadRequestException,
  NotSupportedFile,
  ParsingFileError,
  NotImplementedError,
  ErrorHandling,
  asyncHandler,
};
