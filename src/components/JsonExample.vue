<template>
  <div class="exampleWrapper">
    <h3 class="title">
      Data example <a class="link" :href="docLink" target="__blank">Docs</a>
    </h3>
    <pre class="body">{{ JSON.stringify(jsonObject, null, 2) }}</pre>
  </div>
</template>

<script>
export default {
  props: {
    jsonObject: Object,
    docLink: String,
  },
};
</script>

<style scoped>
.exampleWrapper {
  border-radius: 1rem;

  overflow: hidden;
}
.title {
  font-weight: bold;
  padding: 0.5rem 1rem;
  margin: 0;
  background-color: #42b983;
  font-size: 1.25rem;
}
.link {
  margin-left: 0.5rem;
  color: #d6ffec;
}
.body {
  margin: 0;
  padding: 1.25rem;
  background-color: lightgray;
  white-space: pre-wrap;
}
</style>