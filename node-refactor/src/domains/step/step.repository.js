const { Step } = require('@src/db/models');

module.exports = {
  async getAllSteps() {
    return await Step.findAll({});
  },

  async findAllStepsByListingId(listingId) {
    return await Step.findAll({
      where: {
        listing_id: listingId,
      },
    });
  },

  async bulkDeleteSteps(deleted) {
    if (deleted.length <= 0) return;
    await Step.destroy({ where: { id: deleted } }); //
  },

  async createStep(stepData, listingId) {
    return await Step.create({
      listing_id: listingId,
      flowId: stepData.flowId,
      name: stepData.name,
      step: stepData.step,
      listingFlow: stepData.listingFlow,
    });
  },

  async bulkCreateSteps(newSteps, listingId) {
    if (newSteps.length === 0) return [];
    const bulkCreate = newSteps.map((newStep) => ({
      listing_id: listingId,
      flowId: newStep.flowId,
      name: newStep.name,
      step: newStep.step,
      listingFlow: newStep.listingFlow,
    }));

    return await Step.bulkCreate(bulkCreate);
  },

  async bulkUpdateSteps(changes) {
    await changes.map(
      async (change) =>
        await Step.update(
          {
            name: change.name,
            step: change.step,
            flowId: change.flowId,
          },
          { where: { id: change.id } },
        ),
    );
  },
};
