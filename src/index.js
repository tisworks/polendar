function studentModal() {
    $('.ui.modal.student-modal').modal('show');
}

function teacherModal() {
    $('.ui.modal.teacher-modal').modal('show');
}

new Vue({
    el: '#app',
    methods: {
        studentModal: studentModal,
        teacherModal: teacherModal
    }
})
