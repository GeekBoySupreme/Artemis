<template>
    <div class="info">
		<p class="info-text" style="color:rgb(187, 186, 186);"><b>All times are Users' Local Time :</b> <span id="timezone"></span></p>
		<p>&nbsp;</p>
		<div class="legend" style="margin-top:-7px;">
			<p class="legend-item legend-item-1"><span class="dark-box"></span>Confirmed Launch Date/Time</p>
			<p class="legend-item legend-item-2"><span class="light-box"></span>Unconfirmed Date/Time</p>
			<p class="legend-item legend-item-3"><span id="blue-text"><b>NET :</b></span> Launching No Earlier Than...</p>
			<p class="legend-item legend-item-4"><span id="blue-text"><b>TBD :</b></span> Time To Be Determined</p>
		</div>
	</div>
</template>

<script>
export default {
  name: 'LegendPanel',
  props: {}
}
</script>