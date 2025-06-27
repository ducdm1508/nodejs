const student = require('../entity/student.js');

class createstudent {
    constructor(studentRepository) {
        this.studentRepository = studentRepository;
    }

    executor(name, age, address, classroom, courseId = []){
        const newStudent = new student(name, age, address, classroom, courseId);
        return this.studentRepository.create(newStudent);
    }
}

module.exports = createstudent;