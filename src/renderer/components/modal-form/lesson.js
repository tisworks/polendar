import { Lesson } from '../../../modules/model/lesson.js';
import { LessonService } from '../../../modules/service/lesson.js';
import { Group } from '../../../modules/model/group.js';
import { GroupService } from '../../../modules/service/group.js';

Vue.component('lesson-list-item', {
    props: ['lesson'],

    template: `
        <div class="item" v-if="showItem">
            <div class="content">
                <div class="ui grid">
                    <div class="nine wide column">
                        <a class="header">{{lesson.type}}</a>                        
                        <div class="description">
                            <b>Turma:</b> {{lesson.group.identification}}
                            <br>
                            <b>Data:</b> {{lesson.date}}
                            <br>
                            <b>Horário:</b> {{lesson.scheduledTime}}
                            <br>
                            <div v-if="lesson.replacement">
                                <b>Reposição:</b> Sim
                            </div>
                            <div v-else>
                                <b>Reposição:</b> Não
                            </div>
                        </div>        
                    </div>
                    <div class="seven wide right aligned column">
                        <div class="row">
                            <div class="ui negative compact message" v-if="deleteConfirm">
                                Tem certeza?
                                <div class="ui mini compact button" v-on:click="deleteLesson">Sim</div>
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
            this.$emit('edit:lesson', this.lesson);
        },
        deleteLesson: function () {
            LessonService.delete(this.lesson.id);
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

Vue.component('group-dropdown', {
    props: ['group'],

    template: `
        <div class="ui fluid search selection dropdown" id="groupSelect">
            <input type="hidden" name="group">
            <div class="default text"></div>
        </div>
    `,

    mounted: function () {
        this.setGroupsDropdown();
    },

    data: () => {
        return {};
    },

    methods: {
        setGroupsDropdown: function () {
            let groups = GroupService.get();
            let groupsDropdown = { placeholder: 'Selecione uma turma', values: [] };

            for (const key in groups) {
                let selectOp;

                if (this.group && groups[key].id == this.group.id) {
                    selectOp = true;
                } else {
                    selectOp = false;
                }

                groupsDropdown.values.push({
                    name: groups[key].identification,
                    value: [groups[key].id, groups[key].identification],
                    selected: selectOp,
                });
            }

            $('#groupSelect').dropdown(groupsDropdown);
        },
    },
});

Vue.component('scheduled-time-dropdown', {
    props: ['scheduledTime'],

    template: `
        <div class="ui fluid search selection dropdown" id="scheduledTimeSelect">
            <input type="hidden">
            <div class="default text"></div>
            <div class="menu"></div>
        </div>
    `,

    mounted: function () {
        this.setScheduledTimeDropdown();
    },

    data: () => {
        return {};
    },

    methods: {
        setScheduledTimeDropdown: function () {
            let scheduledTimeDropdown = {
                placeholder: 'Selecione o horário',
                values: [
                    {
                        name: '08:00 - 09:00',
                        value: '08:00',
                    },
                    {
                        name: '09:00 - 10:00',
                        value: '09:00',
                    },
                    {
                        name: '10:00 - 11:00',
                        value: '10:00',
                    },
                    {
                        name: '11:00 - 12:00',
                        value: '11:00',
                    },
                    {
                        name: '12:00 - 13:00',
                        value: '12:00',
                    },
                    {
                        name: '13:00 - 14:00',
                        value: '13:00',
                    },
                    {
                        name: '14:00 - 15:00',
                        value: '14:00',
                    },
                    {
                        name: '15:00 - 16:00',
                        value: '15:00',
                    },
                    {
                        name: '16:00 - 17:00',
                        value: '16:00',
                    },
                    {
                        name: '17:00 - 18:00',
                        value: '17:00',
                    },
                ],
            };

            scheduledTimeDropdown.values = scheduledTimeDropdown.values.map((t) => {
                let selectOp;

                if (this.scheduledTime && this.scheduledTime == t.value) {
                    selectOp = true;
                } else {
                    selectOp = false;
                }

                return {
                    name: t.name,
                    value: t.value,
                    selected: selectOp,
                };
            });

            $('#scheduledTimeSelect').dropdown(scheduledTimeDropdown);
        },
    },
});

export const LessonModal = {
    template: `
    <div class="ui modal lesson-modal">
        <i class="close icon"></i>
        <div class="header ui center aligned">Aula</div>
        <div class="ui content">
            <div class="ui grid">
                <div class="thirteen wide column">
                    <div class="ui action input fluid">
                        <input type="text" placeholder="Pesquisa..." v-model="searchInput">
                        <div class="ui basic floating dropdown button" id="filterLesson">
                            <div class="text">Filtro</div>
                            <i class="dropdown icon"></i>
                            <div class="menu">
                                <div class="item">Tipo</div>
                                <div class="item">Data</div>
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
                            <div class="ui label">Tipo</div>
                            <input type="text" v-model="lesson.type">
                        </div>
                    </div>
                    <div class="eight wide column">
                        <div class="ui fluid labeled input">
                            <div class="ui label">Data</div>
                            <input type="text" id="lesson-date" v-model="lesson.date">
                        </div>
                    </div>
                    <div class="eight wide column">
                        <scheduled-time-dropdown v-bind:scheduledTime="lesson.scheduledTime"></scheduled-time-dropdown>
                    </div>
                    <div class="eight wide column">
                        <div class="ui labeled fluid input">
                            <div class="ui checkbox">
                                <input type="checkbox" v-model="lesson.replacement">
                                <label>Reposição</label>
                            </div>
                        </div>
                    </div>
                    <div class="sixteen wide column">
                        <group-dropdown v-bind:group="lesson.group"></group-dropdown>
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
                    <lesson-list-item v-for="ls in lessons" v-bind:key="ls.id" 
                        v-bind:lesson="ls" v-on:edit:lesson="lesson = $event; showInput = true">
                    </lesson-list-item>
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
            this.lesson = new Lesson();
            this.showInput = false;
        },
        confirm: function () {
            //TODO validate lesson field
            let allLessons = LessonService.get();
            let group = $('#groupSelect').dropdown('get value').split(',');
            let scheduledTime = $('#scheduledTimeSelect').dropdown('get value');
            let validation;

            group = { id: group[0], identification: group[1] };
            this.lesson.group = group;
            this.lesson.scheduledTime = scheduledTime;

            validation = allLessons.filter((l) => l.scheduledTime == this.lesson.scheduledTime && l.date == this.lesson.date);

            if (validation.length > 0 && validation[0].group.id != this.lesson.group.id) {
                alert(`A turma ${validation[0].group.identification} já tem uma aula marcada para este mesmo dia e horário!`);
            } else {
                if (this.lesson.id === 0) {
                    LessonService.add(this.lesson);
                } else {
                    LessonService.update(this.lesson);
                }

                this.lesson = new Lesson();
                this.showInput = false;
            }
        },
        search: function () {
            const choice = $('#filterLesson').dropdown('get value');

            this.lessons = LessonService.get().filter((lesson) => {
                switch (choice) {
                    case 'data':
                        return lesson.date.toLowerCase().search(this.searchInput) !== -1;
                    default:
                        // TODO: Fix not ASCII broken and improve filter match quality
                        return lesson.type.toLowerCase().search(this.searchInput) !== -1;
                }
            });
        },
    },

    data: () => {
        return {
            lesson: new Lesson(),
            showInput: false,
            searchInput: '',
            lessons: [],
        };
    },
};
