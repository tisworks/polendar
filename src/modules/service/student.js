export class StudentService {
    static add(student) {
        this.prototype.repository.add(student);
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
