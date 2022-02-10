<template>
  <div>
    <header id="fancy-header" class="fancy-header">
      <div class="container">
        <h2 class="fancy-title">
          {{ $store.state.resource.newsandactivities.newsandactivities }}
        </h2>
      </div>
    </header>
    <div class="content" id="content">
      <div class="about-us-content" style="background: #f9f9f9">
        <div class="container">
          <CRow sm="12" v-if="commentIndex < items.length">
            <CCol
              sm="4"
              md="4"
              v-for="commentIndex in commentsToShow"
              v-bind:key="commentIndex._id"
            >
              <img
                :src="
                  $store.state.apiURL +
                  '/newsandactivities/' +
                  items[commentIndex - 1].image
                "
                class="image"
              />
              <div class="date">
                <span>{{ items[commentIndex - 1].date }}</span>
              </div>
              <div class="title">
                <span>{{ items[commentIndex - 1].title }}</span>
              </div>
              <div class="description">
                <span
                  ><p class="box">
                    <span
                      v-html="items[commentIndex - 1].description"
                    ></span></p></span
                ><a
                  href="javascript:;"
                  @click="
                    (ShowContactusModal = true),
                      (ContactusModalContent =
                        items[commentIndex - 1].description)
                  "
                  >{{
                    $store.state.resource.newsandactivities.btnviewmore
                  }}
                  ></a
                >
              </div>
            </CCol>
          </CRow>
          <div
            class="from-group col-md-12 text-center"
            v-if="
              commentsToShow < items.length || items.length > commentsToShow
            "
          >
            <button class="btn btn-primary" @click="showComments()">
              {{ $store.state.resource.newsandactivities.btnloadmore }}
              >
            </button>
          </div>
        </div>
      </div>
    </div>
    <CModal
      :title="$store.state.resource.newsandactivities.modaltitle"
      :show.sync="ShowContactusModal"
    >
      <ContactUsModal
        :ShowContactusModal.sync="ShowContactusModal"
        :content="ContactusModalContent"
      />
    </CModal>
  </div>
</template>

<script>
import APIService from "@/services/api.service.js";
import Store from "@/store/index";
import ContactUsModal from "../../admin/views/ContactusModal";

export default {
  name: "NewsandActivities",
  components: {
    ContactUsModal,
  },
  data() {
    return {
      items: [],
      commentsToShow: 0,
      totalComments: 0,
      commentIndex: 0,
      ShowContactusModal: false,
      ContactusModalContent: "",
    };
  },

  created() {
    document.title = this.$store.state.projecttitle + " - News & Activities";
    Store.commit("showLoader");
    APIService.post(
      "/ListOfNewsandActivities",
      { usertype: "user" },
      null
    ).then((response) => {
      Store.commit("hideLoader");
      response.data = response.data.filter(
        (x) => x.language == this.$store.state.language
      );
      this.$set(this, "items", response.data);
      this.totalComments = response.data.length;
      if (this.totalComments > 6) {
        this.commentsToShow = 6;
      } else {
        this.commentsToShow = this.totalComments;
      }
    });
  },
  methods: {
    showComments() {
      this.commentsToShow + 6 > this.totalComments
        ? (this.commentsToShow = this.totalComments)
        : (this.commentsToShow += 6);
    },
  },
};
</script>
<style scoped>
.image {
  height: 191px;
  width: 370px;
}
.date {
  margin-top: 14px;
  margin-bottom: 10px;
  color: #000000;
  font-size: 12px;
}
.title {
  font-weight: bold;
  font-size: 30px;
  line-height: 35px;
  margin-bottom: 10px;
  color: #000000;
}
.description {
  font-size: 12px;
  color: #000000;
  line-height: 14.06px;
  margin-bottom: 50px;
}
.box {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
@media only screen and (max-width: 992px) {
  .image[data-v-270991c0] {
    height: 160px;
    width: 200px;
  }
  .title[data-v-270991c0] {
    font-size: 20px;
    line-height: 25px;
  }
}

@media only screen and (max-width: 765px) {
  .image[data-v-270991c0] {
    height: 160px;
    width: 350px;
  }
  .title[data-v-270991c0] {
    font-size: 25px;
    line-height: 30px;
  }
}

@media only screen and (min-device-width: 1024px) and (max-device-width: 1170px) {
  .image {
    width: 300px;
  }
}
</style>
