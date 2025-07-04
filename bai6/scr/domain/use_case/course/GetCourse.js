class GetCourse {
    constructor(courseRepository) {
        this.courseRepository = courseRepository;
    }

    async execute(courseId) {
        return await this.courseRepository.getById(courseId);
    }
}
module.exports = GetCourse;
