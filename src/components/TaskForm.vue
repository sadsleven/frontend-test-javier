<template>
    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
    >
        <v-text-field
            v-model="title"
            :readonly="loading"
            :rules="titleRules"
            label="Titulo"
            required
        ></v-text-field>

        <v-textarea
            label="Descripción"
            v-model="description"
            :readonly="loading"
            :rules="descriptionRules"
        ></v-textarea>

        <v-checkbox
            v-if="task"
            :readonly="loading"
            v-model="completed"
            label="Completada"
        ></v-checkbox>

        <div class="w100 d-flex justify-end">
            <v-btn
                color="error"
                outlined
                :disabled="loading"
                class="mr-4"
                @click="$emit('cancel')"
            >
                Cancelar
            </v-btn>

            <v-btn
                :disabled="!valid || loading"
                :loading="loading"
                color="success"
                class="mr-4"
                @click="submit"
            >
                {{ 
                    task ? 'Editar' : 'Crear'
                }}
            </v-btn>
        </div>
    </v-form>
</template>

<script>
import axiosInstance from '@/helper/apiService';

export default {
    name: 'TaskForm',

    props:{
        task:{
            type: Object,
            default: null
        },
    },

    data: () => ({
        loading: false,
        valid: true,
        completed: false,
        title: '',
        titleRules: [
            v => !!v || 'Nombre es requerido',
            v => (v && v.length <= 100) || 'El nombre no debe ser mayor a 100 caracteres',
        ],
        description: '',
        descriptionRules: [
            v => !!v || 'Descripción es requerido',
            v => (v && v.length <= 230) || 'La Descripción no debe ser mayor a 230 caracteres',
        ],
    }),

    methods: {
        submit () {
            const isValid = this.$refs.form.validate();

            //Validando el formulario y creando el body a enviar 

            const body = {
                title: this.title,
                description: this.description,
                completed: this.completed
            };

            //Depente de la prop this.task, si esta vacia es creando y si esta llena estoy editando

            if (isValid && !this.task) {
                this.createOneTask(body);
            }

            if (isValid && this.task) {
                this.updateOneTask(body);
            }
        },

        setData() {
            if (this.task){
                this.title = this.task.title;
                this.description = this.task.description;
                this.completed = this.task.completed;
            }
        },

        async createOneTask(body) {
            //Creando una tarea

            this.loading = true;

            try {
                const response = await axiosInstance.post('/task', body);
                //Avisando al componente padre que añada una tarea del estado
                this.$emit('create', response?.data?.data)
                
            } catch (error) {
                console.error("Failed to create the task:", error);
            }

            this.loading = false;
        },

        async updateOneTask(body) {
            //Actualizando una tarea

            this.loading = true;

            try {
                const response = await axiosInstance.put(`/task/${this.task?.id}`, body);
                //Avisando al componente padre que añada actualice una tarea del estado
                this.$emit('update', response?.data?.data)

            } catch (error) {
                console.error("Failed to update the task:", error);
            }

            this.loading = false;
        },
    },

    mounted() {
        this.setData();
    }
}
</script>