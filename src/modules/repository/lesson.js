const schemaName = 'lessons';

export class LessonRepository {
    constructor(db) {
        if (db.get(schemaName).value() === undefined)
            db.set(schemaName, {
                'values': [],
                'lastID': 0
            }).write();

        this.db = db;
    }

    add(lesson) {
        let lessons = this.db.get(schemaName).value();
        lessons.lastID++;

        lesson.id = lessons.lastID;
        lessons.values.push(lesson);

        this.db.set(schemaName, lessons).write()
    }

    get() {
        const lessons = this.db.get(schemaName).value();
        return lessons.values;
    }

    delete(id) {
        let lessons = this.db.get(schemaName).value();

        lessons.values = lessons.values.filter((lesson) => {
            return lesson.id !== id;
        })

        this.db.set(schemaName, lessons).write()
    }

    update(lesson) {
        let lessons = this.db.get(schemaName).value();

        lessons.values.find((ls) => {
            ls = lesson;
        });

        this.db.set(schemaName, lessons).write()
    }
}
