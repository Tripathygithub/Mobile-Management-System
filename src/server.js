const express=require("express");
const studentRoutes=require("./routes/student.route.js");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // Middleware to parse JSON
app.use("/", studentRoutes); // Mount student routes

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
