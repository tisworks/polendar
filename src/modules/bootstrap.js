import {StudentService} from "./service/student.js";
import {StudentRepository} from "./repository/student.js";

// database initialization
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

// Services
StudentService.prototype.repository = new StudentRepository(db);
