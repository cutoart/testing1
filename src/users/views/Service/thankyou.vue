<template>
  <div class="container dis">
    <strong class="size">{{
      $store.state.resource.thankyou.thankyouheading
    }}</strong>
    <strong class="fun"
      >{{ $store.state.resource.thankyou.yourorder }} {{ paymentid }}
      {{ $store.state.resource.thankyou.hasbeenreceived }}</strong
    >
    <CButton block color="link" :to="{ name: 'Home' }">{{
      $store.state.resource.thankyou.btnbacktohome
    }}</CButton>
  </div>
</template>
<script>
export default {
  props: {
    paymentid: {
      type: String,
      default: null,
    },
  },
  created() {
    document.title = this.$store.state.projecttitle + " - Thank You";
  },
};
</script>
<style scoped>
.dis {
  width: 100% !important;
  height: 500px !important;
  padding-top: 100px;
}
.size {
  font-weight: bold;
  font-size: xx-large;
}
.fun {
  font-weight: bold;
  font-size: x-large;
  display: block;
}
.container {
  text-align: center;
}

@media only screen and (max-width: 765px) {
  .fun {
    font-size: large;
  }
}
</style>
