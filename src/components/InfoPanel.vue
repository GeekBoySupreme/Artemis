<template>
    <main id="content" class="site-content main">
        <LegendPanel/>
        <LaunchSortPills/>

        <section id="launches-main" class="primary">
					<div class='uil-spin-css' >
						<lottie-player src="https://assets2.lottiefiles.com/packages/lf20_1Uj5JP.json"  background="transparent"  speed="1"  style="width: 200px; height: 200px;"  loop  autoplay></lottie-player>
					</div>
		</section>
    </main>
</template>

<script>
import LegendPanel from '../components/LegendPanel.vue'
import LaunchSortPills from '../components/LaunchSortPills.vue'

export default {
  name: 'InfoPanel',
  components: {
    LegendPanel,
    LaunchSortPills
  },
  props: {}
}
</script>