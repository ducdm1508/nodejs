class GetAllStudent {
    constructor(studentRepository) {
        this.studentRepository = studentRepository;
    }

    async execute() {
        return await this.studentRepository.getAllStudent();
    }
}

module.exports = GetAllStudent;
