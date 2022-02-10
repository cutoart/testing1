<template>
  <div>
    <div class="content" id="content" v-if="$store.state.resource != null">
      <div class="my-account-details">
        <div class="container">
          <div class="row">
            <div class="sidebar col-md-2">
              <ul>
                <li>
                  <span
                    v-on:click="
                      (info = true),
                        (box = false),
                        (storage = false),
                        (order = false)
                    "
                    :class="info == true ? 'btn-span active' : 'btn-span'"
                  >
                    {{ $store.state.resource.userinfo.userinfo }}
                  </span>
                </li>
                <li>
                  <span
                    v-on:click="
                      (info = false),
                        (box = true),
                        (storage = false),
                        (order = false)
                    "
                    :class="box == true ? 'btn-span active' : 'btn-span'"
                  >
                    {{ $store.state.resource.userinfo.mybox }}
                  </span>
                </li>
                <li>
                  <span
                    v-on:click="
                      (info = false),
                        (box = false),
                        (storage = true),
                        (order = false)
                    "
                    :class="storage == true ? 'btn-span active' : 'btn-span'"
                  >
                    {{ $store.state.resource.userinfo.mystorage }}
                  </span>
                </li>
                <li>
                  <span
                    v-on:click="
                      (info = false),
                        (box = false),
                        (storage = false),
                        (order = true)
                    "
                    :class="order == true ? 'btn-span active' : 'btn-span'"
                  >
                    {{ $store.state.resource.userinfo.orderrecord }}
                  </span>
                </li>
                <li>
                  <a class="logout" @click="logout">{{
                    $store.state.resource.userinfo.logout
                  }}</a>
                </li>
              </ul>
            </div>
            <info-view v-if="info == true" />
            <box-view v-if="box == true" />
            <storage-view v-if="storage == true" />
            <order-view v-if="order == true" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import infoview from "./info";
import boxview from "./box";
import storageview from "./storage";
import orderview from "./orderrecord";

export default {
  components: {
    "info-view": infoview,
    "box-view": boxview,
    "storage-view": storageview,
    "order-view": orderview,
  },
  data() {
    return {
      info: true,
      box: false,
      storage: false,
      order: false,
    };
  },
  methods: {
    logout: function() {
      this.$store.dispatch("userlogout").then(() => {
        this.$router.push("/");
      });
    },
  },
};
</script>

<style scoped>
.btn-span {
  font-size: 16px;
  font-weight: 700;
  line-height: 19px;
  color: #8fa7b2;
  text-decoration: none;
  background-color: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
}

.active {
  color: black;
}

.logout {
  cursor: pointer;
}

@media only screen and (max-width: 768px) {
  .my-account-details {
    background: #e5e5e5;
    padding: 20px 20px !important;
  }

  .my-account-details .sidebar {
    padding: 0;
    position: relative !important;
    height: 100%;
    top:0px;
    margin-right: 0px;
}
}
</style>
