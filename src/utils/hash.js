const bcrypt = require('bcrypt');

const hashPassword = (password) => bcrypt.hashSync(password,bcrypt.genSaltSync(10));

const validPassword =  (user,password) => bcrypt.compareSync(password,user.password);

module.exports = {
    hashPassword,
validPassword
}