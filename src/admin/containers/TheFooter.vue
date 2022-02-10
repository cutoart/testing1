<template>
  <CFooter :fixed="false">
    <div>
      <span class="ml-1">Copyright &copy; {{new Date().getFullYear()}} Vision Skill. All Rights Reserved. Vision Skill® is a registered trademark.</span>
    </div>
    <!-- <div class="ml-auto">
      <span class="mr-1">Powered by</span>
      <a href="https://coreui.io/vue" target="_blank">CoreUI for Vue</a>
    </div> -->
  </CFooter>
</template>

<script>
export default {
  name: 'TheFooter'
}
</script>
