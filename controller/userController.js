const mongoose = require("mongoose");
const csv = require("csvtojson")
const fs = require("fs")
var formidable = require('formidable');
const { User } = require("../Schema/UserSchema");
const cron = require("cron")

exports.uploadUsers = (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {

            let file = req.files;
            if (!file) {
                return reject({
                    status: "error",
                    statusCode: 500,
                    message: "File not found"
                })
            }

            if (!file.user_upload) {
                return reject(
                    {
                        status: "error",
                        statusCode: 500,
                        message: "Incorrect file uploaded"
                    }
                )
            }


            fs.writeFile("C:/Users/BhuwanSaoji.AzureAD/Desktop/js/mongodb/controller/temp/user_upload.csv", file.user_upload.data, (err) => {
                if (err) {
                    console.error("err", err);
                    return reject({
                        status: "error",
                        statusCode: 500,
                        message: "Something went wrong!!"
                    })
                } else {
                    console.log("File uploaded successfully")
                    return resolve({
                        status: "success",
                        statusCode: 200,
                        message: "File uplaoded!!"
                    })

                }
            })



        } catch (error) {
            console.error(error);
            return reject({
                status: "error",
                statusCode: 500,
                message: "Something went wrong!!"
            })
        }
    })
}


exports.readFile = () => {
    return new Promise(async (resolve, reject) => {
        try {

            if(fs.existsSync("C:/Users/BhuwanSaoji.AzureAD/Desktop/js/mongodb/controller/temp/user_upload.csv") )
                fs.readFile("C:/Users/BhuwanSaoji.AzureAD/Desktop/js/mongodb/controller/temp/user_upload.csv", async (err, file) => {
                    if (err) {
                        console.error(err);
                        return reject({
                            status: "error",
                            statusCode: 500,
                            message: "Something went wrong!!"
                        })
                    }
                    const users = await csv().fromString(file.toString());
                    if (!users || users.length == 0) {
                        fs.promises.unlink("C:/Users/BhuwanSaoji.AzureAD/Desktop/js/mongodb/controller/temp/user_upload.csv")

                        return reject({
                            status: "error",
                            statusCode: 500,
                            message: "File empty"
                        })
                    }
                    for (let user of users) {
                        let errorLog = ""
                        if (!user["Name"] || user["Name"].trim().length == 0) {
                            errorLog = "Name, "
                        }

                        if (!user["Email ID"] || user["Email ID"].trim().length == 0) {
                            errorLog += "Email ID, "
                        }

                        if (!user["Mobile"] || user["Mobile"].trim().length == 0) {
                            errorLog += "Mobile, "
                        }

                        if (errorLog.length != 0) {
                            errorLog += " field/s are missing"
                            user["Status"] = "Inactive",
                            user["error_log"] = errorLog
                        } else {
                            user["Status"] = "Active"
                        }

                        let insert = await User.create(user);


                    }

                    console.log("Data inserted!!")
                    fs.promises.unlink("C:/Users/BhuwanSaoji.AzureAD/Desktop/js/mongodb/controller/temp/user_upload.csv")

                });
            else{
                console.log("File doesnt exists")
            }

        

            return resolve({
                statusCode: 200,
                status: "Success",
                message: "Data inserted successfully"
            })

        } catch (error) {
            console.error(error);
            return reject({
                status: "error",
                statusCode: 500,
                message: "Something went wrong!!"
            })
        }
    })
}



exports.getAllUsers = (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {

            let data = await User.where();
            return resolve({
                status: "Success",
                statusCode: 200,
                data
            })

        } catch (error) {
            console.error(error);
            return reject({
                status: "error",
                statusCode: 500,
                message: "Something went wrong!!"
            })
        }
    })
}