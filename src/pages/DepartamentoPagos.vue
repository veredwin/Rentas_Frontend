<template>
  <div class="q-pa-md">
    <div class="row">
      <!-- <p class="text-h3">{{'Pagos de departamento ' + id_departamento + ' del edificio'}}</p> -->
      <div class="col">
        <p style="font-size: 1rem;" class="text-left no-margin" v-if="data_completa.departamento !== undefined" ><span class="text-weight-bold">Departamento: </span>{{ data_completa.departamento.numero }}</p>
        <p style="font-size: 1rem;" class="text-left no-margin" v-if="data_completa.edificio !== undefined" ><span class="text-weight-bold">Edificio: </span>{{ data_completa.edificio.nombre }}</p>
        <p style="font-size: 1rem;" class="text-left no-margin" v-if="data_completa.arrendatario !== undefined" ><span class="text-weight-bold">Rentado a: </span>{{ data_completa.arrendatario.nombre }}</p>
        <p style="font-size: 1rem;" class="text-left q-mt-none" v-if="data_completa.contrato_arrendatario !== undefined" ><span class="text-weight-bold">Mensualidad: </span> $ {{ money(data_completa.contrato_arrendatario.costo_mensual) }}</p>
      </div>
      <div class="col">
        <p class="text-h3 text-center">Pagos</p>
      </div>
      <div class="col">
        <p style="font-size: 1rem;" class="text-right no-margin" v-if="data_completa.contrato_arrendatario !== undefined" ><span class="text-weight-bold">Ingreso: </span>{{ fechaFormato(data_completa.contrato_arrendatario.ingreso_fecha_hora) }}</p>
        <!-- <p style="font-size: 1rem;" class="text-right no-margin" v-if="data_completa.contrato_arrendatario !== undefined" ><span class="text-weight-bold">Ingreso: </span>{{ data_completa.contrato_arrendatario.pagado }}</p> -->
        <div class="text-right no-margin; text-uppercase" v-if="data_completa.contrato_arrendatario !== undefined && data_completa.contrato_arrendatario.deuda > 0">
          <p style="font-size: 2.3rem;" class="no-margin; text-red" > {{ 'Debe $' + money(data_completa.contrato_arrendatario.deuda) }}</p>
          <p style="font-size: 1rem;" class="no-margin" > {{ 'Desde ' + fechaFormato(data_completa.contrato_arrendatario.pagos.deuda[0]) }}</p>
        </div>
        <div class="text-right no-margin; text-uppercase" v-if="data_completa.contrato_arrendatario !== undefined && data_completa.contrato_arrendatario.deuda < 0">
          <p style="font-size: 2.3rem;" class="text-green" > {{ 'A favor $' + money(-data_completa.contrato_arrendatario.deuda) }}</p>
        </div>
        <div class="text-right no-margin; text-uppercase" v-if="data_completa.contrato_arrendatario !== undefined && data_completa.contrato_arrendatario.deuda === 0">
          <p style="font-size: 2.3rem;" class="text-green" > En regla </p>
        </div>
      </div>
    </div>
    <q-table
      :title="'Pagos de departamento ' + id_departamento + ' del edificio'"
      :rows="data_table"
      :columns="data_columns"
      row-key="id_departamento"
      virtual-scroll
      v-model:pagination="paginacion"
      :rows-per-page-options="[0]"
    >
      <template v-slot:top>
        <!-- <div class="col-6 q-table__title">{{'Pagos de departamento ' + id_departamento + ' del edificio'}}</div>
        <q-space /> -->

        <div class="col">
          <q-toggle v-model="visibleRows" val="0" label="Denegados" @update:model-value="mostrarRows()"/>
          <q-toggle v-model="visibleRows" val="1" label="En progreso" @update:model-value="mostrarRows()"/>
          <q-toggle v-model="visibleRows" val="2" label="Confirmados" @update:model-value="mostrarRows()"/>
        </div>
      </template>
      
      <template v-slot:body-cell-pago="props">
        <q-td :props="props">
          $ {{money(props.value)}}
        </q-td>
      </template>
      <template v-slot:body-cell-fecha_hora="props">
        <q-td :props="props">
          {{fechaFormato(props.value)}}
        </q-td>
      </template>
      <template v-slot:body-cell-estatus="props">
        <q-td :props="props">
          <div>
            <q-icon name="money_off" v-if="props.value === 0" class="text-red" style="font-size: 3rem;" />
            <q-icon name="pending_actions" v-if="props.value === 1" style="font-size: 3rem;" class="text-gray" />
            <q-icon name="price_check" v-if="props.value === 2" style="font-size: 3rem;" class="text-green" />
            <!-- <q-btn flat color="secondary" icon="price_check" v-if="props.value === 2" size="xl"/> -->
            <!-- <q-icon name="price_check" v-if="props.value === 2" style="font-size: 3rem;" /> -->
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
  <q-page-sticky v-if="data_completa.edificio !== undefined" position="bottom-left" :offset="[18, 18]">
    <q-btn round color="accent" icon="arrow_forward" class="rotate-180" @click="cambiarRuta(data_completa.edificio.id_edificio, true)"/>
  </q-page-sticky>
  <q-page-sticky v-else position="bottom-left" :offset="[18, 18]">
    <q-btn round color="accent" icon="arrow_forward" class="rotate-180" @click="$router.go(-1)"/>
  </q-page-sticky>
  <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-btn round color="green" icon="add" class="" @click="cambiarRuta(data_completa.contrato_arrendatario.id_contrato_arrendatario)"/>
  </q-page-sticky>
</template>


<script>
import { ref } from 'vue'
import { Loading } from 'quasar'
import axios from 'axios'

export default {
  setup () {
    return {
      id_departamento: ref(0),
      data_completa: ref({}),
      filter: ref(''),
      loading: ref(true),
      data_columns: [
        // { name: 'id_pago_contrato', label: 'Id', field: 'id_pago_contrato', align: 'left', sortable: true },
        { name: 'pago', align: 'center', label: 'Pago', field: 'pago', sortable: true },
        { name: 'metodo', align: 'center', label: 'Método', field: 'metodo', sortable: true },
        { name: 'fecha_hora', align: 'center', label: 'Fecha y hora', field: 'fecha_hora', sortable: true },
        { name: 'descripcion', align: 'center',  label: 'Descripción', field: 'descripcion', sortable: false },
        { name: 'estatus', align: 'center', label: 'Estatus', field: 'estatus', sortable: true }
      ],
      data_table: ref([]),
      data_table_original: ref([]),
      visibleRows: ref([ '2' ]),
      paginacion: ref({
        rowsPerPage: 0
      })
    }
  },
    created () {
      this.id_departamento = this.$route.params.id_departamento;
      this.initialize()
    },
    methods: {
      initialize () {
        this.mostrarLoading(true);
        axios
          .get(process.env.VUE_APP_URL + '/contratos_arrendatarios/' + this.id_departamento + '/activo')
          .then(response => {
            this.data_completa = response.data.data;
            this.getPagos();
          })
          .catch(error => {
            console.log(error)
          })
          .finally(() => this.mostrarLoading(false))
      },

      getPagos () {
        this.mostrarLoading(true);
        axios
          .get(process.env.VUE_APP_URL + '/pagos_contratos/' + this.data_completa.contrato_arrendatario.id_contrato_arrendatario)
          .then(response => {
            this.data_table_original = response.data.data;
            this.mostrarRows();
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
      money(val){
        let dollarUSLocale = Intl.NumberFormat('es-MX');
        return dollarUSLocale.format(val)
      },
      fechaFormato(val){

        var fecha_temporal = val;
        fecha_temporal = fecha_temporal.match(/(\d+)/g);
        fecha_temporal = new Date(fecha_temporal[0], fecha_temporal[1]-1, fecha_temporal[2]);
        
        // const date = new Date(val)
        return fecha_temporal.getDate() + ' de ' + fecha_temporal.toLocaleString('es-MX', { month: 'long' }) + ' de ' + fecha_temporal.getFullYear()
        // return date.getDate()
      },
      mostrarRows(){

        this.data_table = [];

        this.data_table_original.forEach(element => {
          this.visibleRows.forEach(element2 => {
            if (element.estatus === parseInt(element2)) {
              this.data_table.push(element);
            }
          });
        });

        // console.log(val[0], val[1], val[2])
      },
    cambiarRuta(id, atras = false){
      if (atras) {
        this.$router.push({ name: 'departamentos', params: { id_edificio: id } });
      } else {
        this.$router.push({ name: 'pagoNuevo', params: { id_contrato: id } })
      }
      // this.$router.push(ruta);
      // this.$router.push({ name: ruta });
      // this.$router.push({ name: 'departamentos', params: { id_departamento: id } })
    }
  }
}
</script>