function studentAdd() {
    $('.ui.modal.student-modal').modal('show');
    $('.menu .item').tab();
}

new Vue({
    el: '#app',
    methods: {
        studentAdd: studentAdd
    }
})
