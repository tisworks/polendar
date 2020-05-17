import { Teacher } from "../../../modules/model/teacher.js";
import { TeacherService } from "../../../modules/service/teacher.js"

Vue.component('teacher-list-item', {
    props: ['teacher'],

    template: `
        <div class="item" v-if="showItem">
            <div class="content">
                <div class="ui grid">
                    <div class="nine wide column">
                        <a class="header">{{teacher.name}}</a>
                        <div class="description">
                            <b>Tel:</b> {{teacher.phone}}<br><b>Email:</b> {{teacher.email}}
                            <br>
                            <br>                            
                            <b>Banco: </b>{{teacher.bankName}}<br><b>Agência: </b>{{teacher.bankAgency}}<br><b>Conta: </b>{{teacher.bankAccount}}                            
                        </div>              
                    </div>
                    <div class="seven wide right aligned column">
                        <div class="row">
                            <div class="ui negative compact message" v-if="deleteConfirm">
                                Tem certeza?
                                <div class="ui mini compact button" v-on:click="deleteTeacher">Sim</div>
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
            this.$emit('edit:teacher', this.teacher);
        },
        deleteTeacher: function () {
            TeacherService.delete(this.teacher.id);
            this.showItem = false;
        },
        cancelDelete: function () {
            this.deleteConfirm = false;
        }
    },

    data: () => {
        return {
            showItem: true,
            deleteConfirm: false
        }
    }
});

export const TeacherModal = {
    template: `
    <div class="ui modal teacher-modal">
        <i class="close icon"></i>
        <div class="header ui center aligned">Professor</div>
        <div class="ui content">
            <div class="ui grid">
                <div class="thirteen wide column">
                    <div class="ui action input fluid">
                        <input type="text" placeholder="Pesquisa..." v-model="searchInput">
                        <div class="ui basic floating dropdown button" id="filterTeacher">
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
                <div class="ui labeled input">
                    <div class="ui label">Nome</div>
                    <input type="text" v-model="teacher.name">
                </div>
                <div class="ui labeled input">
                    <div class="ui label">Telefone</div>
                    <input type="text" id="teacher-phone" v-model="teacher.phone" v-mask="'(##) # ####-####'">
                </div>
                <div class="ui labeled input">
                    <div class="ui label">Email</div>
                    <input type="text" v-model="teacher.email">
                </div>
                <h4 class="ui dividing header">Dados Bancários</h4>
                <div class="ui labeled input">
                    <div class="ui label">Banco</div>
                    <input type="text" v-model="teacher.bankName">
                </div>
                <div class="ui labeled input">
                    <div class="ui label">Agência</div>
                    <input type="text" v-model="teacher.bankAgency">
                </div>
                <div class="ui labeled input">
                    <div class="ui label">Conta</div>
                    <input type="text" v-model="teacher.bankAccount">
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
                    <teacher-list-item v-for="st in teachers" v-bind:key="st.id" 
                        v-bind:teacher="st" v-on:edit:teacher="teacher = $event; showInput = true">
                    </teacher-list-item>
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
            this.teacher = new Teacher();
            this.showInput = false;
        },
        confirm: function () {
            //TODO validate teachers field
            if (this.teacher.id === 0) {
                TeacherService.add(this.teacher)
            } else {
                TeacherService.update(this.teacher)
            }
            this.teacher = new Teacher()
            this.showInput = false;
        },
        search: function () {
            const choice = $('#filterTeacher').dropdown('get value')

            this.teachers = TeacherService.get().filter((teacher) => {
                switch (choice) {
                    case 'email':
                        return teacher.email.toLowerCase().search(this.searchInput.toLowerCase()) !== -1;
                    case 'telefone':
                        return teacher.phone.search(this.searchInput) !== -1;
                    default:
                        // TODO: Fix not ASCII broken and improve filter match quality
                        return teacher.name.toLowerCase().search(this.searchInput.toLowerCase()) !== -1;
                }
            })
        }
    },

    data: () => {
        return {
            teacher: new Teacher(),
            showInput: false,
            searchInput: "",
            teachers: []
        }
    }
}
