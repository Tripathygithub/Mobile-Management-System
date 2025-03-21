const { PrismaClient }=require("@prisma/client");

const prisma = new PrismaClient();

//create student 
const createStudent = async (studentData) => {
  return await prisma.student.create({
    data: studentData,
  });
};

 //get students
const getStudents = async ({ page, limit }) => {
    const skip = (page - 1) * limit; // Calculate the offset
  
    const students = await prisma.student.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: "desc" }, // Order by newest students first
    });
  
    const total = await prisma.student.count(); // Total number of students
    const totalPages = Math.ceil(total / limit);
  
    return { students, total, totalPages };
  };

  // find students by registration number
  const findStudentByRegNo = async (registrationNo) => {
    return await prisma.student.findUnique({
      where: { registrationNo },
    });
  };
  // update students by registration number
  const updateStudentDetailsByRegNo = async (registrationNo, updateData) => {
    return await prisma.student.update({
      where: { registrationNo },
      data: updateData,
    });
  }
  // delete student by registration number
  const softDeleteStudentByRegNo = async (registrationNo) => {
    return await prisma.student.update({
      where: { registrationNo },
      data: { status: false }, // Soft delete by setting status to false
    });
  };


module.exports={ createStudent,getStudents,findStudentByRegNo,updateStudentDetailsByRegNo,softDeleteStudentByRegNo};
