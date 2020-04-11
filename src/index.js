function studentModal() {
    $('.ui.modal.student-modal').modal('show');
}

new Vue({
    el: '#app',
    methods: {
        studentModal: studentModal
    }
})
