import { StudentModal } from "./student.js";

const vtm = require('vue-the-mask')
Vue.use(vtm.TheMask)

Vue.component('student-modal', StudentModal);

new Vue({
    el: '#modals'
})

