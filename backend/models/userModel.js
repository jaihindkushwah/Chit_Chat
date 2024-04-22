const mongoose = require("mongoose");
const { passwordEncrypt } = require("../config/passwordEncyptDecrypt");
const bcrypt=require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    pic: {
      type: String,
      default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword=async function(enteredPassword){
  return await bcrypt.compare(enteredPassword,this.password);
}

userSchema.pre("save",async function(next){
  if(!this.isModified){
    next();
  }
  const hashedPassword= await passwordEncrypt(this.password);
  this.password=hashedPassword;
})

const User = mongoose.model("User", userSchema);
module.exports = User;
