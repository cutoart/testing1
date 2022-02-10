<template>
  <CDropdown
    inNav
    class="c-header-nav-items"
    placement="bottom-end"
    add-menu-classes="pt-0"
  >
    <template #toggler>
      <CHeaderNavLink>
        <div class="c-avatar">
          <img src="../assets/img/avatars/1.png" class="c-avatar-img" />
        </div>
      </CHeaderNavLink>
    </template>
    <CDropdownDivider />
    <CDropdownItem>
      Welcome, Admin
    </CDropdownItem>
    <CDropdownItem :to="{ name: 'ChangePassword' }">
      <CIcon name="cil-lock-locked" />Change Password
    </CDropdownItem>
    <CDropdownItem @click="logout">
      <CIcon name="cil-lock-locked" /> Logout
    </CDropdownItem>
  </CDropdown>
</template>

<script>
export default {
  name: "TheHeaderDropdownAccnt",
  data() {
    return {
      itemsCount: 42,
    };
  },
  methods: {
    logout: function() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    },
  },
  created: function() {
    this.$http.interceptors.response.use(undefined, function(err) {
      return new Promise(function() {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch("logout").then(() => {
            this.$router.push("/login");
          });
        }
        throw err;
      });
    });
  },
};
</script>

<style scoped>
.c-icon {
  margin-right: 0.3rem;
}
</style>
