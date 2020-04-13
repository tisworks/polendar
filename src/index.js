function studentModal() {
    $('.ui.modal.student-modal').modal('show');
}

function teacherModal() {
    $('.ui.modal.teacher-modal').modal('show');
}

function groupModal() {
    $('.ui.modal.group-modal').modal('show');
}

new Vue({
    el: '#app',
    methods: {
        studentModal: studentModal,
        teacherModal: teacherModal,
        groupModal: groupModal
    }
})
