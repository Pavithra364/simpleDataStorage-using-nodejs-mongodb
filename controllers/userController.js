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
        let list
        return userService.findStudent(condition,projection)
            .then((result) => {
                list = result;
                return userService.findCount(condition)
            })
            .then((result) => {
                list = {
                    users : list,
                    totalUsers : result
                }
                res.send(list)
            })
            .catch((err) => {
                res.send("unable to fetch the details");
            });
    }

    // Inserting an user 

    insertStudent(req,res){
        let studentInfo = req.body.attribites;
        return userService.insertStudents(studentInfo)
        .then(() => {
            res.send("THE USER INSERTED SUCCESFULLY");
        })
        .catch((err) => {
            console.log(err);
            res.send("UNABLE TO INSERT");
        })
    }

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
            res.send("THE USER INSERTED SUCCESFULLY");
        })
        .catch((err) => {
            console.log(err);
            res.send("UNABLE TO INSERT");
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
                res.send(result)
            })
            .catch((err) => {
                res.send("ubable to fetch the details");
            });
    }

    // Remove the user

    removeStudent(req,res){
        let condition = {
            ID_Number : req.params._id
        }
        return userService.removeStudentById(condition)
        .then((result) => {
            res.send("The user has deleted successfully");
        })
        .catch((err) => {
            console.log(err);
            res.send("The use has not deleted");
        })
    }
}

exports = module.exports = new userController();