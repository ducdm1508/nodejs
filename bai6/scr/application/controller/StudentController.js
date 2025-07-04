const CreateStudent = require('../../domain/use_case/students/Createstudent');
const DeleteStudent = require('../../domain/use_case/students/DeleteStudent');
const UpdateStudent = require('../../domain/use_case/students/UpdateStudent');
const GetAllStudents = require('../../domain/use_case/students/GetAllStudents');
const RegisterCourses = require('../../domain/use_case/students/RegisterCourses');

class StudentController {
    constructor({ studentRepository }) {
        this.studentRepository = studentRepository;
    }

    async createStudent(req, res) {
        try {
            const { id, name, age, address, classroom, courseIds } = req.body;
            const useCase = new CreateStudent(this.studentRepository);
            const student = await useCase.execute(id, name, age, address, classroom, courseIds);
            res.status(201).json(student);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateStudent(req, res) {
        try {
            const studentId = req.params.id;
            const useCase = new UpdateStudent(this.studentRepository);
            const student = await useCase.execute(studentId, req.body);
            res.json(student);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteStudent(req, res) {
        try {
            const studentId = req.params.id;
            const useCase = new DeleteStudent(this.studentRepository);
            const result = await useCase.execute(studentId);
            res.json({ message: "Xóa thành công", result });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getAllStudents(req, res) {
        try {
            const useCase = new GetAllStudents(this.studentRepository);
            const students = await useCase.execute();
            res.json(students);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async registerCourses(req, res) {
        try {
            const studentId = req.params.id;
            const { courseIds } = req.body;
            const useCase = new RegisterCourses(this.studentRepository);
            const result = await useCase.execute(studentId, courseIds);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = StudentController;
