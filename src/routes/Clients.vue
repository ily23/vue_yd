<template>
    <div class="clients">
        <el-row>
            <el-col class="filter">
                <el-date-picker
                    v-model="date"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="Начало"
                    end-placeholder="Конец">
                </el-date-picker>
                <el-button @click="updateClient()">Обновить</el-button>
            </el-col>
            <el-col class="table">
                <el-table :data="reports" border>
                    <el-table-column align="center" prop="name" label="Клиент" />
                    <el-table-column align="center" prop="inn" label="Расход за период" />
                    <el-table-column align="center" prop="inn" label="Средний расход в день" />
                </el-table>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'Clients',
    data(){
        return {
            date: [
                new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
            ]
        }
    },
    mounted () {
        this.$store.dispatch('loadReports', {dateFrom: this.date[0], dateTo: this.date[1]})
    },
    computed: mapState([
        'reports'
    ]),
    methods: {
        updateClient() {
            this.$store.dispatch('loadReports', {dateFrom: this.date[0], dateTo: this.date[1]})
                .then( response => {
                    this.$notify.success({
                        title: 'Успешно выведено!',
                        message: `Данные отображены...`
                    })
                })
                .catch( err => {
                    this.$notify.error({
                        title: 'Ошибка!',
                        message: 'Не удалось вывести данные...'
                    })
                })
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
</style>


