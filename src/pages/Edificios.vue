<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <div v-for="item in data_table" v-bind:key="item.id_edificio">

      <q-card dark bordered class="bg-grey-9 my-card" v-on:click="cambiarRuta(item.id_edificio)">
        <q-card-section>
          <div class="text-h6">{{item.nombre}}</div>
          <div class="text-subtitle2">ID: {{item.id_edificio}}</div>
        </q-card-section>

        <q-separator dark inset />

        <q-card-section>
          {{item.descripcion}}
        </q-card-section>
      </q-card>

      <!-- <q-card flat bordered class="my-card">
        <q-card-section>
          <div class="text-h6">Our Changing Planet</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </q-card-section>

        <q-separator inset />

        <q-card-section>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </q-card-section>
      </q-card> -->

    </div>
  </div>
</template>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
  cursor: pointer
</style>

<script>
import { ref } from 'vue'
import { Loading } from 'quasar'
import axios from 'axios'

export default {
  setup () {
    return {
      filter: ref(''),
      loading: ref(true),
      data_columns: [
        { name: 'id_edificio', label: 'Id', field: 'id_edificio', align: 'left', sortable: true },
        { name: 'nombre', align: 'center', label: 'Nombre', field: 'nombre', sortable: true },
        { name: 'descripcion', label: 'Descripción', field: 'descripcion', sortable: false },
        { name: 'estatus', label: 'Estatus', field: 'estatus', sortable: true }
      ],
      data_table: ref([])
    }
  },
    created () {
      this.initialize()
    },
    methods: {
      initialize () {
        this.mostrarLoading(true);
        axios
          .get(process.env.VUE_APP_URL + '/edificios')
          .then(response => {
            this.data_table = response.data.data;
          })
          .catch(error => {
            console.log(error)
          })
          .finally(() => this.mostrarLoading(false))
      },
      mostrarLoading(val){
        this.loading = val;
        if (val) {
          Loading.show()
        } else {
          Loading.hide()
        }
      },
    cambiarRuta(id_edificio){
      console.log(id_edificio)
      // this.$router.push(ruta);
      // this.$router.push({ name: ruta });
      this.$router.push({ name: 'departamentos', params: { id_edificio: id_edificio } })
    }
  }
}
</script>