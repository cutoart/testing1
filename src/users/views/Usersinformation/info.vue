<template>
  <div class="my-account-details-content col-md-9">
    <div id="section-user-info" class="tab-content">
      <updateinfo />
      <updatepassword />
    </div>
  </div>
</template>

<script>
import updateinfo from './updateinfo'
import updatepassword from './updatepassword';

export default {
  components:{
    updateinfo,
    updatepassword
  }
};
</script>