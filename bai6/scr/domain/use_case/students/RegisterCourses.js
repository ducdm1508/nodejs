class RegisterCourses {
    constructor(studentRepository) {
        this.studentRepository = studentRepository;
    }

    async execute(studentId, courseIds = []) {
        if (!studentId || !Array.isArray(courseIds)) {
            throw new Error("Invalid input: studentId và courseIds là bắt buộc");
        }

        return await this.studentRepository.registerCourses(studentId, courseIds);
    }
}

module.exports = RegisterCourses;
