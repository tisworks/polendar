import {Student} from "../../../modules/model/student.js";
import {StudentService} from "../../../modules/service/student.js"

Vue.component('student-list-item', {
    props: ['student'],

    template: `
    <div class="item">
        <div class="content">
            <a class="header">{{student.name}}</a>
            <div class="description">{{student.phone}}<br>{{student.email}}</div>
        </div>
    </div>
    `
});

Vue.component('student-form', {
    template: `
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
    `,

    methods: {
        add: function () {
            //TODO validate students field
            StudentService.add(this.student)
        },
        cancel: function () {

        }
    },

    data: () => {
        return {
            student: new Student()
        }
    }
});

Vue.component('student-search', {
    template: `
    <div>
        <form class="ui form">
            <div class="field">
                <div class="ui grid">
                    <div class="fourteen wide column">
                        <input type="text" placeholder="Pesquisa..." v-model="searchText">
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
            <student-list-item v-for="st in students" v-bind:key="st.phone" v-bind:student="st">
            </student-list-item>
        </div>
    </div>
    `,

    methods: {
        search: function () {
            this.students = StudentService.get().filter((student) => {
                return student.name.toLowerCase().search(this.searchText) !== -1;
            })
        }
    },

    data: () => {
        return {
            searchText: "",
            students: []
        }
    }
});

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
                <student-form></student-form>
            </div>
            <div class="ui bottom attached tab segment" data-tab="search">
                <student-search></student-search>
            </div>
        </div>
    </div>
    `,
}
