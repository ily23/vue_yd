<template>
    <div class="clients">
        <el-row>
            <el-col class="addUser">
                <el-button @click="createClientData.isVisible = true" size="mini" type="success">Добавить пользователя</el-button>
            </el-col>
            <el-col class="table">
                <el-table :data="clients" border>
                    <el-table-column align="center" prop="name" label="Клиент" />
                    <el-table-column align="center" prop="inn" label="ИНН" />
                    <el-table-column align="center" label="Действия">
                        <template slot-scope="scope">
                            <el-button @click="rowClick(scope)" size="mini" type="success">Посмотреть</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>

        <el-dialog
            title="Клиент"
            :visible.sync="dialog.isVisible"
            width="30%">
            <el-row class="client" type="flex" justify="center" align="center">
                <el-col :span="24" class="client__wrapper">
                    <el-form class="client__form form" :model="dialog" label-position="left">
                       <el-form-item class="form__item">
                            <el-input placeholder="Название..." class="form__input" v-model="dialog.name"></el-input>
                        </el-form-item>
                        <el-form-item class="form__item">
                            <el-input placeholder="ИНН..." class="form__input" v-model="dialog.inn"></el-input>
                        </el-form-item>
                        <el-row class="form__buttons buttons" type="flex" justify="center">
                            <el-col class="buttons__wrapper" :span="12" >
                                <el-button @click="updateClient()" class="button button-update"  type="primary">Обновить</el-button>
                            </el-col>
                            <el-col class="buttons__wrapper" :span="12">
                                <el-button @click="removeClient()" class="button button-remove" type="danger">Удалить аккаунт</el-button>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-col>
            </el-row>
        </el-dialog>
        <el-dialog
            title="Добавить клиента"
            :visible.sync="createClientData.isVisible"
            width="30%">
            <el-row class="client" type="flex" justify="center" align="center">
                <el-col :span="24" class="client__wrapper">
                    <el-form class="client__form form" :model="createClientData" label-position="left">
                       <el-form-item class="form__item">
                            <el-input placeholder="Имя..." class="form__input" v-model="createClientData.name"></el-input>
                        </el-form-item>
                        <el-form-item class="form__item">
                            <el-input type="number" placeholder="ИНН..." class="form__input" v-model="createClientData.inn"></el-input>
                        </el-form-item>
                        <el-row class="form__buttons buttons" type="flex" justify="end">
                            <el-col class="buttons__wrapper" :span="12" >
                                <el-button @click="createClient()" class="button button-update"  type="primary">Создать</el-button>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-col>
            </el-row>
        </el-dialog>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'Client',
    data(){
        return {
            dialog: {
                isVisible: false,
                id: 0,
                name: '',
                inn: ''
            },
            createClientData: {
                isVisible: false,
                name: '',
                inn: null
            },
            date: [
                new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
            ]
        }
    },
    mounted () {
        this.$store.dispatch('loadClients')
    },
    computed: mapState([
        'clients'
    ]),
    methods: {
        rowClick({row}){

            this.dialog = {
                id: row.id,
                name: row.name,
                inn: row.inn,
                isVisible: true
            }
        },
        createClient(){
            this.$confirm(`Вы уверены, что хотите добавить клиента?`)
                .then(_ => {
                    this.$store.dispatch('createClient', {name: this.createClientData.name, inn: Number(this.createClientData.inn)})
                                .then( response => {
                                    this.$notify.success({
                                        title: 'Успешно добавлено!',
                                        message: `Клиент добавлен...`
                                    })
                                    this.createClientData.isVisible = false
                                    this.createClientData.name = ''
                                    this.createClientData.inn = ''
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
        removeClient() {
            this.$confirm(`Вы уверены, что хотите удалить клиента ${this.dialog.name}?`)
                .then(_ => {
                    this.$store.dispatch('removeClient', this.dialog.id)
                                .then( response => {
                                    this.$notify.success({
                                        title: 'Успешно удалено!',
                                        message: `Клиент удален...`
                                    })
                                    this.dialog.isVisible = false
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
        updateClient() {
            this.$confirm(`Вы уверены, что хотите заменить данные клиента ${this.dialog.name}?`)
                .then(_ => {
                    this.$store.dispatch('updateClient', {id: this.dialog.id, data: {name: this.dialog.name, inn: this.dialog.inn}})
                                .then( response => {
                                    this.$notify.success({
                                        title: 'Успешно обновлено!',
                                        message: `Данные клиента изменены...`
                                    })
                                    this.dialog.isVisible = false
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
        }
    }
}
</script>

<style lang="scss" scoped>
    .filter {
        margin-bottom: 30px;

        .el-date-editor {
            margin-right: 15px;
        }
    }
    .buttons {
        &__wrapper {
            display: flex;
            &:first-child {
                justify-content: flex-start;
            }
            &:last-child {
                justify-content: flex-end;
            }
        }
    }
    .addUser{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        height: 50px;
    }
</style>


