<template>
<v-container>
    <v-row class="text-center">
        <v-col cols="12" class="d-flex justify-end">
            <v-btn
                color="primary"
                @click="openForm"
            >
                Crear nueva tarea
            </v-btn>
        </v-col>
        <v-col cols="12" md="6" lg="3" 
            v-for="c in 12"
            :key="c">
            <TaskItem/>
        </v-col>
        <v-dialog
            transition="dialog-bottom-transition"
            max-width="600"
            v-model="dialog"
        >
            <v-card class="pa-6">
                <h3>
                    Crear Tarea
                </h3>
               <TaskForm/>
            </v-card>
        </v-dialog>
    </v-row>
</v-container>
</template>

<script>
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';

export default {
    name: 'TaskList',

    components: {
        TaskItem,
        TaskForm
    },

    data: () => ({
        dialog:false
    }),

    methods: {
        openForm(){
            this.dialog = true
        }
    }
}
</script>