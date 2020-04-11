const schemaName = 'students';

export class StudentRepository {
    constructor(db) {
        if (db.get(schemaName).value() === undefined)
            db.set(schemaName, {
                'values': [],
                'lastID': 0
            }).write();

        this.db = db;
    }

    add(student) {
        let students = this.db.get(schemaName).value();
        students.lastID++;

        student.id = students.lastID;
        students.values.push(student);

        this.db.set(schemaName, students).write()
    }

    get() {
        const students = this.db.get(schemaName).value();
        return students.values;
    }

    delete(id) {
        let students = this.db.get(schemaName).value();

        students.values = students.values.filter((student) => {
            return student.id !== id;
        })

        this.db.set(schemaName, students).write()
    }
}
