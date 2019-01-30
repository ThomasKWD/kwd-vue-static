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

<style lang="scss">
@import '../assets/_shapes';

.card {
	@include blockShape;
	/* margin: $defaultSpacing;
	padding: $defaultSpacing; */
	margin: 30px;
	padding: 15px 30px 30px 30px;
	// border: 1px solid #b4dafd;
	/* min-height:5em;
	min-width:5em; */
	max-width: 500px;
	text-align: left;

	float:left;

	ul {
		list-style-type: none;
		padding-left:0;
	}

	li {
		a {
			display: block;
			padding: 5px;
		}
	}

	h1,h2,h3,h4 {
		margin-bottom: 15px;
	}

	p,ul,ol {
		margin-bottom: 30px;
	}

	h1,h2,h3,h4 {
		font-size:200%;
		text-align: center;
		font-weight:normal;
	}
	h4 {
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

	figure {
		margin-left:-30px;
		margin-right:-30px;
		margin-bottom: 30px;
	}

	img {
		width:100%;
		max-width:500px;
	}
}
</style>
