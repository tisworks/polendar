import { StudentModal } from "./student.js";
import { TeacherModal } from "./teacher.js";
import { LessonModal } from "./lesson.js";

const vtm = require('vue-the-mask')
Vue.use(vtm.TheMask)

Vue.component('student-modal', StudentModal);
Vue.component('teacher-modal', TeacherModal);
Vue.component('lesson-modal', LessonModal);

new Vue({
    el: '#modals'
})
