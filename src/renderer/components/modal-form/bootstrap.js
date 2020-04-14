import { StudentModal } from "./student.js";
import { TeacherModal } from "./teacher.js";
import { GroupModal } from "./group.js";
import { LessonModal } from "./lesson.js";

const vtm = require('vue-the-mask')
Vue.use(vtm.TheMask)

Vue.component('student-modal', StudentModal);
Vue.component('teacher-modal', TeacherModal);
Vue.component('lesson-modal', LessonModal);
Vue.component('group-modal', GroupModal);

new Vue({
    el: '#modals'
})
