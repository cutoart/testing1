<template>
  <div style="background: #f9f9f9">
    <header id="fancy-header" class="fancy-header">
      <div class="container">
        <h2 class="fancy-title">{{ $store.state.resource.faq.faqheading }}</h2>
      </div>
    </header>
    <div class="content" id="content">
      <div class="about-us-content main">
        <div class="container">
          <CCol xl="12">
            <CCard>
              <CCardBody
                style="padding: 0px"                
              >
                <div
                  style="padding-bottom: 10px"
                  class="content block"
                  id="content"
                  v-for="(item, index) in items"
                  v-bind:key="index"
                >
                  <CCard class="mb-0">
                    <CButton
                      block
                      class="text-left shadow-none card-header d-flex bblock"
                      @click="
                        accordion = accordion === item._id ? false : item._id
                      "
                    >
                      <h5
                        style="
                          white-space: normal;
                          word-wrap: break-word;
                          width: 95%;
                        "
                      >
                        {{ item.question }}
                      </h5>
                      <div v-if="accordion != item._id">
                        <b-icon-plus class="plus" variant="dark"></b-icon-plus>
                        <!-- <div class="icon-right"></div>
                        <div class="icon-right1"></div> -->
                      </div>
                      <div v-if="accordion == item._id">
                        <b-icon-dash class="plus" variant="dark"></b-icon-dash>
                      </div>
                    </CButton>
                    <CCollapse :show="accordion === item._id">
                      <CCardBody class="cblock">
                        {{ item.answer }}
                      </CCardBody>
                    </CCollapse>
                  </CCard>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import APIService from "@/services/api.service.js";
import Store from "@/store/index";
export default {
  name: "FAQ",
  data() {
    return {
      collapse: false,
      cardCollapse: true,
      innerCollapse: false,
      accordion: 0,
      items: {},
    };
  },
  created() {
    document.title = this.$store.state.projecttitle + " - FAQ";
    Store.commit("showLoader");
    APIService.post("/ListOfFAQ", { usertype: "user" }, null).then(
      (response) => {
        Store.commit("hideLoader");
        response.data = response.data.filter(
          (x) => x.language == this.$store.state.language
        );
        this.$set(this, "items", response.data);
        
        if (this.items != null && this.items != [] && this.items.length > 0)
          this.accordion = this.items[0]._id;

      }
    );
  },
};
</script>
<style scoped>
.icon-right {
  height: 5px;
  background: #333232;
  width: 37px;
  position: absolute;
  margin-top: 13px;
  right: 3%;
}
.icon-right1 {
  height: 37px;
  background: #333232;
  width: 5px;
  position: absolute;
  margin-left: 20px;
  margin-top: -3px;
}
.block {
  padding-bottom: 10px;
  background: transparent;
}
.main {
  background: #f9f9f9;
}
.bblock {
  background: #e6e6e6;
}
.cblock {
  background: #ffffff;
}
.plus {
  font-size: 40px !important;
}
</style>
