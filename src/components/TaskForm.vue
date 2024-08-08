<template>
    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
    >
        <v-text-field
            v-model="title"
            :rules="titleRules"
            label="Titulo"
            required
        ></v-text-field>

        <v-textarea
            label="Descripción"
            v-model="description"
            :rules="descriptionRules"
        ></v-textarea>

        <v-checkbox
            v-if="update"
            v-model="completed"
            label="Completada"
        ></v-checkbox>

        <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="submit"
        >
            Crear
        </v-btn>
    </v-form>
</template>

<script>
export default {
    name: 'TaskForm',

    data: () => ({
        valid: true,
        update: false,
        completed: false,
        title: '',
        titleRules: [
            v => !!v || 'Nombre es requerido',
            v => (v && v.length <= 50) || 'El nombre no debe ser mayor a 50 caracteres',
        ],
        description: '',
        descriptionRules: [
            v => !!v || 'Descripción es requerido',
            v => (v && v.length <= 250) || 'La Descripción no debe ser mayor a 250 caracteres',
        ],
    }),

    methods: {
      submit () {
        //this.$refs.form.reset()
        //this.$refs.form.resetValidation()

        this.$refs.form.validate()
      },
    },
}
</script>