const Course = require('../../domain/entities/Course');

class UpdateCourse {
    constructor(courseRepository) {
        this.courseRepository = courseRepository;
    }

    async execute(courseId, data) {
        const course = new Course(courseId, data.name, data.price);
        return await this.courseRepository.update(courseId, course);
    }
}

module.exports = UpdateCourse;
