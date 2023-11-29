const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    "Name": {
        type: String,
    },
    "Email ID": {
        type: String,
    },
    "Mobile": String,
    "Address": String,
    "Country": String,
    "Status": String,
    "error_log": String
})

exports.User = mongoose.model("user", UserSchema);