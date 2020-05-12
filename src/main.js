import Vue from 'vue'
import App from './App.vue'
import LoadScript from 'vue-plugin-load-script'
 
Vue.use(LoadScript);
Vue.loadScript("https://kit.fontawesome.com/622afd0c30.js")
    .then(() => {
      console.log("Icons Fetched.");
    })
    .catch(() => {
      console.log("Uh oh! Cannot fetch Icons.");
    });
Vue.loadScript("https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js")
    .then(() => {
      console.log("Lottie Player Fetched.");
    })
    .catch(() => {
      console.log("Uh oh! Cannot fetch Lottie Player.");
    });

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
