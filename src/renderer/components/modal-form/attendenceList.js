import { AttendenceList } from '../../../modules/model/attendenceList.js';
import { AttendenceListService } from '../../../modules/service/attendenceList.js';
import { GroupService } from '../../../modules/service/group.js';
import { LessonService } from '../../../modules/service/lesson.js';
import { StudentService } from '../../../modules/service/student.js';

Vue.component('attendenceList-list-item', {
    props: ['attendenceList'],

    template: `
        <div class="item" v-if="showItem">
            <div class="content">
                <div class="ui grid">
                    <div class="nine wide column">
                        <a class="header">{{attendenceList.lesson.type}}</a>                        
                        <div class="description">
                            <b>Alunos presentes:</b>
                            <div v-for="st in attendenceList.studentList" :key="st.id">
                                {{st.name}}
                            </div> 
                        </div>        
                    </div>
                    <div class="seven wide right aligned column">
                        <div class="row">
                            <div class="ui negative compact message" v-if="deleteConfirm">
                                Tem certeza?
                                <div class="ui mini compact button" v-on:click="deleteAttendenceList">Sim</div>
                                <div class="ui mini compact button" v-on:click="cancelDelete">Não</div>
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
            this.$emit('edit:attendenceList', this.attendenceList);
        },
        deleteAttendenceList: function () {
            attendenceList.delete(this.attendenceList.id);
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

Vue.component('student-dropdown', {
    props: ['lesson', 'students'],

    template: `    
        <div class="ui fluid multiple search normal selection dropdown" id="studentsListSelect">
            <input type="hidden">
            <div class="default text"></div>
            <div class="menu"></div>
        </div>
    `,

    mounted: function () {
        this.getStudents();
        $('#studentsListSelect').dropdown(this.studentsDropDownList);
    },

    data: () => {
        return {
            studentsDropDownList: {},
        };
    },

    methods: {
        getStudents: function () {
            console.log(this.lesson);
            console.log(this.students);
            let group = LessonService.get().filter((l) => l.id == this.lesson.id)[0].group;
            let allStudents = GroupService.get().filter((g) => g.id == group.id)[0].studentsIds;
            this.studentsDropDownList = this.filterStudents(allStudents, this.students);
        },
        filterStudents: function (allStudents, students) {
            let studentsDropDownList = { placeholder: 'Selecione os alunos presentes', values: [] };

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

export const AttendenceListModal = {
    template: `
    <div class="ui modal attendenceList-modal">
        <i class="close icon"></i>
        <div class="header ui center aligned">Lista de Presença</div>
        <div class="ui content">
            <div class="ui grid" v-if="!showInput">
                <div class="sixteen wide column">
                    <div class="ui action input fluid">
                        <input type="text" placeholder="Pesquisa por aula..." v-model="searchInput">
                        <div class="ui icon blue button" v-on:click="search">
                            <i class="search icon"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="ui segment" v-if="showInput">
                <div class="ui grid">
                    <div class="sixteen wide column">
                        <div class="ui fluid labeled input">
                            <div class="ui label">Aula</div>
                            <div class="ui disabled input">
                                <input type="text" v-model="attendenceList.lesson.type"/>
                            </div>                            
                        </div>
                    </div>
                    <div class="sixteen wide column">
                        <student-dropdown v-bind:lesson="attendenceList.lesson" v-bind:students="attendenceList.studentList"></student-dropdown>
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
            <div class="ui segment scrolling content" v-if="!showInput">
                <div class="ui relaxed divided animated list">
                    <attendenceList-list-item v-for="al in attendenceLists" v-bind:key="al.id" 
                        v-bind:attendenceList="al" v-on:edit:attendenceList="attendenceList = $event; showInput = true">
                    </attendenceList-list-item>
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
            this.attendenceList = new AttendenceList();
            this.showInput = false;
        },
        confirm: function () {

            let studentsArray = $('#studentsListSelect').dropdown('get value').split(',');
            let allStudents = StudentService.get();
            let jsonStudents = allStudents.filter((s) => studentsArray.includes(s.id.toString()));
            jsonStudents = jsonStudents.map((s) => {
                return { id: s.id, name: s.name };
            });
            this.attendenceList.studentList = jsonStudents;

            //TODO validate lesson field            
            if (this.attendenceList.id === 0) {
                AttendenceListService.add(this.attendenceList);
            } else {
                AttendenceListService.update(this.attendenceList);
            }

            this.attendenceList = new AttendenceList();
            this.showInput = false;
        },
        search: function () {
            this.attendenceLists = AttendenceListService.get().filter((attendenceList) => {
                return attendenceList.lesson.type.toLowerCase().search(this.searchInput) !== -1;
            });
        },
    },

    data: () => {
        return {
            attendenceList: new AttendenceList(),
            showInput: false,
            searchInput: '',
            attendenceLists: []
        };
    },
};
