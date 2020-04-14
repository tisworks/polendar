export class LessonService {
    static add(lesson) {
        this.prototype.repository.add(lesson);
    }

    static get() {
        return this.prototype.repository.get();
    }

    static delete(id) {
        this.prototype.repository.delete(id);
    }

    static update(lesson) {
        this.prototype.repository.update(lesson);
    }
}
