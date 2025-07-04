class DeleteCourse {
    constructor(courseRepository) {
        this.courseRepository = courseRepository;
    }

    async execute(courseId) {
        return await this.courseRepository.delete(courseId);
    }
}
module.exports = DeleteCourse;
