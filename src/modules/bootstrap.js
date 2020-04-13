import { StudentService } from "./service/student.js";
import { StudentRepository } from "./repository/student.js";
import { TeacherService } from "./service/teacher.js";
import { TeacherRepository } from "./repository/teacher.js";
import { GroupService } from "./service/group.js";
import { GroupRepository } from "./repository/group.js";

// database initialization
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

// Services
StudentService.prototype.repository = new StudentRepository(db);
TeacherService.prototype.repository = new TeacherRepository(db);
GroupService.prototype.repository = new GroupRepository(db);
