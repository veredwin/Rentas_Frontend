<template>
  <div class="q-pa-md">
    <q-table
      title="Casas"
      :rows="data_table"
      :columns="data_columns"
      row-key="id_casa"
      virtual-scroll
      v-model:pagination="paginacion"
      :rows-per-page-options="[0]"
    >
      <template v-slot:body-cell-nombre="props">
        <q-td :props="props">
          <p style="font-size: 3em;">{{props.value}}</p>
        </q-td>
      </template>
      <template v-slot:body-cell-estatus="props">
        <q-td :props="props">
          <div>
            <q-icon name="highlight_off" v-if="props.value === 0" class="text-red" style="font-size: 3rem;" />
            <q-icon name="attach_money" v-if="props.value === 1" style="font-size: 3rem;" class="text-green" />
            <q-btn flat color="secondary" icon="price_check" v-if="props.value === 2" size="xl" @click="cambiarRuta(props.row.id_casa)"/>
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>


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
        // { name: 'id_casa', label: 'Id', field: 'id_casa', align: 'left', sortable: true },
        { name: 'nombre', align: 'left', label: 'Nombre', field: 'nombre', sortable: true },
        { name: 'descripcion', align: 'center',  label: 'Descripción', field: 'descripcion', sortable: false },
        { name: 'estatus', align: 'center', label: 'Estatus', field: 'estatus', sortable: true }
      ],
      data_table: ref([]),
      paginacion: ref({
        rowsPerPage: 0
      })
    }
  },
  created () {
    this.initialize()
  },
  methods: {
    initialize () {
      this.mostrarLoading(true);
      axios
        .get(process.env.VUE_APP_URL + '/casas')
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
    cambiarRuta(id_casa){
      this.$router.push({ name: 'departamentoPagos', params: { id_casa: id_casa } })
    }
  }
}
</script>