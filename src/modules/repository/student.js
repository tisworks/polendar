const schemaName = 'students';

export class StudentRepository {
    constructor(db) {
        if (db.get(schemaName).value() === undefined)
            db.set(schemaName, []).write();

        this.db = db;
    }

    add(student) {
        this.db.get(schemaName).push(student).write()
    }
}
