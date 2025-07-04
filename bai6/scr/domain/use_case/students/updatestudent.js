const Student = require('../../domain/entity/student.js');
class UpdateStudent {
    constructor(studentRepository) {
        this.studentRepository = studentRepository;
    }

    async execute(studentId, studentData) {
        const updatedStudent = new Student(
            studentId,
            studentData.name,
            studentData.age,
            studentData.address,
            studentData.classroom,
            studentData.courseIds || []
        );

        return await this.studentRepository.updateStudent(studentId, updatedStudent);
    }
}

module.exports = UpdateStudent;
