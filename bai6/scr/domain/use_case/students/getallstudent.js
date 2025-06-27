class getallstudent{
    constructor(studentRepository){
        this.studentRepository = studentRepository;
    }
    execute(){
        return this.studentRepository.getAllStudent();
    }
}
module.exports = getallstudent;