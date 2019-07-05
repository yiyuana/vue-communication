<template>
  <div id="app">
    <div class="menu">
      <div class="menu-item"><router-link to="/" name='prop'>prop</router-link></div>
      <div class="menu-item"><router-link to="/emit" name=''>$emit</router-link></div>
      <div class="menu-item"><router-link to="/sync" name=''>sync</router-link></div>
      <div class="menu-item"><router-link to="/model" name=''>model</router-link></div>
      <div class="menu-item"><router-link to="/attrs" name=''>$attrs和$listeners</router-link></div>
      <div class="menu-item"><router-link to="/provide-inject" name=''>provide和inject</router-link></div>
      <div class="menu-item"><router-link to="/parent" name=''>$parent</router-link></div>
      <div class="menu-item"><router-link to="/eventBus" name=''>eventBus</router-link></div>
      <div class="menu-item"><router-link to="/root" name=''>$root</router-link></div>
      <div class="menu-item"><router-link to="/mixins" name=''>mixins</router-link></div>
      <div class="menu-item"><router-link to="/vuex" name=''>vuex</router-link></div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    
  }
}
</script>

<style>
#app { 
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.menu{
  display: flex;
  width: 100%;
  justify-content: center;
}
.menu-item{
  padding: 5px 10px;
}
</style>
