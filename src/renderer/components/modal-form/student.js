import { Student } from '../../../modules/model/student.js';
import { StudentService } from '../../../modules/service/student.js';

Vue.component('student-list-item', {
    props: ['student'],

    template: `
        <div class="item" v-if="showItem">
            <div class="content">
                <div class="ui grid">
                    <div class="nine wide column">
                        <a class="header">{{student.name}}</a>
                        <div class="description">
                            {{student.phone}}<br>{{student.email}}
                        </div>        
                    </div>
                    <div class="seven wide right aligned column">
                        <div class="row">
                            <div class="ui negative compact message" v-if="deleteConfirm">
                                Tem certeza?
                                <div class="ui mini compact button" v-on:click="deleteStudent">Sim</div>
                                <div class="ui mini compact button" v-on:click="cancelDelete">Não</div>
                            </div>
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
        </div>
    `,

    methods: {
        trash: function () {
            this.deleteConfirm = true;
        },
        edit: function () {
            this.$emit('edit:student', this.student);
        },
        deleteStudent: function () {
            StudentService.delete(this.student.id);
            this.showItem = false;
        },
        cancelDelete: function () {
            this.deleteConfirm = false;
        },
    },

    data: () => {
        return {
            showItem: true,
            deleteConfirm: false,
        };
    },
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
                        <input type="text" placeholder="Pesquisa..." v-model="searchInput">
                        <div class="ui basic floating dropdown button" id="filter">
                            <div class="text">Filtro</div>
                            <i class="dropdown icon"></i>
                            <div class="menu">
                                <div class="item">Nome</div>
                                <div class="item">Email</div>
                                <div class="item">Telefone</div>
                            </div>
                        </div>
                        <div class="ui icon blue button" v-on:click="search">
                            <i class="search icon"></i>
                        </div>
                    </div>
                </div>
                <div class="center aligned three wide column">
                    <div class="ui blue button" v-on:click="add">Adicionar</div>
                </div>
            </div>
            <div class="ui segment" v-if="showInput">
                <div class="ui grid">
                    <div class="six wide column">
                        <div class="ui fluid labeled input">
                            <div class="ui label">Nome</div>
                            <input type="text" v-model="student.name">
                        </div>
                    </div>
                    <div class="five wide column">
                        <div class="ui fluid labeled input">
                            <div class="ui label">Telefone</div>
                            <input type="text" id="student-phone" v-model="student.phone" v-mask="'(##) # ####-####'">
                        </div>
                    </div>
                    <div class="five wide column">
                        <div class="ui fluid labeled input">
                            <div class="ui label">Email</div>
                            <input type="text" v-model="student.email">
                        </div>
                    </div>
                </div>
                <div class="ui center aligned padded grid">
                    <div class="row">
                        <div class="ui buttons">
                            <button class="ui negative button" v-on:click="cancel">Cancelar</button>
                            <div class="or" data-text="ou"></div>
                            <button class="ui positive button" v-on:click="confirm">Confirmar</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="ui segment scrolling content">
                <div class="ui relaxed divided animated list">
                    <student-list-item v-for="st in students" v-bind:key="st.id" 
                        v-bind:student="st" v-on:edit:student="student = $event; showInput = true">
                    </student-list-item>
                </div>
            </div>
        </div>
    </div>
    `,

    mounted: function () {
        $('.ui.dropdown').dropdown();
    },

    methods: {
        add: function () {
            this.showInput = true;
        },
        cancel: function () {
            this.student = new Student();
            this.showInput = false;
        },
        confirm: function () {
            //TODO validate students field
            if (this.student.id === 0) {
                StudentService.add(this.student);
            } else {
                StudentService.update(this.student);
            }
            this.student = new Student();
            this.showInput = false;
        },
        search: function () {
            const choice = $('#filter').dropdown('get value');

            this.students = StudentService.get().filter((student) => {
                switch (choice) {
                    case 'email':
                        return student.email.toLowerCase().search(this.searchInput.toLowerCase()) !== -1;
                    case 'telefone':
                        return student.phone.search(this.searchInput) !== -1;
                    default:
                        // TODO: Fix not ASCII broken and improve filter match quality
                        return student.name.toLowerCase().search(this.searchInput.toLowerCase()) !== -1;
                }
            });
        },
    },

    data: () => {
        return {
            student: new Student(),
            showInput: false,
            searchInput: '',
            students: [],
        };
    },
};
