const express=require("express");
const studentController=require("../controllers/student.controller.js");

const router = express.Router();

// POST request to add a student
router.post("/students", studentController.addStudent);

// GET request to fetch all student details
router.get("/students", studentController.getAllStudents);

// GET request to fetch a student details by registration number
router.get("/students/:regNo", studentController.getStudentByRegNo);

// PUT request to update a student details by registration number
router.put("/students/:regNo", studentController.updateStudentByRegNo);

// DELETE request to remove a student by registration number (Soft Delete)
router.delete("/students/:regNo", studentController.deleteStudentByRegNo);

module.exports=router;
