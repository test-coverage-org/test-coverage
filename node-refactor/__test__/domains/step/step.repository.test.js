/* eslint-disable no-undef */
const {
  findAllStepsByListingId,
  bulkDeleteSteps,
  bulkCreateSteps,
  bulkUpdateSteps,
} = require('@src/domains/step/step.repository');

const { Step } = require('@src/db/models');
jest.mock('@src/db/models');

describe('stepRepository', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('findAllStepsByListingId', () => {
    it('should find all steps by listing ID', async () => {
      const listingId = 1;

      Step.findAll.mockResolvedValue([]);

      await findAllStepsByListingId(listingId);

      expect(Step.findAll).toHaveBeenCalledWith({ where: { listing_id: listingId } });
    });
  });

  describe('bulkDeleteSteps', () => {
    it('should delete steps in bulk', async () => {
      const deleted = [1, 2, 3];

      Step.destroy.mockResolvedValue();

      await bulkDeleteSteps(deleted);

      expect(Step.destroy).toHaveBeenCalledWith({ where: { id: deleted } });
    });
  });

  describe('bulkCreateSteps', () => {
    it('should create steps in bulk', async () => {
      const newSteps = [
        { flowId: 1, name: 'Step 1', step: 'Data 1', listingFlow: 'Flow 1' },
        { flowId: 2, name: 'Step 2', step: 'Data 2', listingFlow: 'Flow 2' },
      ];
      const listingId = 1;

      Step.bulkCreate.mockResolvedValue([]);

      await bulkCreateSteps(newSteps, listingId);

      const bulkCreate = newSteps.map((newStep) => ({
        listing_id: listingId,
        flowId: newStep.flowId,
        name: newStep.name,
        step: newStep.step,
        listingFlow: newStep.listingFlow,
      }));

      expect(Step.bulkCreate).toHaveBeenCalledWith(bulkCreate);
    });
  });

  describe('bulkUpdateSteps', () => {
    it('should update steps in bulk', async () => {
      const changes = [
        { id: 1, flowId: 1, name: 'Updated Step 1', step: 'Updated Data 1' },
        { id: 2, flowId: 2, name: 'Updated Step 2', step: 'Updated Data 2' },
      ];

      Step.update.mockImplementation(() => Promise.resolve());

      await bulkUpdateSteps(changes);

      changes.forEach((change) => {
        expect(Step.update).toHaveBeenCalledWith(
          {
            name: change.name,
            step: change.step,
            flowId: change.flowId,
          },
          { where: { id: change.id } },
        );
      });
    });
  });
});
