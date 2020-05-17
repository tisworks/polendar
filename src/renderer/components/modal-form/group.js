import { Group } from '../../../modules/model/group.js';
import { GroupService } from '../../../modules/service/group.js';
import { Student } from '../../../modules/model/student.js';
import { StudentService } from '../../../modules/service/student.js';
import { Teacher } from '../../../modules/model/teacher.js';
import { TeacherService } from '../../../modules/service/teacher.js';

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
                            <br><b>Vagas:</b> {{group.numberOfVacancies}}
                            <br><b>Professor(a):</b> {{group.teacher.name}}
                            <br><br><b>Alunos:</b>
                            <div v-for="st in group.studentsIds" :key="st.id">
                                {{st.name}}
                            </div> 
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
        },
    },

    data: () => {
        return {
            showItem: true,
            deleteConfirm: false,
        };
    },
});

Vue.component('teacher-dropdown', {
    props: ['teacher'],

    template: `
        <div class="ui fluid search selection dropdown" id="teacherSelect">
            <input type="hidden" name="teacher">
            <div class="default text"></div>
        </div>
    `,

    mounted: function () {
        this.setTeachersDropdown();
    },

    data: () => {
        return {};
    },

    methods: {
        setTeachersDropdown: function () {
            let teachers = TeacherService.get();
            let teachersDropdown = { placeholder: 'Selecione um(a) Professor(a)', values: [] };

            for (const key in teachers) {
                let selectOp;

                if (this.teacher && teachers[key].id == this.teacher.id) {
                    selectOp = true;
                } else {
                    selectOp = false;
                }

                teachersDropdown.values.push({
                    name: teachers[key].name,
                    value: [teachers[key].id, teachers[key].name],
                    selected: selectOp,
                });
            }

            $('#teacherSelect').dropdown(teachersDropdown);
        },
    },
});

Vue.component('student-dropdown', {
    props: ['students'],

    template: `    
        <div class="ui fluid multiple search normal selection dropdown" id="studentsSelect">
            <input type="hidden">
            <div class="default text"></div>
            <div class="menu"></div>
        </div>
    `,

    mounted: function () {
        this.getStudents();
        $('#studentsSelect').dropdown(this.studentsDropDownList);
    },

    data: () => {
        return {
            studentsDropDownList: {},
        };
    },

    methods: {
        getStudents: function () {
            let allStudents = StudentService.get();
            this.studentsDropDownList = this.filterStudents(allStudents, this.students);
        },
        filterStudents: function (allStudents, students) {
            let studentsDropDownList = { placeholder: 'Selecione os alunos', values: [] };

            allStudents.forEach((e) => {
                let selectedOption = false;

                for (let i in students) {
                    if (students[i].id == e.id) selectedOption = true;
                }

                studentsDropDownList.values.push({
                    name: e.name,
                    value: e.id,
                    selected: selectedOption,
                });
            });

            return studentsDropDownList;
        },
    },
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
                            <div class="ui label">Vagas</div>
                            <input type="text" v-model="group.numberOfVacancies"/>
                        </div>
                    </div>
                    <div class="eight wide column">
                        <teacher-dropdown v-bind:teacher="group.teacher"></teacher-dropdown>
                    </div>
					<div class="sixteen wide column">
                        <student-dropdown v-bind:students="group.studentsIds"></student-dropdown>
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
                    <group-list-item v-for="gp in groups" v-bind:key="gp.id" 
                        v-bind:group="gp" v-on:edit:group="group = $event; showInput = true">
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
            let teacher = $('#teacherSelect').dropdown('get value').split(',');
            let studentsArray = $('#studentsSelect').dropdown('get value').split(',');
            let allStudents = StudentService.get();

            teacher = { id: teacher[0], name: teacher[1] };
            this.group.teacher = teacher;

            let jsonStudents = allStudents.filter((s) => studentsArray.includes(s.id.toString()));

            //TODO tirar opcoes a mais

            jsonStudents = jsonStudents.map((s) => {
                return { id: s.id, name: s.name };
            });

            this.group.studentsIds = jsonStudents;

            if (this.group.id === 0) {
                GroupService.add(this.group);
            } else {
                GroupService.update(this.group);
            }

            this.group = new Group();
            this.showInput = false;
        },
        search: function () {
            const choice = $('#filterGroup').dropdown('get value');

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
            });
        },
    },

    data: () => {
        return {
            group: new Group(),
            student: new Student(),
            showInput: false,
            searchInput: '',
            groups: [],
            students: []
        };
    },
};
