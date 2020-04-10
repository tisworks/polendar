import { Student } from "../../../modules/model/student.js";
import { StudentService } from "../../../modules/service/student.js"

export const StudentForm = {
    template:`
    <div class="ui modal student-form">
        <i class="close icon"></i>
        <div class="header ui center aligned">Cadastro de Aluno</div>
        <div class="ui content">    
            <form class="ui form">
                <div class="field">
                    <label for="student-name">Nome</label>
                    <input type="text" id="student-name" v-model="student.name">
                </div>
                <div class="field">
                    <label for="student-phone">Telefone</label>
                    <input type="text" id="student-phone" v-model="student.phone">
                </div>
                <div class="field">
                    <label for="student-email">Email</label>
                    <input type="text" id="student-email" v-model="student.email">
                </div>
            </form>
        </div>
        <div class="actions">
            <div class="ui negative button">Cancelar</div>
            <div class="ui positive button" v-on:click="add">Adicionar</div> 
        </div>
    </div>
    `,

    methods: {
        add: function() {
            //TODO validate students field
            StudentService.add(this.student)
        }
    },

    data: () => { return {
        student: new Student()
    }}
}
