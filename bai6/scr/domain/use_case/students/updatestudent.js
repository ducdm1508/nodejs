const Student = require('../entity/student.js');

class updatestudent {
    constructor(studentRepository) {
        this.studentRepository = studentRepository;
    }

     updateStudent(studentId, studentData) {
        return this.studentRepository.updateStudent(studentId, studentData);
    }
}

module.exports = updatestudent;