export class GroupService {
    static add(group) {
        this.prototype.repository.add(group);
    }

    static get() {
        return this.prototype.repository.get();
    }

    static delete(id) {
        this.prototype.repository.delete(id);
    }

    static update(group) {
        this.prototype.repository.update(group);
    }
}
