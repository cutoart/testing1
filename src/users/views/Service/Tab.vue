<template>
  <div><slot></slot></div>
</template>


<script>
export default {
  name: "tab",
  props: {
    name: { required: true },
    info: {},
    selected: { default: false },
  } 
};
</script>