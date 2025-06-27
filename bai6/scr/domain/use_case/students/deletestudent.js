class deletestudent {
    constructor(studentRepository) {
        this.studentRepository = studentRepository;
    }
    execute(id) {
        return this.studentRepository.delete(id);
    }

}