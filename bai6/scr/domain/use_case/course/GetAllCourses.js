class GetAllCourses {
    constructor(courseRepository) {
        this.courseRepository = courseRepository;
    }

    async execute() {
        return await this.courseRepository.getAll();
    }
}
module.exports = GetAllCourses;
