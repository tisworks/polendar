export class TeacherService {
    static add(teacher) {
        this.prototype.repository.add(teacher);
    }

    static get() {
        return this.prototype.repository.get();
    }

    static delete(id) {
        this.prototype.repository.delete(id);
    }

    static update(student) {
        this.prototype.repository.update(student);
    }
}
