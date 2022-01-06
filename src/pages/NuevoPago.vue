<template>
  <div class="q-pa-md">
    <div class="row">
      <!-- <p class="text-h3">{{'Pagos de departamento ' + id_departamento + ' del edificio'}}</p> -->
      <div class="col">
        <p class="text-h3 text-center">Nuevo Pago</p>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="row justify-center">
          <div class="col-12 col-md-6 q-pa-sm" style="max-width: 400px">
            <q-input filled v-model="pago" label="Pago" type="number" prefix="$" clearable/>
          </div>
          <div class="col-12 col-md-6 q-pa-sm" style="max-width: 400px">
            <q-select filled v-model="metodo" :options="optionsMetodos" label="Método" />
          </div>
        </div>
        <div class="row justify-center">
          <div class="col-12 col-md-6 q-pa-sm" style="max-width: 400px">
            <q-input filled v-model="descripcion" label="Descripción" type="textarea"/>
          </div>
          <div class="col-12 col-md-6 q-pa-sm" style="max-width: 400px">
              <q-input filled v-model="fecha_hora" class="q-pb-md">
              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy transition-show="scale" transition-hide="scale">
                    <q-date v-model="fecha_hora" mask="YYYY-MM-DD HH:mm" :locale="myLocale" today-btn>
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>

              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy transition-show="scale" transition-hide="scale">
                    <q-time v-model="fecha_hora" mask="YYYY-MM-DD HH:mm" format24h>
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-time>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-select filled v-model="estatus" :options="optionsEstatus" label="Estatus" />
          </div>
          <div class="col-12 col-md-6 q-pa-sm" style="max-width: 400px">
            <q-btn color="primary" label="Guardar Pago" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <q-page-sticky position="bottom-left" :offset="[18, 18]">
    <q-btn round color="accent" icon="arrow_forward" class="rotate-180" @click="$router.go(-1)"/>
  </q-page-sticky>
  <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-btn round color="green" icon="add" class="" @click="cambiarRuta(data_completa.contrato_arrendatario.id_contrato_arrendatario)"/>
  </q-page-sticky>
</template>


<script>
import { ref } from 'vue'
import { Loading, date } from 'quasar'
import axios from 'axios'

export default {
  setup () {
    return {
      id_contrato: ref(0),
      data_completa: ref({}),
      pago: ref(''),
      metodo: ref(null),
      optionsMetodos: [
        'Efectivo', 'Depósito', 'Transferencia', 'Tarjeta', 'Otro'
      ],
      optionsEstatus: [
        {
          label: 'En proceso',
          value: '1'
        },
        {
          label: 'Confirmado',
          value: '2'
        },
      ],
      descripcion: ref(''),
      fecha_hora: ref(null),
      estatus: ref(''),
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
      }),
      myLocale: {
        /* starting with Sunday */
        days: 'Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado'.split('_'),
        daysShort: 'Dom_Lun_Mar_Mié_Jue_Vie_Sáb'.split('_'),
        months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
        monthsShort: 'Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dic'.split('_'),
        firstDayOfWeek: 0
      }
    }
  },
    created () {
      const today = new Date();
      this.fecha_hora = this.fechaHoraFormato(today);
      this.id_contrato = this.$route.params.id_contrato;
      // this.initialize()
    },
    methods: {
      initialize () {
        this.mostrarLoading(true);
        axios
          .get(process.env.VUE_APP_URL + '/contratos_arrendatarios/' + this.id_contrato + '/activo')
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
      fechaHoraFormato(val){

        let mes = val.getMonth()+1;
        let dia = val.getDate();
        let hora = val.getHours();
        let minutos = val.getMinutes();

        if (mes < 10) {
          mes = '0' + mes;
        }

        if (dia < 10) {
          dia = '0' + dia;
        }

        if (hora < 10) {
          hora = '0' + hora;
        }

        if (minutos < 10) {
          minutos = '0' + minutos;
        }

        return val.getFullYear() + "-" + mes + "-" + dia + " " + hora + ":" + minutos;
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