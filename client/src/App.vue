<template>
  <div id="app">
    <header>
      <h1>Gestión de Tareas</h1>
    </header>
    <main>
      <router-view @taskAdded="fetchTasks" />
    </main>
  </div>
</template>

<script>


export default {
  name: 'App',

};
</script>


