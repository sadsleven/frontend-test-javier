
<template>
    <v-card
        class="mx-auto"
        max-width="344"
        outlined
        >
        <v-list-item three-line>
        <v-list-item-content>
            <div class="text-overline mb-4 text-left">
                {{ task?.title }}
            </div>
            <v-list-item-subtitle class="text-left">{{ task?.description }}</v-list-item-subtitle>
        </v-list-item-content>

        </v-list-item>

        <v-card-actions class="d-flex justify-space-between">
            <v-btn
                rounded
                :outlined="!task?.completed"
                @click="completeOneTask"
                :loading="loadingComplete"
                :disabled="task?.completed || loadingComplete"
                color="success"
            >
                {{
                    task?.completed 
                        ? 'Completada'
                        : 'Completar'
                }}
            </v-btn>

            <div class="d-flex">
                <v-btn
                    class="mx-2"
                    fab
                    dark
                    @click="$emit('edit', task)"
                    x-small
                    color="orange"
                    >
                    <v-icon dark>
                        mdi-pencil
                    </v-icon>
                </v-btn>

                <v-btn
                    class="mx-2"
                    fab
                    dark
                    x-small
                    @click="deleteOneTask"
                    color="red"
                    :disable="loadingDelete"
                    :loading="loadingDelete"
                    >
                    <v-icon dark>
                        mdi-delete
                    </v-icon>
                </v-btn>
            </div>
        </v-card-actions>
    </v-card>
</template>

<script>
import axiosInstance from '@/helper/apiService';

export default {
    name: 'TaskItem',

    props:{
        task:{
            type: Object,
            required: true
        },
    },

    data: () => ({
        loadingDelete: false,
        loadingComplete: false,
    }),

    methods: {
        async deleteOneTask() {
            //Borrando una tarea

            this.loadingDelete = true;

            try {
                await axiosInstance.delete(`/task/${this.task?.id}`);
                //Avisando al componente padre que elimine una tarea del estado
                this.$emit('delete', this.task?.id)

            } catch (error) {
                console.error("Failed to delete task:", error);
            }

            this.loadingDelete = false;
        },

        async completeOneTask() {
            //Completando una tarea

            this.loadingComplete = true;
            
            try {
                await axiosInstance.patch(`/task-complete/${this.task?.id}`, {
                    completed: true
                });
                //Avisando al componente padre que complete una tarea del estado
                this.$emit('complete', this.task?.id)

            } catch (error) {
                console.error("Failed to complete the task:", error);
            }

            this.loadingComplete = false;
        },
    }
}
</script>