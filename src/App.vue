<template>
  <div id="app">
    <Header/>
    <TopBanner/>
    <InfoPanel/>
    <Footer/>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import TopBanner from './components/TopBanner.vue'
import Footer from './components/Footer.vue'
import InfoPanel from './components/InfoPanel.vue'

export default {
  mounted() {
    const plugin = document.createElement("script");
    plugin.setAttribute(
      "src",
      "https://geekboysupreme.github.io/Artemis/scripts.js"
    );
    plugin.async = true;
    document.head.appendChild(plugin);
  },
  name: 'App',
  components: {
    Header,
    TopBanner,
    InfoPanel,
    Footer
  }
}
</script>

<style>
  @import './assets/styles.css';
  @import 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.0/css/bootstrap-grid.css';
</style>

