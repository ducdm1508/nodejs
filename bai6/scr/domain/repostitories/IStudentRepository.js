class IStudentRepository {
  create(student) {}
  getById(id) {}
  getAll() {}
  update(id, student) {}
  delete(id) {}
  registerCourses(studentId, courseIds) {}
}
module.exports = IStudentRepository;