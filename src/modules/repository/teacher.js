const schemaName = 'teachers';

export class TeacherRepository {
    constructor(db) {
        if (db.get(schemaName).value() === undefined)
            db.set(schemaName, {
                'values': [],
                'lastID': 0
            }).write();

        this.db = db;
    }

    add(teacher) {
        let teachers = this.db.get(schemaName).value();
        teachers.lastID++;

        teacher.id = teachers.lastID;
        teachers.values.push(teacher);

        this.db.set(schemaName, teachers).write()
    }

    get() {
        const teachers = this.db.get(schemaName).value();
        return teachers.values;
    }

    delete(id) {
        let teachers = this.db.get(schemaName).value();

        teachers.values = teachers.values.filter((teacher) => {
            return teacher.id !== id;
        })

        this.db.set(schemaName, teachers).write()
    }

    update(teacher) {
        let teachers = this.db.get(schemaName).value();

        teachers.values.find((st) => {
            st = teacher;
        })

        this.db.set(schemaName, teachers).write()
    }
}
