<template>
    <div class="project">
        <el-row>
            <el-col class="addUser">
                <el-button @click="createProject.isVisible = true" size="mini" type="success">Добавить проект</el-button>
            </el-col>
            <el-col class="table">
                <el-table :data="projects" border>
                    <el-table-column align="center" prop="name" label="Проект" />
                    <el-table-column align="center"  label="Клиент" >
                        <template slot-scope="scope">
                            {{scope.row.client.name}}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="Действия">
                        <template slot-scope="scope">
                            <el-button @click="rowClick(scope)" size="mini" type="success">Посмотреть</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                    
            </el-col>
        </el-row>

        <el-dialog
            title="Проект"
            :visible.sync="dialog.isVisible"
            width="60%">
            <el-row class="adder" type="flex" justify="end" align="center">
                <el-col :span="4">
                    <el-button @click="createYDLogin.isVisible = true" type="primary">Добавить YDLogin</el-button>
                </el-col>
            </el-row>
            <el-row class="client" type="flex" justify="center" align="center">
                <el-col :span="24" class="client__wrapper">
                        <el-table :data="yDLogins" border>
                            <el-table-column align="center" label="Название"> 
                                <template slot-scope="scope">
                                    <el-input placeholder="Название..." class="form__input" v-model="scope.row.account_name"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="Логин"> 
                                <template slot-scope="scope">
                                    <el-input placeholder="Логин..." class="form__input" v-model="scope.row.login"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="Пароль"> 
                                <template slot-scope="scope">
                                    <el-input placeholder="Пароль..." class="form__input" v-model="scope.row.password"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="Обновить"> 
                                <template slot-scope="scope">
                                    <el-button @click="updateYDLogin(scope)" class="button button-remove">Обновить</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="Удалить"> 
                                <template slot-scope="scope">
                                    <el-button @click="removeYDLogin(scope)" class="button button-remove" type="danger">Удалить</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                </el-col>
            </el-row>
        </el-dialog>

        <el-dialog
            title="Создать Проект"
            :visible.sync="createProject.isVisible"
            width="45%">
            <el-row class="client" type="flex" justify="center" align="center">
                <el-col :span="24" class="client__wrapper">
                        <el-table :data="[{}]" border>
                            <el-table-column align="center" label="Название проекта"> 
                                <template slot-scope="scope">
                                    <el-input placeholder="Название..." class="form__input" v-model="createProject.name"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="Клиент"> 
                                <template slot-scope="scope">
                                    <el-select v-model="createProject.client" placeholder="Выбрать клиента">
                                        <el-option :value="client.id" v-for="client of clients" :label="client.name" :key="client.id"></el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="Клиент"> 
                                <template slot-scope="scope">
                                    <el-button @click="createProjectF()" type="primary">Создать</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                </el-col>
            </el-row>
        </el-dialog>

        <el-dialog
            title="Добавить YDLogin"
            :visible.sync="createYDLogin.isVisible"
            width="60%">
            <el-row class="client" type="flex" justify="center" align="center">
                <el-col :span="24" class="client__wrapper">
                        <el-table :data="[{}]" border>
                            <el-table-column align="center" label="Название"> 
                                <template slot-scope="scope">
                                    <el-input placeholder="Название..." class="form__input" v-model="createYDLogin.account_name"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="Логин"> 
                                <template slot-scope="scope">
                                    <el-input placeholder="Логин..." class="form__input" v-model="createYDLogin.login"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="Пароль"> 
                                <template slot-scope="scope">
                                    <el-input placeholder="Пароль..." class="form__input" v-model="createYDLogin.password"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="Обновить"> 
                                <template slot-scope="scope">
                                    <el-button class="button" @click="createYDLoginF()" type="primary">Добавить</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                </el-col>
            </el-row>
        </el-dialog>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    data(){
        return{
            dialog: {
                id: null,
                isVisible: false
            },
            createProject: {
                isVisible: false,
                name: '',
                client: null,
            },
            createYDLogin: {
                account_name: '',
                login: '',
                password: '',
                isVisible: false
            }
        }
    },
    name: 'Project',
    mounted () {
        this.$store.dispatch('loadClients')
        this.$store.dispatch('loadProjects')
    },
    computed: mapState([
        'clients', 'projects', 'yDLogins'
    ]),
    methods: {
        rowClick(scope){
            this.dialog.id = scope.row.client.id
            this.$store.dispatch('loadYDLogins', scope.row.client.id).then( response => {
                this.dialog.isVisible = true
            } )
        },
        updateYDLogin(scope) {
            this.$confirm(`Вы уверены, что хотите заменить данные?`)
                .then(_ => {
                    const data = this.$store.state.yDLogins[scope.$index]
                    this.$store.dispatch('updateYDLogin', {id: data.id, project_id: scope.row.id, data: {account_name: data.account_name, login: data.login, password: data.password}})
                                .then( response => {
                                    this.$notify.success({
                                        title: 'Успешно обновлено!',
                                        message: `Данные YD изменены...`
                                    })
                                })
                                .catch( err => {
                                    this.$notify.error({
                                        title: 'Ошибка!',
                                        message: 'Не удалось изменить данные...'
                                    })
                                    console.log(err)
                                })
                } )
                .catch(_ => {console.log(_)})
        },
        removeYDLogin(scope) {
            this.$confirm(`Вы уверены, что хотите удалить YDLogin?`)
                .then(_ => {
                    const data = this.$store.state.yDLogins[scope.$index]
                    this.$store.dispatch('removeYDLogin', {id: data.id, project_id: scope.row.id})
                                .then( response => {
                                    this.$notify.success({
                                        title: 'Успешно удалено!',
                                        message: `YDLogin удален...`
                                    })
                                })
                                .catch( err => {
                                    this.$notify.error({
                                        title: 'Ошибка!',
                                        message: 'Не удалось удалить...'
                                    })
                                    console.log(err)
                                })
                } )
                .catch(_ => {console.log(_)})
        },
        createProjectF(){
            this.$confirm(`Вы уверены, что хотите добавить проект данному клиенту?`)
                .then(_ => {
                    this.$store.dispatch('createProject', {name: this.createProject.name, client: {id: Number(this.createProject.client ) } })
                                .then( response => {
                                    this.$notify.success({
                                        title: 'Успешно добавлено!',
                                        message: `Проект добавлен...`
                                    })
                                    this.createProject.isVisible = false
                                    this.createProject.name = ''
                                    this.createProject.client = ''
                                })
                                .catch( err => {
                                    this.$notify.error({
                                        title: 'Ошибка!',
                                        message: 'Не удалось добавить...'
                                    })
                                    console.log(err)
                                })
                } )
                .catch(_ => {console.log(_)})
        },
        createYDLoginF(){
            this.$confirm(`Вы уверены, что хотите добавить YDLogin данному проекту?`)
                .then(_ => {
                    this.$store.dispatch('createYDLogin', {...this.createYDLogin, project: {id: this.dialog.id}})
                                .then( response => {
                                    this.$notify.success({
                                        title: 'Успешно добавлено!',
                                        message: `YDLogin добавлен...`
                                    })
                                    this.createYDLogin.isVisible = false
                                    this.createYDLogin.account_name = ''
                                    this.createYDLogin.password = ''
                                    this.createYDLogin.login = ''
                                })
                                .catch( err => {
                                    this.$notify.error({
                                        title: 'Ошибка!',
                                        message: 'Не удалось добавить...'
                                    })
                                    console.log(err)
                                })
                } )
                .catch(_ => {console.log(_)})
        }
    }
}
</script>

<style lang="scss" scoped>
    .addUser{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        height: 50px;
    }
    .adder {
        margin-bottom: 15px
    }
</style>


