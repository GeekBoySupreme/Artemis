<template>
    <header id="header" class="site-header">
			<div class="nav-inner">
				<div id="logo">
					<h1 class="white-text">Artemis&nbsp;<i class="fas fa-space-shuttle"></i></h1>
				</div>
				<div class="header-content">
					<div class="header-top">
					</div>
					
					<nav id="main-navigation" class="site-navigation">
						<a href="https://paypal.me/ShuvamManna" target="blank">
							<button class="coffee-button"><i class="fas fa-mug-hot" id="coffee-color"></i>&nbsp;&nbsp; Buy me a Coffee</button>
						</a>
					</nav>
				</div>
				<div id="toggle-wrapper" class="toggle-wrapper">
					<h1><i class="fas fa-space-shuttle"></i>&nbsp;Artemis</h1>
					<a href="#footer">
                        <button id="menu" class="menu">
                            <a href="https://paypal.me/ShuvamManna" target="blank">
							<button class="coffee-button"><i class="fas fa-mug-hot" id="coffee-color"></i></button>
						</a>
                        </button>
                    </a>
				</div>
				<div id="mobile-nav">
					<nav id="mobile-navigation" class="mobile-navigation">
						<a href="https://paypal.me/ShuvamManna" target="blank">
							<button class="coffee-button"><i class="fas fa-mug-hot" id="coffee-color"></i>&nbsp;&nbsp; Buy me a Coffee</button>
						</a>
					</nav>
				</div>
			</div>
		</header>
</template>

<script>
export default {
  name: 'Header',
  props: {}
}
</script>
<style scoped>
header {
	z-index: 1000!important;
}
</style>