const CreateCourse = require('../../domain/use_case/courses/CreateCourse');
const UpdateCourse = require('../../domain/use_case/courses/UpdateCourse');
const DeleteCourse = require('../../domain/use_case/courses/DeleteCourse');
const GetCourse = require('../../domain/use_case/courses/GetCourse');
const GetAllCourses = require('../../domain/use_case/courses/GetAllCourses');

class CourseController {
    constructor({ courseRepository }) {
        this.courseRepository = courseRepository;
    }

    async createCourse(req, res) {
        try {
            const { name, price } = req.body;
            const useCase = new CreateCourse(this.courseRepository);
            const course = await useCase.execute( name, price);
            res.status(201).json(course);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateCourse(req, res) {
        try {
            const courseId = req.params.id;
            const useCase = new UpdateCourse(this.courseRepository);
            const updated = await useCase.execute(courseId, req.body);
            res.json(updated);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteCourse(req, res) {
        try {
            const courseId = req.params.id;
            const useCase = new DeleteCourse(this.courseRepository);
            const result = await useCase.execute(courseId);
            res.json({ message: "Xóa khóa học thành công", result });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getCourse(req, res) {
        try {
            const courseId = req.params.id;
            const useCase = new GetCourse(this.courseRepository);
            const course = await useCase.execute(courseId);
            if (!course) {
                return res.status(404).json({ error: "Không tìm thấy khóa học" });
            }
            res.json(course);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getAllCourses(req, res) {
        try {
            const useCase = new GetAllCourses(this.courseRepository);
            const courses = await useCase.execute();
            res.json(courses);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = CourseController;
