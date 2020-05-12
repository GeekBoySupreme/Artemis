<template>
    <div id="sort-launches" class="sort-launches">
					<button id="all" class="on all sort-button">All</button>
					<button id="spacex" class="sort-button">SpaceX</button>
					<button id="ula" class="sort-button">ULA</button>
					<button id="ariane" class="sort-button">Arianespace</button>
					<button id="orbital" class="sort-button">Orbital ATK</button>
					<button id="russia" class="sort-button">Russia</button>
					<button id="china" class="sort-button">China</button>
					<button id="india" class="sort-button">India</button>
					<button id="nasa" class="sort-button">NASA</button>
					<button id="iss" class="sort-button">ISS</button>
					<button id="rocketlab" class="sort-button">Rocket Lab</button>
					<button id="eurokot" class="sort-button">Eurokot</button>
				</div>
</template>

<script>
export default {
  name: 'LaunchSortPills',
  props: {}
}
</script>