<!--
	??? understand scoped slots to use child content in parent template e.g. for using child with several different  outputs
-->
<template>
	<section class="card" role="region">
		<h4><slot name="card-heading"></slot></h4>
		<slot></slot>
	</section>
</template>

<script>

export default {
	data : function() {
		return {
			componentType : 'card'
		}
	}
}

</script>

<!--<style lang="scss">-->
<style>
.card {
	/* margin: $defaultSpacing;
	padding: $defaultSpacing; */
	margin: 30px;
	padding: 30px;
	border: 1px solid #b4dafd;
	border-radius: 7px;
	box-shadow: 0 3px 7px rgba(0,0,0,0.25);
	/* min-height:5em;
	min-width:5em; */
	text-align: left;

}
.card h1,
.card h2,
.card h3,
.card h4 {
	text-align: center;
	font-weight:normal;
	font-family:
}
.card h4 {
	font-size:200%;
}
.title {
	font-size: 100%;
}
.sub-title {
	font-size:50%;
	font-style: italic;
	display:block;
}
</style>
