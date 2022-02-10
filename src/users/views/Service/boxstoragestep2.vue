<template>
  <div>
    <div>
      <section class="our-feature">
        <div class="container">
          <div class="sectoin-title">
            <h2>{{ $store.state.resource.boxstoragestep2.heading }}</h2>
          </div>
          <ul class="row">
            <li
              class="col-md-3"
              v-for="(item, key) in vmodel.boxstorages"
              :key="key"
            >
              <div class="content-wrap">
                <div
                  class="img-content"
                  @click="
                    (ShowContactusModal = true),
                      (ContactusModalContent = item.description),
                      (ContactusModalTitle = item.title)
                  "
                  style="cursor: pointer"
                  title="click to show box detail"
                >
                  <div class="img-content img">
                    <img :src="item.image" height="250px" width="250px" />
                  </div>
                </div>
                <div class="content">
                  <div
                    @click="
                      (ShowContactusModal = true),
                        (ContactusModalContent = item.description),
                        (ContactusModalTitle = item.title)
                    "
                    style="cursor: pointer"
                    title="click to show box detail"
                  >
                    <h3 class="title">
                      <strong
                        style="
                          font-size: 30px !important;
                          display: -webkit-box;
                          -webkit-line-clamp: 1;
                          -webkit-box-orient: vertical;
                          overflow: hidden;
                          color: #000000;
                          font-weight: normal;
                          line-height: 40px;
                        "
                        >{{ item.title }}</strong
                      >
                    </h3>
                    <p
                      class="description"
                      style="
                        display: -webkit-box;
                        -webkit-line-clamp: 3;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                        min-height: 80px !important;
                        max-height: 80px !important;
                      "
                    >
                      {{ item.description }}
                    </p>
                    <a
                      v-if="item.description.length > 112"
                      style="color: blue !important; font-size: 14px !important"
                      href="javascript:;"
                      @click="
                        (ShowContactusModal = true),
                          (ContactusModalTitle = items.title),
                          (ContactusModalContent = items.description)
                      "
                      >{{ $store.state.resource.boxstoragestep2.viewmore }} ></a
                    >
                    <div
                      v-if="item.description.length < 112"
                      style="height: 24px"
                    ></div>
                    <h2
                      class="price"
                      :class="
                        item.price.length > 3
                          ? 'pricetext' + item.price.length
                          : ''
                      "
                    >
                      <span class="price-per">HKD</span>{{ item.price }}
                      <span class="price-per">{{
                        $store.state.resource.boxstoragestep2.boxmonth
                      }}</span>
                    </h2>
                  </div>
                  <div>
                    <vue-number-input
                      v-model="item.value"
                      :min="0"
                      :max="30"
                      inline
                      size="large"
                      center
                      controls
                      @change="calculate(item.index)"
                    ></vue-number-input>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div class="row justify-content-end">
            <div class="col-1 buttons2">
              <a
                href="#"
                class="btn btn-primary book-now1"
                style="background: #4B5FC4"
              >
                {{ $store.state.resource.boxstoragestep2.btntotal }}:
              </a>
            </div>
            <div class="col-1 count" style="padding: 10px">
              <h3>{{ vmodel.totalbox }}</h3>
            </div>
            <div class="col-1 buttons2">
              <a
                href="#"
                class="btn btn-primary looking-better1"
                style="background: #E83828"
                v-on:click="checklogin()"
              >
                {{ $store.state.resource.boxstoragestep2.btnconfirm }}</a
              >
            </div>
          </div>
        </div>
      </section>
    </div>
    <div>
      <CModal :title="ContactusModalTitle" :show.sync="ShowContactusModal">
        <ContactUsModal
          :ShowContactusModal.sync="ShowContactusModal"
          :content="ContactusModalContent"
        />
      </CModal>
    </div>
  </div>
</template>

<script>
import VueNumberInput from "@chenfengyuan/vue-number-input";
import ContactUsModal from "../../../admin/views/ContactusModal";

export default {
  name: "app1",
  props: {
    vmodel: {
      type: Object,
      default: null,
    },
    haslogindata: {
      type: Boolean,
      default: false,
    },
    renewid: {
      type: String,
      default: null,
    },
  },
  components: {
    VueNumberInput,
    ContactUsModal,
  },
  data() {
    return {
      items: [],
      ShowContactusModal: false,
      ContactusModalContent: "",
      ContactusModalTitle: "",
      ismounted: false,
    };
  },
  created() {
    document.title = this.$store.state.projecttitle + " - Box Storage";
  },
  mounted() {
    this.ismounted = true;
  },
  methods: {
    calculate(boxindex) {
      if (this.ismounted) {
        var selectedbox = this.vmodel.boxstorages
          .filter((x) => {
            return x.index == boxindex;
          })
          .map((result) => {
            return result;
          });

        this.vmodel.selectedboxes = this.vmodel.selectedboxes
          .filter((x) => {
            return x.boxid != selectedbox[0]._id;
          })
          .map((result) => {
            return result;
          });

        if (selectedbox[0].value > 0) {
          var boxdetail = {
            boxid: selectedbox[0]._id,
            boxtype: selectedbox[0].title,
            noofbox: selectedbox[0].value,
            charges: selectedbox[0].price * selectedbox[0].value,
          };

          this.vmodel.selectedboxes.push(boxdetail);
        }

        this.vmodel.totalbox = 0;
        this.vmodel.charges = 0;
        this.vmodel.selectedboxes.forEach((element) => {
          this.vmodel.totalbox = this.vmodel.totalbox + element.noofbox;
          this.vmodel.charges = this.vmodel.charges + element.charges;
        });
      }
    },
    checklogin() {
      if (
        this.$store.state.regUserInfo.userId != "" &&
        this.$store.state.regUserInfo.userId != null &&
        this.vmodel.charges > 0
      ) {
        this.$emit("isconfirm", this.vmodel);
      } else if (this.vmodel.charges > 0) {
        this.$emit("loginmodalvalue");
      }

      if (this.vmodel.charges <= 0) {
        this.$dangerAlert("Payment amount should not be zero.");
      }
    },
  },
  watch: {
    haslogindata: function (newVal, oldVal) {
      if (newVal != oldVal && this.vmodel.charges > 0) {
        this.$emit("isconfirm", this.vmodel);
      }
    },
  },
};
</script>
<style scoped>
a.looking-better1 {
  background: #ef2b37;
  border: 0;
  outline: 0;
  padding: 15px 14px 15px 45px;
  position: relative;
}
a {
  font-size: 18px;
  line-height: 24px;
  color: #ffffff;
}
a.looking-better1:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  border-bottom: 55px solid transparent;
  border-left: 45px solid #ffffff;
  width: 0;
}

a.book-now1:before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  border-top: 56px solid transparent;
  border-right: 45px solid #ffffff;
  width: 0;
}

a.book-now1 {
  background: #465ecb;
  border: 0;
  outline: 0;
  padding: 15px 45px 15px 14px;
  position: relative;
}

.buttons2 {
  display: contents !important;
}

body {
  padding: 40px;
}

.our-feature ul li .content-wrap .content h3 {
  padding: 24px 0px 23px 0px;
  margin-bottom: 0;
  text-align: left;
  font-size: 30px;
}

.count {
  font-size: 25px;
  color: #465ecb;
  text-align: right;
}

.total {
  padding-left: 3.375rem;
  padding-right: 3.375rem;
  font-size: 60px;
}

.img-content img {
  height: 250px !important;
}

[v-cloak] {
  display: none;
}

.price {
  color: #007bff;
}
.price {
  font-size: 45px;
  line-height: 135.94%;
  color: #465ecb;
}
.price-per {
  font-size: 25px;
  line-height: 135.94%;
  color: #465ecb;
}
.pricetext4 {
  font-size: 35px !important;
  line-height: 225% !important;
}
.pricetext5 {
  font-size: 29px !important;
  line-height: 303% !important;
}
.pricetext6 {
  font-size: 24px !important;
  line-height: 403% !important;
}
.pricetext7 {
  font-size: 21px !important;
  line-height: 480% !important;
}
</style>
<style>
.number-input {
  font-size: 60px !important;
  border: transparent !important;
  line-height: 80% !important;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  display: flex;
  align-items: center;
  text-align: center;
  color: #455a64;
}

.number-input__button--minus {
  color: #455a64;
  border-right: transparent !important;
  left: 1px;
  width: 4rem !important;
}

.number-input__button--plus {
  color: #455a64;
  border-left: transparent !important;
  right: 1px;
  width: 4rem !important;
  height: 4rem !important;
  padding-right: 20px;
  margin-top: 10px;
}

.number-input__input {
  font-size: 60px !important;
  border: transparent !important;
  line-height: 80% !important;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  display: flex;
  align-items: center;
  text-align: center;
  color: #455a64;
}
.modal {
  z-index: 1050 !important;
}
</style>
