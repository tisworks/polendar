export class StudentService {
    static add(student) {
        this.prototype.repository.add(student);
    }

    static get() {
        return this.prototype.repository.get();
    }
}
