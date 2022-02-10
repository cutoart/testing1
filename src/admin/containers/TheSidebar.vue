<template>
  <CSidebar
    fixed
    :minimize="minimize"
    :show="show"
    @update:show="(value) => $store.commit('set', ['sidebarShow', value])"
  >
    <CSidebarBrand class="d-md-down-none" to="/">
      <img
        size="custom-size"
        :height="49"
        viewBox="0 0 110 134"
        src="@/admin/assets/logo.png"
      />
    </CSidebarBrand>

    <CRenderFunction flat :content-to-render="$options.nav" />
    <CSidebarMinimizer
      class="d-md-down-none"
      @click="$store.commit('set', ['sidebarMinimize', !minimize])"
    />
  </CSidebar>
</template>

<script>
import nav from "./_nav";

export default {
  name: "TheSidebar",
  nav,
  computed: {
    show() {
      return this.$store.state.sidebarShow;
    },
    minimize() {
      return this.$store.state.sidebarMinimize;
    },
  },
  created() {
    this.navOptions = [
      {
        _name: "CSidebarNav",
        _children: [
          {
            _name: "CSidebarNavDropdown",
            name: "Branch",
            to: "/",
            icon: "cil-home",
            items: [
              {
                name: "Branch",
                to: "/",
              },
              {
                name: "About",
                to: "/about",
              },
               {
                name: "List of Register User",
                to: "/admin/registerusers",
              },
            ],
          },
        ],
      },
    ];
  },
};
</script>
