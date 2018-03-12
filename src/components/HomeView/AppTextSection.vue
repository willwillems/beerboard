<template>
<section class="text-container">
  <h1 class="text-container__title">{{textData.title}}</h1>
  <div class="text-container__text">{{textData.text}}</div>
</section>
</template>

<script>
export default {
  name: 'text-section',
  props: {
    textData: {
      type: Object,
      required: true,
      validator (o) {
        return o.title && o.text
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.text-container {
  max-width: 700px;
  text-align: left;
}

.text-container__text {
  padding-left: 20px; /* give text slight ofset from title */
}
</style>
