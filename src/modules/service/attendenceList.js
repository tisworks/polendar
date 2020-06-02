export class AttendenceListService {
    static add(attendenceList) {
        this.prototype.repository.add(attendenceList);
    }

    static get() {
        return this.prototype.repository.get();
    }

    static delete(id) {
        this.prototype.repository.delete(id);
    }

    static update(attendenceList) {
        this.prototype.repository.update(attendenceList);
    }
}
