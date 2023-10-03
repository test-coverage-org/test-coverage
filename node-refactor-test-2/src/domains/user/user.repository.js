const models = require('@src/db/models');

module.exports = {
  async getAllUsers() {
    return await models.User.findAll({});
  },
  async getUserById(id) {
    return await models.User.findOne({
      where: { id },
      include: [
        {
          model: models.UserRoles,
          as: 'user_roles',
          required: false,
          include: [
            {
              model: models.Role,
              as: 'role',
              attributes: ['name'],
              required: false,
            },
          ],
        },
      ],
    });
  },
};
