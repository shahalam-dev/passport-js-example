const mongoose = require("mongoose");

exports.connect = async () => {
  try {
    const conn = await mongoose.connect("mongodb://127.0.0.1:27017/pass");
    console.log(`Connected to MongoDB: ${conn.connection.host} successfully`);
  } catch (error) {
    console.log(error);
  }
};

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // trim: true,
    // lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
    // index: true,
    // sparse: true,
  },
  password: {
    type: String,
    required: true,
  },
});

exports.User = mongoose.model("User", UserSchema);
