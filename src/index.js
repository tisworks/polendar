function studentAdd() {
    $('.ui.modal.student-form')
        .modal('show')
    ;
}

new Vue({
    el: '#app',
    methods: {
        studentAdd: studentAdd
    }
})
