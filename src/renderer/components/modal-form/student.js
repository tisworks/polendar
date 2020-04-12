import {Student} from "../../../modules/model/student.js";
import {StudentService} from "../../../modules/service/student.js"

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
            this.student = new Student()
        },
        cancel: function () {
            this.student = new Student()
        }
    },

    mounted: function () {
        $('.menu .item').tab();
        $('#student-phone').inputmask({"mask": "(99) 9 9999-9999"});
    },

    data: () => {
        return {
            student: new Student()
        }
    }
});

Vue.component('student-list-item', {
    props: ['student'],

    template: `
        <div class="item" v-if="show">
            <div class="content">
                <div class="ui grid">
                    <div class="thirteen wide column">
                        <a class="header">{{student.name}}</a>
                        <div class="description">
                            {{student.phone}}<br>{{student.email}}
                        </div>        
                    </div>
                    <div class="three wide column">
                        <div class="row">
                            <div class="ui icon negative button" v-on:click="trash">
                                <i class="trash icon"></i>
                            </div>
                            <div class="ui icon positive button" v-on:click="edit">
                                <i class="edit icon"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="ui mini modal hidden" :id="'student-delete' + student.id">
                <div class="header">
                    Deletar Aluno
                </div>
                <div class="content">
                    <p>Você tem certeza que deseja deletar o aluno?</p>
                    <p>{{student.name}}</p>
                </div>
                <div class="actions">
                    <div class="ui negative button">
                        Não
                    </div>
                    <div class="ui positive button" v-on:click="deleteStudent">
                        Sim
                    </div>
                </div>
            </div>
            
            <div class="ui mini modal hidden" :id="'student-edit' + student.id">
                <div class="header">
                    Aluno
                </div>
                <div class="content">
                    <p>Você tem certeza que deseja deletar o aluno?</p>
                    <p>{{student.name}}</p>
                </div>
                <div class="actions">
                    <div class="ui negative button">
                        Cancelar
                    </div>
                    <div class="ui positive button" v-on:click="editStudent">
                        Confirmar
                    </div>
                </div>
            </div>
        </div>
    `,

    methods: {
        trash: function () {
            $('#student-delete' + this.student.id)
                .modal('show')
            ;
        },
        edit: function () {
            $('#student-edit' + this.student.id)
                .modal('show')
        },
        deleteStudent: function () {
            StudentService.delete(this.student.id);
            this.show = false;
        },
        editStudent: function () {

        }
    },

    data: () => {
        return {
            show: true,
        }
    }
});

export const StudentModal = {
    template: `
    <div class="ui modal student-modal">
        <i class="close icon"></i>
        <div class="header ui center aligned">Aluno</div>
        <div class="ui content">
            <div class="ui grid">
                <div class="thirteen wide column">
                    <div class="ui action input fluid">
                        <input type="text" placeholder="Pesquisa...">
                        <div class="ui basic floating dropdown button">
                            <div class="text">Filtro</div>
                            <i class="dropdown icon"></i>
                            <div class="menu">
                                <div class="item">Nome</div>
                                <div class="item">Email</div>
                                <div class="item">Telefone</div>
                            </div>
                        </div>
                        <div class="ui icon button"><i class="search icon"></i></div>
                    </div>
                </div>
                <div class="center aligned three wide column">
                    <div class="ui button">Adicionar</div>
                </div>
            </div>
            <div class="ui segment" v-if="showInput">
                <div class="ui labeled input">
                    <div class="ui label">Nome</div>
                    <input type="text">
                </div>
                <div class="ui labeled input">
                    <div class="ui label">Telefone</div>
                    <input type="text">
                </div>
                <div class="ui labeled input">
                    <div class="ui label">Email</div>
                    <input type="text">
                </div>
            </div>
<!--            <div class="ui segment scrolling content">-->
<!--                <div class="ui relaxed divided animated list">-->
<!--                    <student-list-item v-for="st in students" v-bind:key="st.id" v-bind:student="st">-->
<!--                    </student-list-item>-->
<!--                </div>-->
<!--            </div>-->
<!--            <form class="ui form">-->
<!--                <div class="field">-->
<!--                    <div class="ui grid">-->
<!--                        <div class="fourteen wide column">-->
<!--                            <input type="text" placeholder="Pesquisa..." v-model="searchText">-->
<!--                        </div>-->
<!--                        <div class="two wide column">-->
<!--                            <div class="ui icon positive button" v-on:click="search">-->
<!--                                <i class="search icon"></i>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </form>-->
<!--            <div class="ui segment scrolling content">-->
<!--                <div class="ui relaxed divided animated list">-->
<!--                    <student-list-item v-for="st in students" v-bind:key="st.id" v-bind:student="st">-->
<!--                    </student-list-item>-->
<!--                </div>-->
<!--            </div>-->
        </div>
    </div>
    `,

    mounted: function () {
        $('.ui.dropdown').dropdown();
    },

    methods: {
        search: function () {
            // TODO: Fix not ASCII broken
            this.students = StudentService.get().filter((student) => {
                return student.name.toLowerCase().search(this.searchText) !== -1;
            })
        }
    },

    data: () => {
        return {
            showInput: true,
            searchText: "",
            students: []
        }
    }
}
