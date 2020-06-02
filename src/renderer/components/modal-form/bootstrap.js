import { StudentModal } from "./student.js";
import { TeacherModal } from "./teacher.js";
import { GroupModal } from "./group.js";
import { LessonModal } from "./lesson.js";
import { AttendenceListModal } from "./attendenceList.js";

const vtm = require('vue-the-mask')
Vue.use(vtm.TheMask)

Vue.component('student-modal', StudentModal);
Vue.component('teacher-modal', TeacherModal);
Vue.component('lesson-modal', LessonModal);
Vue.component('group-modal', GroupModal);
Vue.component('attendence-modal', AttendenceListModal);

new Vue({
    el: '#modals'
})
