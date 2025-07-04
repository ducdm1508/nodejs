const Student = require('../../domain/entity/student.js');

class CreateStudent {
    constructor(studentRepository) {
        this.studentRepository = studentRepository;
    }

    async execute(name, age, address, classroom, courseIds = []) {
        const newStudent = new Student(null,name, age, address, classroom, courseIds);
        return await this.studentRepository.create(newStudent);
    }
}

module.exports = CreateStudent;
