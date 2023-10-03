const { UnauthorizedException } = require('@utils/errors');
const userRepository = require('@src/domains/user/user.repository');

async function withUserDecoded(req, res, next) {
  // const token = req.cookies.token;
  const userId = req.headers['user-id'];
  if (userId) {
    try {
      let user = await userRepository.getUserById(userId);
      let authorities = user.user_roles ? user.user_roles.map((ur) => ur.role.name) : [];
      req.decoded = {
        user: user,
        authorities: authorities,
      };
      next();
    } catch {
      throw new UnauthorizedException();
    }
  } else {
    throw new UnauthorizedException();
  }
}

module.exports = {
  withUserDecoded,
};
