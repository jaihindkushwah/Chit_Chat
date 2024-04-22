const bcrypt=require("bcryptjs");

function passwordMatching(password,hashPassword){
    const match=bcrypt.compareSync(password,hashPassword);
    return match;
}

function passwordEncrypt(password){
    const salt=bcrypt.genSaltSync(10);
    const encryptPassword= bcrypt.hashSync(password,salt);
    return encryptPassword;
}

module.exports = {passwordMatching,passwordEncrypt};