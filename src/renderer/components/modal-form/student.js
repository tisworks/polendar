import {Student} from "../../../modules/model/student.js";
import {StudentService} from "../../../modules/service/student.js"

export const StudentModal = {
    template: `
    <div class="ui modal student-modal">
        <i class="close icon"></i>
        <div class="header ui center aligned">Aluno</div>
        <div class="ui content">
            <div class="ui top attached tabular menu active">
                <a class="item active" data-tab="add">Adicionar</a>
                <a class="item" data-tab="search">Pesquisar</a>
            </div>
            <div class="ui bottom attached tab segment active" data-tab="add">
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
                    <div class="ui center aligned grid">
                        <div class="column">
                            <div class="ui negative button" v-on:click="cancel">Cancelar</div>
                            <div class="ui positive button" v-on:click="add">Adicionar</div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="ui bottom attached tab segment" data-tab="search">
                <form class="ui form">
                    <div class="field">
                        <div class="ui grid">
                            <div class="fourteen wide column">
                                <input type="text" placeholder="Pesquisa..." v-model="search">
                            </div>
                            <div class="two wide column">
                                <div class="ui positive button" v-on:click="search">
                                    <i class="search icon"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                <div class="ui relaxed divided list">
                    <div class="item">
                        <i class="large github middle aligned icon"></i>
                        <div class="content">
                            <a class="header">Semantic-Org/Semantic-UI</a>
                            <div class="description">Updated 10 mins ago</div>
                        </div>
                    </div>
                    <div class="item">
                        <i class="large github middle aligned icon"></i>
                        <div class="content">
                            <a class="header">Semantic-Org/Semantic-UI-Docs</a>
                            <div class="description">Updated 22 mins ago</div>
                        </div>
                    </div>
                    <div class="item">
                        <i class="large github middle aligned icon"></i>
                        <div class="content">
                            <a class="header">Semantic-Org/Semantic-UI-Meteor</a>
                            <div class="description">Updated 34 mins ago</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,

    methods: {
        add: function () {
            //TODO validate students field
            StudentService.add(this.student)
        }
    },

    data: () => {
        return {
            student: new Student()
        }
    }
}
