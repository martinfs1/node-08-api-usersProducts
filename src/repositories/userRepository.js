const User = require("../models/users");
const bcrypt = require("bcrypt");

class UserRepository {
  constructor() {}

  async save(user) {
    user.password = await bcrypt.hash(user.password, 10);
    return await User.create(user);
  }
  async findAllWithPaginate(filter, options) {
    return await User.paginate(filter, options);
  }
  async findAll() {
    return await User.find();
  }
  async findById(id) {
    return await User.findById(id);
  }
  async findByEmail(email) {
    return await User.findOne({ email });
  }
  async update(id, user) {
    return await User.findByIdAndUpdate(id, user, { new: true });
  }
  async remove(id) {
    return await User.findByIdAndRemove(id);
  }
}
module.exports = UserRepository;
