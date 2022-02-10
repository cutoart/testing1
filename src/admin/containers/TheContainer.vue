<template>
  <div class="c-app">
    <notifications animation-type="velocity" />
    <div id="loading-overlay" v-show="$store.state.loader == true">
      <div id="loading-wrapper">
        <CSpinner color="primary" style="width: 4rem; height: 4rem" />
        <!-- <div id="loading-title">Loading</div> -->
      </div>
    </div>
    <vue-confirm-dialog></vue-confirm-dialog>
    <TheSidebar />
    <CWrapper>
      <TheHeader />
      <div class="c-body">
        <main class="c-main">
          <CContainer fluid>
            <transition name="fade">
              <router-view></router-view>
            </transition>
          </CContainer>
        </main>
      </div>
      <TheFooter />
    </CWrapper>
  </div>
</template>
<style scoped>
#loading-overlay {
  /* display: none; */
  position: fixed;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  background-color: rgba(255, 255, 255, 0.8);
  justify-content: center;
  align-items: center;
  z-index: 3300;
}

#loading-wrapper {
  padding-bottom: 6rem;
}

#loading-overlay {
  display: flex;
}
</style>
<script>
import TheSidebar from "./TheSidebar";
import TheHeader from "./TheHeader";
import TheFooter from "./TheFooter";

export default {
  name: "TheContainer",
  components: {
    TheSidebar,
    TheHeader,
    TheFooter,
  },
  created() {
    document.getElementById("chatra").style.display = "none";
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
<style>
.b-table-sticky-header,
.table-responsive {
  min-height: 300px !important;
}
.table-bordered th, .table-bordered td{
  white-space: initial !important;
}
</style>
