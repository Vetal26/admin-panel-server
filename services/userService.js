const bcrypt = require('bcrypt');

const User = require('../models/user');
const tokenService = require('./tokenService');
const ErrorHandler = require('../utils/ErrorHadler');

class UserService {
  async registration(email, password) {
    const candidate = await User.findOne({ email });

    if (candidate) {
      throw ErrorHandler.badRequest(
        `Пользователь с почтовым адресом ${email} уже существует`,
      );
    }

    const hashPassword = await bcrypt.hash(password, 3);

    const user = await User.create({
      email,
      password: hashPassword,
    });

    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user };
  }

  async login(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
      throw ErrorHandler.badRequest('Потльзователь с таким email не найден');
    }

    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ErrorHandler.badRequest('Неверный пароль');
    }

    const tokens = tokenService.generateTokens({ ...user });
    await tokenService.saveToken(user.id, tokens.refreshToken);

    return { ...tokens, user };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);

    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ErrorHandler.unauthorizedError();
    }

    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ErrorHandler.unauthorizedError();
    }

    const user = await User.findById(userData.id);

    const tokens = tokenService.generateTokens({ ...user });
    await tokenService.saveToken(user.id, tokens.refreshToken);

    return { ...tokens, user };
  }

  async getAllUsers() {
    const users = await User.findAll();

    return { users };
  }
}

module.exports = new UserService();
