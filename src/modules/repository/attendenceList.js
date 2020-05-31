const schemaName = 'attendenceLists';

export class AttendenceListRepository {
    constructor(db) {
        if (db.get(schemaName).value() === undefined)
            db.set(schemaName, {
                'values': [],
                'lastID': 0
            }).write();

        this.db = db;
    }

    add(attendenceList) {
        let attendenceLists = this.db.get(schemaName).value();
        attendenceLists.lastID++;

        attendenceList.id = attendenceLists.lastID;
        attendenceLists.values.push(attendenceList);

        this.db.set(schemaName, attendenceLists).write()
    }

    get() {
        const attendenceLists = this.db.get(schemaName).value();
        return attendenceLists.values;
    }

    delete(id) {
        let attendenceLists = this.db.get(schemaName).value();

        attendenceLists.values = attendenceLists.values.filter((attendenceList) => {
            return attendenceList.id !== id;
        })

        this.db.set(schemaName, attendenceLists).write()
    }

    update(attendenceList) {
        let attendenceLists = this.db.get(schemaName).value();

        attendenceLists.values.find((gr) => {
            gr = attendenceList;
        })

        this.db.set(schemaName, attendenceLists).write()
    }
}
