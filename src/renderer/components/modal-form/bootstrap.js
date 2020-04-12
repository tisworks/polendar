import { StudentModal } from "./student.js";
import { TeacherModal } from "./teacher.js";

const vtm = require('vue-the-mask')
Vue.use(vtm.TheMask)

Vue.component('student-modal', StudentModal);
Vue.component('teacher-modal', TeacherModal);

new Vue({
    el: '#modals'
})
