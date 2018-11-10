<template>
  <div id="app">
    <nav class="navbar is-fixed-top is-primary" role="navigation" aria-label="main navigation">
      <div class="navbar-menu">
        <div class="navbar-start">
          <router-link class="navbar-item" to="/airplane">
            Aviones
          </router-link>

          <router-link class="navbar-item" to="/airport">
            Aeropuertos
          </router-link>

          <router-link class="navbar-item" to="/flight">
            Vuelos
          </router-link>

          <router-link class="navbar-item" to="/tickets">
            Boletos
          </router-link>
        </div>
      </div>
    </nav>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>
<style src="bulma-calendar/dist/css/bulma-calendar.min.css" rel="stylesheet">
