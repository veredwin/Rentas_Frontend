<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="my-card" flat bordered>
      <q-img
        src="~assets/casas.png"
      />

      <q-card-section>
        <!-- <div class="text-overline text-orange-9">Overline</div> -->
        <div class="text-h5 q-mt-sm q-mb-xs">Casas</div>
        <div class="text-caption text-grey">
          Revisa todas las casas
        </div>
      </q-card-section>

      <q-card-actions>
        <q-btn flat color="dark" label="Ocupadas" />
        <q-btn flat color="primary" label="Disponibles" />
        <q-btn flat color="positive" label="Pagos" />

        <q-space />

        <!-- <q-btn
          color="grey"
          round
          flat
          dense
          :icon="expanded_casas ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
          @click="expanded_casas = !expanded_casas"
        /> -->
      </q-card-actions>

      <q-slide-transition>
        <div v-show="expanded_casas">
          <q-separator />
          <q-card-section class="text-subitle2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </q-card-section>
        </div>
      </q-slide-transition>
    </q-card>
    <q-card class="my-card" flat bordered>
      <q-img
        src="~assets/departamentos.png"
      />

      <q-card-section>
        <!-- <div class="text-overline text-orange-9">Overline</div> -->
        <div class="text-h5 q-mt-sm q-mb-xs">Departamentos</div>
        <div class="text-caption text-grey">
          Revisa todos los edificios de departamentos
        </div>
      </q-card-section>

      <q-card-actions>
        <q-btn flat color="dark" label="Ocupados" />
        <q-btn flat color="primary" label="Disponibles" />
        <q-btn flat color="positive" label="Pagos" />

        <q-space />

        <!-- <q-btn
          color="grey"
          round
          flat
          dense
          :icon="expanded_departamentos ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
          @click="expanded_departamentos = !expanded_departamentos"
        /> -->
      </q-card-actions>

      <q-slide-transition>
        <div v-show="expanded_departamentos">
          <q-separator />
          <q-card-section class="text-subitle2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </q-card-section>
        </div>
      </q-slide-transition>
    </q-card>
  </div>
</template>


<script>
  import { ref } from 'vue'
  
  export default {
    setup () {
      return {
        expanded_casas: ref(false),
        expanded_departamentos: ref(false)
      }
    }
  }
  </script>

<style lang="sass" scoped>
  .my-card
    width: 100%
    max-width: 350px
  </style>