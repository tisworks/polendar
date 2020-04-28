import { Group } from "../../../modules/model/group.js";
import { GroupService } from "../../../modules/service/group.js"
import { Student } from "../../../modules/model/student.js"
import { StudentService } from "../../../modules/service/student.js"
import { Teacher } from "../../../modules/model/teacher.js";
import { TeacherService } from "../../../modules/service/teacher.js"

Vue.component('group-list-item', {
    props: ['group'],

    template: `
        <div class="item" v-if="showItem">
            <div class="content">
                <div class="ui grid">
                    <div class="nine wide column">
                        <a class="header">{{group.identification}}</a>
                        <div class="description">
                            <b>Modalidade:</b> {{group.modality}}
                            <br><b>Horário:</b> {{group.scheduledTime}}
                            <br><b>Vagas:</b> {{group.numberOfVacancies}}
                            <br><b>Professor(a):</b> {{group.teacherId}}
                            <br><b>Alunos:</b> {{group.studentsIds}}
                        </div>                                     
                    </div>
                    <div class="seven wide right aligned column">
                        <div class="row">
                            <div class="ui negative compact message" v-if="deleteConfirm">
                                Tem certeza?
                                <div class="ui mini compact button" v-on:click="deleteGroup">Sim</div>
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
            this.$emit('edit:group', this.group);
        },
        deleteGroup: function () {
            GroupService.delete(this.group.id);
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

Vue.component('teacher-dropdown', {
    props: ['teacherId'],

    template: `
        <div class="ui fluid search selection dropdown" id="teacherSelect">
            <input type="hidden" name="teacher" v-model="teacherId">
            <div class="default text">Selecione um(a) Professor(a)</div>
            <div class="menu">
                <div class="item" v-bind:id="tc.id" v-for="tc in teachers" :key="tc.id">
                    {{tc.name}}
                </div>
            </div>
        </div>
    `,

    mounted: function () {
        $('#teacherSelect').dropdown();
        this.getTeachers();
    },

    data: () => {
        return {
            teachers: []
        }
    },

    methods: {
        getTeachers: function () {
            this.teachers = TeacherService.get();
        }
    }
});

Vue.component('student-dropdown', {
    props: ['students'],

    template: `    
        <div class="ui fluid multiple search normal selection dropdown" id="studentsSelect">
            <input type="hidden">
            <div class="default text">Selecione os alunos</div>
            <div class="menu">
                <div class="item" v-bind:id="st.id" v-for="st in allStudents" v-bind:key="st.id">{{st.name}}</div>                     
            </div>
        </div>
    `,

    mounted: function () {
        $('#studentsSelect').dropdown();
        this.getStudents();
    },

    data: () => {
        return {
            student: new Student(),
            allStudents: []
        }
    },

    methods: {
        getStudents: function () {
            this.allStudents = StudentService.get();
        }
    }
});

export const GroupModal = {
    template: `
    <div class="ui modal group-modal">
        <i class="close icon"></i>
        <div class="header ui center aligned">Turma</div>
        <div class="ui content">
            <div class="ui grid">
                <div class="thirteen wide column">
                    <div class="ui action input fluid">
                        <input type="text" placeholder="Pesquisa..." v-model="searchInput"/>
                        <div class="ui basic floating dropdown button" id="filterGroup">
                            <div class="text">Filtro</div>
                            <i class="dropdown icon"></i>
                            <div class="menu">
                                <div class="item">Identificação</div>
                                <div class="item">Modalidade</div>
                                <div class="item">Horário</div>
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
                    <div class="eight wide column">
                        <div class="ui fluid labeled input">
                            <div class="ui label">Identificação</div>
                            <input type="text" v-model="group.identification"/>
                        </div>
                    </div>
                    <div class="eight wide column">
                        <div class="ui fluid labeled input">
                            <div class="ui label">Modalidade</div>
                            <input type="text" v-model="group.modality"/>
                        </div>
                    </div>
                    <div class="eight wide column">
                        <div class="ui fluid labeled input">
                            <div class="ui label">Horário</div>
                            <input type="text" v-model="group.scheduledTime"/>
                        </div>
                    </div>
                    <div class="eight wide column">
                        <div class="ui fluid labeled input">
                            <div class="ui label">Vagas</div>
                            <input type="text" v-model="group.numberOfVacancies"/>
                        </div>
                    </div>
                    <div class="sixteen wide column">
                        <teacher-dropdown></teacher-dropdown>
                    </div>
					<div class="sixteen wide column">
                        <student-dropdown></student-dropdown>
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
                    <group-list-item v-for="st in groups" v-bind:key="st.id" 
                        v-bind:group="st" v-on:edit:group="group = $event; showInput = true">
                    </group-list-item>
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
            this.group = new Group();
            this.showInput = false;
        },
        confirm: function () {
            //TODO validate groups field 
            let studentsArray = $('#studentsSelect').dropdown('get value');
            let teacher = $('#teacherSelect').dropdown('get value');

            this.group.studentsIds = studentsArray;
            this.group.teacherId = teacher;

            if (this.group.id === 0) {
                GroupService.add(this.group)
            } else {
                GroupService.update(this.group)
            }

            this.group = new Group()
            this.showInput = false;
        },
        search: function () {
            const choice = $('#filterGroup').dropdown('get value')

            this.groups = GroupService.get().filter((group) => {
                switch (choice) {
                    case 'modalidade':
                        return group.modality.toLowerCase().search(this.searchInput.toLowerCase()) !== -1;
                    case 'horário':
                        return group.scheduledTime.search(this.searchInput) !== -1;
                    default:
                        // TODO: Fix not ASCII broken and improve filter match quality
                        return group.identification.toLowerCase().search(this.searchInput) !== -1;
                }
            })
        }
    },

    data: () => {
        return {
            group: new Group(),
            student: new Student(),
            showInput: false,
            searchInput: "",
            groups: [],
            students: [],
            teacher: new Teacher(),
            teacherId: ""
        }
    }
}
