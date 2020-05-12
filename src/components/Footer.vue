<template>
    <footer id="footer" class="site-footer">
			<div class="container">
				<div class="row">
					<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
						<br>
						<h4 class="white-text">Copyleft - All Wrongs Reserved</h4>
                        <br>
                        <h4 class="white-text">Fork the code on <a class="rocket-link" href="https://github.com/GeekBoySupreme/Artemis.git" target="blank">Github &nbsp;&nbsp;&nbsp; <i class="fab fa-github"></i></a></h4>
                        <h4 class="white-text move-up">Made with <i id="heart-color" class="fas fa-heart"></i> and <i id="vue-color" class="fab fa-vuejs"></i></h4>
                    </div>
					<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
						<br>
						<h4 class="white-text">Design & Code by <a class="rocket-link" href="https://twitter.com/@shuvam360" target="blank">@shuvam360</a></h4>
						<p>&nbsp;</p>
						<h4 class="white-text">Like the website?</h4>
						<h4 class="white-text move-up">We don't do ads in here, so please donate and show your support.</h4>
						<a href="https://paypal.me/ShuvamManna" target="blank">
							<button class="coffee-button"><i class="fas fa-mug-hot" id="coffee-color"></i>&nbsp;&nbsp; Buy me a Coffee</button>
						</a>
						<br>
						<br>
					</div>
				</div>
			</div>
		</footer>
</template>

<script>
export default {
  name: 'Footer',
  props: {}
}
</script>

<style>
    #heart-color {
        color: rgb(255, 86, 80);
        margin: 2px;
    }

    #vue-color {
        color: rgb(47, 255, 127);
        margin: 2px;
    }

    #coffee-color {
        color: rgb(224, 176, 71);
    }
</style>