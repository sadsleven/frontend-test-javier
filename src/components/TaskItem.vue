
<template>
    <v-card
        class="mx-auto"
        max-width="344"
        outlined
        >
        <v-list-item three-line>
        <v-list-item-content>
            <div class="text-overline mb-4 text-left">
            Titulo
            </div>
            <v-list-item-subtitle class="text-left">Descripcion</v-list-item-subtitle>
        </v-list-item-content>

        </v-list-item>

        <v-card-actions class="d-flex justify-space-between">
            <v-btn
                outlined
                rounded
                text
            >
                Completar
            </v-btn>

            <div class="d-flex">
                <v-btn
                    class="mx-2"
                    fab
                    dark
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
                    color="red"
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
export default {
    name: 'TaskItem',

    data: () => ({
    
    }),
}
</script>