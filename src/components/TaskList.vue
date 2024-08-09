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
            v-for="task in tasks"
            :key="task.id">
            <TaskItem 
                :task="task"
                @complete="completeTask"
                @delete="deleteTask"
                @edit="handleEdit"
            />
        </v-col>

        <v-col cols="12" class="d-flex justify-center" v-if="tasks.length === 0">
            <h3 v-if="!loadingTasks">
                No hay tareas para mostrar
            </h3>
            <v-progress-circular
                v-if="loadingTasks"
                :size="70"
                :width="7"
                color="primary"
                indeterminate
            ></v-progress-circular>
        </v-col>

        <v-dialog
            transition="dialog-bottom-transition"
            max-width="600"
            v-model="dialog"
            persistent
        >
            <v-card class="pa-6">
                <h3>
                    {{ 
                        editTaskData
                            ? 'Editar Tarea'
                            : 'Crear Tarea'
                    }}
                </h3>
               <TaskForm
                    :key="taskFormKey" 
                    :task="editTaskData"
                    @cancel="dialog = false"
                    @create="createTask"
                    @update="updateTask"
                    
               />
            </v-card>
        </v-dialog>

        <v-snackbar
            v-model="snackbar"
            :timeout="10000"
            color="success"
            >
            {{ textSnackbar }}

            <template v-slot:action="{ attrs }">
                <v-btn
                color="white"
                text
                v-bind="attrs"
                @click="snackbar = false"
                >
                Cerrar
                </v-btn>
            </template>
        </v-snackbar>
    </v-row>
</v-container>
</template>

<script>
import axiosInstance from '@/helper/apiService';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';

export default {
    name: 'TaskList',

    components: {
        TaskItem,
        TaskForm
    },

    data: () => ({
        loadingTasks: true,
        dialog: false,
        tasks: [],
        snackbar: false,
        textSnackbar: '',
        editTaskData: null,
        taskFormKey: Date.now()
    }),

    methods: {
        openForm(){
            this.editTaskData = null;
            this.taskFormKey = Date.now(); // Para forzar la actualizacion del formulario y ejecutar su mounted
            this.dialog = true;
        },

        handleEdit(taskData) {
            //El taskData proviene del hijo taskItem
            this.editTaskData = taskData;
            this.taskFormKey = Date.now(); // Para forzar la actualizacion del formulario y ejecutar su mounted
            this.dialog = true;
        },

        async getTasks() {

            //Obteniendo los datos de las tareas

            try {
                const response = await axiosInstance.get('/task');

                this.tasks = response.data;

            } catch (error) {

                console.error("Failed to get tasks:", error);

            }

            this.loadingTasks = false;
        },

        completeTask(taskId) {
            //Escuchando al componente hijo taskItem y actulizando el estado de la pagina si fue exitoso

            const taskIndex = this.tasks.findIndex(task => task.id === taskId);

            if (taskIndex !== -1) {
                this.tasks[taskIndex] = { ...this.tasks[taskIndex], completed: true };

                this.snackbar = false;
                this.textSnackbar = 'La tarea se ha completado exitosamente';
                this.snackbar = true;
            }
        },

        deleteTask(taskId) {
            //Escuchando al componente hijo taskItem y actulizando el estado de la pagina si fue exitoso

            const taskIndex = this.tasks.findIndex(task => task.id === taskId);

            if (taskIndex !== -1) {
                this.tasks.splice(taskIndex, 1);

                this.snackbar = false;
                this.textSnackbar = 'La tarea se ha eliminado exitosamente';
                this.snackbar = true;
            }
        },

        updateTask(taskData) {
            //Escuchando al componente hijo taskform y actulizando el estado de la pagina si fue exitoso, en este caso si cambio todo el objeto task

            this.dialog = false;
            const taskIndex = this.tasks.findIndex(task => task.id === taskData.id);

            if (taskIndex !== -1) {
                this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...taskData};

                this.snackbar = false;
                this.textSnackbar = 'La tarea se ha editado exitosamente';
                this.snackbar = true;
            }
        },

        createTask(taskData) {
             //Escuchando al componente hijo taskform y actulizando el estado de la pagina si fue exitoso, en este caso inserto un nuevo objeto

            this.dialog = false;
            this.tasks.push(taskData);

            this.snackbar = false;
            this.textSnackbar = 'La tarea se ha creado exitosamente';
            this.snackbar = true;
        },
    }, 

    mounted(){
        this.getTasks();
    }
}
</script>