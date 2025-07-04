const Course = require('../../domain/entities/Course');

class CreateCourse {
    constructor(courseRepository) {
        this.courseRepository = courseRepository;
    }

    async execute(name, price) {
        const course = new Course(null, name, price);
        return await this.courseRepository.create(course);
    }
}

module.exports = CreateCourse;
