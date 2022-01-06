<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Rentas
          <!-- {{currentRouteName}} -->
        </q-toolbar-title>

        <!-- <div>Quasar v{{ $q.version }}</div> -->
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Menú
        </q-item-label>


        <q-item
          clickable
          v-ripple
          :active="currentRouteName === 'inicio'"
          @click="cambiarRuta('inicio')"
          active-class="my-menu-link"
        >
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>

          <q-item-section>Inicio</q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          :active="currentRouteName === 'casas'"
          @click="cambiarRuta('casas')"
          active-class="my-menu-link"
        >
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>

          <q-item-section>Casas</q-item-section>
        </q-item>


        <q-item
          clickable
          v-ripple
          :active="currentRouteName === 'edificios' || currentRouteName === 'departamentos' || currentRouteName === 'departamentoPagos'"
          @click="cambiarRuta('edificios')"
          active-class="my-menu-link"
        >
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>

          <q-item-section>Edificios</q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          :active="currentRouteName === 'pagos' || currentRouteName === 'pagoNuevo'"
          @click="cambiarRuta('pagos')"
          active-class="my-menu-link"
        >
          <q-item-section avatar>
            <q-icon name="paid" />
          </q-item-section>

          <q-item-section>Pagos</q-item-section>
        </q-item>
        

        <q-item
          clickable
          v-ripple
          :active="currentRouteName === 'usuarios'"
          @click="cambiarRuta('usuarios')"
          active-class="my-menu-link"
        >
          <q-item-section avatar>
            <q-icon name="people" />
          </q-item-section>

          <q-item-section>Usuarios</q-item-section>
        </q-item>

        <q-separator spaced />

        <q-item
          clickable
          v-ripple
          :active="currentRouteName === 'configuracion'"
          @click="cambiarRuta('configuracion')"
          active-class="my-menu-link"
        >
          <q-item-section avatar>
            <q-icon name="settings" />
          </q-item-section>

          <q-item-section>Configuración</q-item-section>
        </q-item>

          <!-- <q-item
            clickable
            v-ripple
            :active="currentRouteName === 'help'"
            @click="cambiarRuta('help')"
            active-class="my-menu-link"
          >
            <q-item-section avatar>
              <q-icon name="help" />
            </q-item-section>

            <q-item-section>Help</q-item-section>
          </q-item> -->

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      link: ref('inicio')
    }
  },
  computed: {
    currentRouteName() {
        return this.$route.name;
    }
  },
  methods: {
    cambiarRuta(ruta){
      // this.$router.push(ruta);
      this.$router.push({ name: ruta });
      // router.push({ name: 'user', params: { userId: '123' } })
    }
  }
})
</script>

<style lang="sass">
.my-menu-link
  color: white
  background: #878787
</style>