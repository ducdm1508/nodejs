class student {
    constructor(id, name, age, address, classroom, courseId = []) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.address = address;
        this.classroom = classroom;
        this.courseId = courseId;
    }
}
module.exports = student;