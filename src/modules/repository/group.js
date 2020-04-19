const schemaName = 'groups';

export class GroupRepository {
    constructor(db) {
        if (db.get(schemaName).value() === undefined)
            db.set(schemaName, {
                'values': [],
                'lastID': 0
            }).write();

        this.db = db;
    }

    add(group) {
        let groups = this.db.get(schemaName).value();
        groups.lastID++;

        group.id = groups.lastID;
        groups.values.push(group);

        this.db.set(schemaName, groups).write()
    }

    get() {
        const groups = this.db.get(schemaName).value();
        return groups.values;
    }

    delete(id) {
        let groups = this.db.get(schemaName).value();

        groups.values = groups.values.filter((group) => {
            return group.id !== id;
        })

        this.db.set(schemaName, groups).write()
    }

    update(group) {
        let groups = this.db.get(schemaName).value();

        groups.values.find((gr) => {
            gr = group;
        })

        this.db.set(schemaName, groups).write()
    }
}
