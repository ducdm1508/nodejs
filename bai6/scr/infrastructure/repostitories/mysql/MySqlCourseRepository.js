const Course = require('../../domain/entities/Course');
const ICourseRepository = require('../../domain/repositories/ICourseRepository');

class MySQLCourseRepository extends ICourseRepository {
    constructor(db) {
        super();
        this.db = db;
    }

    async create(course) {
        const query = `INSERT INTO courses (id, name, price) VALUES (?, ?, ?)`;
        const values = [course.id, course.name, course.price];
        await this.db.execute(query, values);
        return course;
    }

    async getById(id) {
        const [rows] = await this.db.execute(`SELECT * FROM courses WHERE id = ?`, [id]);
        if (rows.length === 0) return null;
        const c = rows[0];
        return new Course(c.id, c.name, c.price);
    }

    async getAll() {
        const [rows] = await this.db.execute(`SELECT * FROM courses`);
        return rows.map(c => new Course(c.id, c.name, c.price));
    }

    async update(id, course) {
        const query = `UPDATE courses SET name = ?, price = ? WHERE id = ?`;
        await this.db.execute(query, [course.name, course.price, id]);
        return { id, ...course };
    }

    async delete(id) {
        const query = `DELETE FROM courses WHERE id = ?`;
        await this.db.execute(query, [id]);
        return { message: `deleted ${id}` };
    }
}

module.exports = MySQLCourseRepository;