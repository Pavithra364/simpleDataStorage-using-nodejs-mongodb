var userService = require("../services/userService");

class userController
{

    // List of all users and their count Based on particular id 

    getStudent(req,res)
    {
        let condition = {
            ID_Number : req.params._id
        }
        let projection = {
            _id : 0 
        }
        return userService.findStudent(condition,projection)
            .then((result) => {
                res.status(200).json({
                    status : 200 ,
                    message : "THE STUDENT DATA",
                    data : result
                });
            })
            .catch((err) => {
                res.status(400).json({
                    status : 400 ,
                    message : "UNABLE TO FETCH THE STUDENT DETAIL"
                })
            });
    }

    // The students details based on class wise

    getStudentByclass(req,res)
    {
        let condition = {
            Class : req.query.class
        }
        let projection = {
            _id : 0 
        }
        let list ;
        return userService.findStudent(condition,projection)
            .then((result) => {
                list = result;
                return userService.findCount(condition);
            })
            .then((result) => {
                list = {
                    studentDetails : list,
                    totalStudents : result
                }
                res.status(200).json({
                    status : 200 ,
                    message : "THE STUDENT DATA",
                    data : list
                });
            })
            .catch((err) => {
                res.status(400).json({
                    status : 400 ,
                    message : "UNABLE TO FETCH THE STUDENT DETAIL"
                })
            });
    }

    // Inserting an user 

    insertStudent(req,res){
        let studentInfo = req.body.attribites;
        return userService.insertStudents(studentInfo)
        .then((result) => {
            res.status(200).json({
                status : 200 ,
                message : "THE STUDENT HAS INSERTED SUCCESSFULLY",
                data : result
            });
        })
        .catch((err) => {
            res.status(400).json({
                status : 400 ,
                message : "UNABLE TO INSERT THE STUDENT DETAIL"
            })
        })
    }

    // Upadate the student 

    updateStudent(req,res){
        let attribites = req.body.attribites;
        let updateInfo = {
            class : attribites.class
        }
        let condition = {
            ID_Number : req.query.id,
        }
        return userService.updateStudentDetails(condition,updateInfo)
        .then(() => {
            res.status(400).json({
                status : 400 ,
                message : "UPDATED THE STUDENT DETAILS SUCCESSFULLY"
            })
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({
                status : 400 ,
                message : "UNABLE TO UPDATE THE STUDENT DETAIL"
            })
        })
    }

    // List of all users 

    getAllStudentDetails(req,res)
    {
        let projection = {
            _id : 0 
        }
        return userService.AllStudents(projection)
            .then((result) => {
                res.status(200).json({
                    status : 200 ,
                    message : "THE STUDENTS ARE",
                    data : result
                });
            })
            .catch((err) => {
                res.status(400).json({
                    status : 400 ,
                    message : "UNABLE TO FETCH THE STUDENT DETAILS",
                });
            });
    }

    // Remove the user

    removeStudent(req,res){
        let condition = {
            ID_Number : req.params._id
        }
        return userService.removeStudentById(condition)
        .then((result) => {
            res.status(200).json({
                status : 200 ,
                message : "THE STUDENT HAS REMOVED SUCCESSFULLY",
                data : result
            });
        })
        .catch((err) => {
            res.status(400).json({
                status : 400 ,
                message : "UNABLE TO REMOVE THE STUDENT DETAILS",
            });
        })
    }
}

exports = module.exports = new userController();