<template>
    <div class="top-banner">
			<div class="header-panel">
				<h1 id="artemis">Artemis</h1>
				<h4>/ˈɑː.tɪ.mɪs (Greek mythology) the virgin goddess of the hunt and the Moon; <br>daughter of Leto and twin sister of Apollo; <br>identified with Roman Diana</h4>
			</div>
	</div>
</template>

<script>
export default {
  name: 'TopBanner',
  props: {}
}
</script>

<style scoped>

#artemis {
  font-family: 'DM Mono', monospace;
  font-weight: 500;
  font-size: 50px;
  text-transform: uppercase;
  margin: 0;
  color: #ffffff;
  text-shadow: 1px 1px 0 rgb(228, 111, 64),
               2px 2px 0 rgba(151, 66, 32, 0.95);
}


</style>