import { Lesson } from "../../../modules/model/lesson.js";
import { LessonService } from "../../../modules/service/lesson.js"

Vue.component('lesson-list-item', {
    props: ['lesson'],

    template: `
        <div class="item" v-if="showItem">
            <div class="content">
                <div class="ui grid">
                    <div class="nine wide column">
                        <a class="header">{{lesson.type}}</a>
                        <div class="description">
                            {{lesson.date}}
                            <br>
                            <div v-if="lesson.replacement">
                                Reposição: Sim
                            </div>
                            <div v-else>
                                Reposição: Não
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
        }
    },

    data: () => {
        return {
            showItem: true,
            deleteConfirm: false
        }
    }
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
                        <div class="ui basic floating dropdown button">
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
                <div class="ui labeled input">
                    <div class="ui label">Tipo</div>
                    <input type="text" v-model="lesson.type">
                </div>
                <div class="ui labeled input">
                    <div class="ui label">Data</div>
                    <input type="text" id="lesson-date" v-model="lesson.date">
                </div>
                <div class="ui labeled input">
                    <div class="ui checkbox">
                        <input type="checkbox" v-model="lesson.replacement">
                        <label>Reposição</label>
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
            if (this.lesson.id === 0) {
                LessonService.add(this.lesson)
            } else {
                LessonService.update(this.lesson)
            }
            this.lesson = new Lesson()
            this.showInput = false;
        },
        search: function () {
            // TODO: Fix not ASCII broken
            this.lessons = LessonService.get().filter((lesson) => {
                return lesson.type.toLowerCase().search(this.searchInput) !== -1;
            })
        }
    },

    data: () => {
        return {
            lesson: new Lesson(),
            showInput: false,
            searchInput: "",
            lessons: []
        }
    }
}
