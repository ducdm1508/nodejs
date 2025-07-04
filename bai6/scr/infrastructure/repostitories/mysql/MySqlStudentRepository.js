const Student = require('../../domain/entities/Student');
const IStudentRepository = require('../../../domain/repositories/IStudentRepository');

class MySQLStudentRepository extends IStudentRepository {
    constructor(db) {
        super();
        this.db = db; // db là connection mysql2/promise hoặc callback
    }

    async create(student) {
        const query = `
            INSERT INTO students (id, name, age, address, classroom, course_ids)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const values = [
            student.id,
            student.name,
            student.age,
            student.address,
            student.classroom,
            JSON.stringify(student.courseId || [])
        ];
        await this.db.execute(query, values);
        return student;
    }

    async getById(id) {
        const [rows] = await this.db.execute('SELECT * FROM students WHERE id = ?', [id]);
        if (rows.length === 0) return null;
        const s = rows[0];
        return new Student(
            s.id,
            s.name,
            s.age,
            s.address,
            s.classroom,
            JSON.parse(s.course_ids || '[]')
        );
    }

    async getAll() {
        const [rows] = await this.db.execute('SELECT * FROM students');
        return rows.map(s => new Student(
            s.id,
            s.name,
            s.age,
            s.address,
            s.classroom,
            JSON.parse(s.course_ids || '[]')
        ));
    }

    async update(id, student) {
        const query = `
            UPDATE students
            SET name = ?, age = ?, address = ?, classroom = ?, course_ids = ?
            WHERE id = ?
        `;
        const values = [
            student.name,
            student.age,
            student.address,
            student.classroom,
            JSON.stringify(student.courseId || []),
            id
        ];
        await this.db.execute(query, values);
        return { id, ...student };
    }

    async delete(id) {
        await this.db.execute('DELETE FROM students WHERE id = ?', [id]);
        return { message: `deleteted ${id}` };
    }

    async registerCourses(studentId, courseIds) {
        await this.db.execute(
            'UPDATE students SET course_ids = ? WHERE id = ?',
            [JSON.stringify(courseIds), studentId]
        );
        return { studentId, courseIds };
    }
}

module.exports = MySQLStudentRepository;