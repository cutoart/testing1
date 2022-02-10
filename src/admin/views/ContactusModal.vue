<template>
  <div class="content" v-html="content">
    
  </div>
</template>


<script> 
export default {
  name: "contactusmodal",
  props: {
    content: {
      type: String,
      default: "",
    },
    ShowContactusModal: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
