# School Management System (Node.js + Express + Prisma + Supabase)

A **backend API** for managing student records in a school, built using **Node.js, Express, Prisma, and Supabase (PostgreSQL).**  
It supports **CRUD operations** for student records, including **soft deletion**.

---

##  Features

 - **Student Management** - Add, update, retrieve, and delete student records  
 - **Validation** - Ensures data integrity (e.g., unique registration number, valid contact number)  
 - **Pagination** - Fetch students efficiently with pagination  
 - **Structured Code** - Follows MVC architecture (Routes → Controllers → Services)  

---

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database ORM:** Prisma
- **Database:** Supabase (PostgreSQL)
---

## Prerequisites  

Ensure you have the following installed before setting up the project:  

### ✅ Required Software  
- **Node.js** (LTS version recommended) – [Download Here](https://nodejs.org/)  
- **PostgreSQL** (for database management) – [Download Here](https://www.postgresql.org/download/)  
- **Prisma CLI** (installed via npm)  




## Installation & Setup 

Install my-project with npm

```bash
npm install
```
### Set Up Prisma

#### Initialize Prisma
```bash
npx prisma init
```
#### Run Database Migrations
```bash
npx prisma migrate dev --name init

```
### Run the Server
 ```bash
npm start
 ```
### Verify API is Running

Once the server is running, open your browser or use a tool like Postman to check:

```bash
http://localhost:5000
```
## Environment Variables  

Before running the project, create a **`.env`** file in the root directory and configure the necessary environment variables.  

### Example `.env` File  
```env
DATABASE_URL="postgresql://postgres.fawafdptfblwmbrddsid:[YOUR-PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true"

PORT=5000
```

## API Reference

#### Adds a new student record to the database.

```http
POST /students
```
|Field       | Type      | Description                                        |
| :-------------- | :-------- | :------------------------------------------------ |
| `registrationNo` | `string`  | **Required**. Unique student registration number  |
| `name`          | `string`  | **Required**. Student's full name                 |
| `class`         | `string`  | **Required**. Student's class                     |
| `rollNo`        | `number`  | **Required**. Roll number (unique per class)     |
| `contactNumber` | `string`  | **Required**. Contact number (10-digit format)   |
| `status`        | `boolean` | (Optional) Active status (default: `true`)       |

#### Retrieves all student records.
```http
GET /students
```
| Parameter | Type     | Description                                      |
| :-------- | :------- | :----------------------------------------------- |
| `page`    | `number` |  Page number for pagination  |
| `limit`   | `number` |  Number of students per page  |

#### Get Student by Registration Number
```http
GET /students/:regNo
```
| Parameter | Type     | Description                                      |
| :-------- | :------- | :----------------------------------------------- |
| `regNo`   | `string` | **Required**. The registration number of the student |

#### Updates the details of an existing student.
```http
PUT /students/:regNo
```

| Parameter | Type     | Description                                      |
| :-------- | :------- | :----------------------------------------------- |
| `regNo`   | `string` | **Required**. The registration number of the student |

####  Removes a student from the database.
```http
DELETE /students/:regNo
```
| Parameter | Type     | Description                                      |
| :-------- | :------- | :----------------------------------------------- |
| `regNo`   | `string` | **Required**. The registration number of the student |

##  Database Schema

This section provides an overview of the tables and models used in the project.

###  Students Table

| Column          | Type       | Constraints                                  |
| :------------- | :--------- | :-------------------------------------------- |
| `id`           | `integer`  | Primary Key, Auto-increment                   |
| `registrationNo` | `string` | Unique, Required                              |
| `name`         | `string`   | Required                                      |
| `class`        | `string`   | Required                                      |
| `rollNo`       | `integer`  | Required, Unique per class                    |
| `contactNumber` | `string` | Required, 10-digit format                     |
| `status`       | `boolean`  | Default: `true` (active/inactive status)      |
| `createdAt`    | `timestamp` | Auto-generated (record creation timestamp)  |
| `updatedAt`    | `timestamp` | Auto-updated (last modification timestamp)   |

> **Note:** This schema is managed using Prisma ORM and can be updated with migrations.




## Screenshots
### Student Schema
![image](https://github.com/user-attachments/assets/500c2d2e-bf7d-46d3-9735-80d8441e6874)

### Studnet Table
![image](https://github.com/user-attachments/assets/ef4da09b-6ef4-49d9-9e23-ed07885a0107)




