const studentService=require("../services/student.service.js");
const validateStudent=require('../validations/student.validation.js');

// add student
const addStudent = async (req, res) => {
  try {
    const { registrationNo, name, class: className, rollNo, contactNumber, status } = req.body;

    const validationErrors = validateStudent(req.body); // input validation
    if (validationErrors.length > 0) {
      return res.status(400).json({ error: validationErrors });
    }
   
    const student = await studentService.createStudent({
      registrationNo,
      name,
      class: className,
      rollNo,
      contactNumber,
      status,
    });

    res.status(201).json({ message: "Student added successfully", student });
  } catch (error) {
    console.error("Error adding student:", error);
    res.status(500).json({ error: error.message });
  }
};

// get all students
const getAllStudents = async (req, res) => {
    try {
      const { page,limit} = req.query;
  
      const { students, total, totalPages } = await studentService.getStudents({
        page: parseInt(page),
        limit: parseInt(limit),
      });
  
      res.status(200).json({ total, totalPages, currentPage: page, students });
    } catch (error) {
      console.error("Error fetching students:", error);
      res.status(500).json({ error: error.message });
    }
  };

  // get student by registration number
  const getStudentByRegNo = async (req, res) => {
    try {
      const { regNo } = req.params;
  
      // Validate registration number
      if (!regNo || typeof regNo !== "string") {
        return res.status(400).json({ error: "Invalid registration number format." });
      }
  
      const student = await studentService.findStudentByRegNo(regNo);
  
      if (!student) {
        return res.status(404).json({ error: "Student not found in this registratiion number" });
      }
  
      res.status(200).json({ student });
    } catch (error) {
      console.error("Error fetching student:", error);
      res.status(500).json({ error: error.message });
    }
  };
  // update students by registration number
  const updateStudentByRegNo = async (req, res) => {
    try {
      const { regNo } = req.params;
      const updateData = req.body;
  
      // Validate registration number
      if (!regNo || typeof regNo !== "string") {
        return res.status(400).json({ error: "Invalid registration number format." });
      }
  
      // Check if student exists
      const existingStudent = await studentService.findStudentByRegNo(regNo);
      if (!existingStudent) {
        return res.status(404).json({ error: "Student not found in this registratiion number" });
      }
  
      // Update student details
      const updatedStudent = await studentService.updateStudentDetailsByRegNo(regNo, updateData);
  
      res.status(200).json({ message: "Student updated successfully", student: updatedStudent });
    } catch (error) {
      console.error("Error updating student:", error.message);
      res.status(500).json({ error: error.message });
    }
  };

  // delete student by registratiion number
  const deleteStudentByRegNo = async (req, res) => {
    try {
      const { regNo } = req.params;
  
      // Validate registration number
      if (!regNo || typeof regNo !== "string") {
        return res.status(400).json({ error: "Invalid registration number format." });
      }
  
      // Check if student exists
      const existingStudent = await studentService.findStudentByRegNo(regNo);
      if (!existingStudent) {
        return res.status(404).json({ error: "Student not found in this registration number" });
      }
  
      // Perform soft delete (update status to false)
      await studentService.softDeleteStudentByRegNo(regNo);
  
      res.status(200).json({ message: "Student deactivated successfully" });
    } catch (error) {
      console.error("Error deleting student:", error.message);
      res.status(500).json({ error: error.message });
    }
  };
  
module.exports={ addStudent,getAllStudents,getStudentByRegNo,updateStudentByRegNo,deleteStudentByRegNo};
