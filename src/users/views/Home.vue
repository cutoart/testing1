<template>
  <div v-if="$store.state.resource != null">
    <!-- Slider ============================================= -->
    <BannerSlider />
    <!-- Cntent ============================================= -->
    <div class="content" id="content">
      <section class="our-storage">
        <div class="container">
          <ul class="row">
            <li id="self-store-cont" class="col-md-6">
              <div class="content-wrap">
                <div class="img-content">
                  <video-embed :src="itemsVideo.selfstorage"></video-embed>
                </div>
                <div class="content">
                  <div class="title">
                    <h2>{{ $store.state.resource.home.selfstoragetitle }}</h2>
                  </div>
                  <p>
                    {{ $store.state.resource.home.selfstoragetext }}
                  </p>
                  <div
                    class="row form-group"
                    style="font-size: 12px"
                    v-for="list in listOfMapValue"
                    :key="list.id"
                  >
                    <div class="col list">
                      {{ list.name }}
                    </div>
                    <div class="col-10 row">
                      <span
                        class="col-6 span-content"
                        v-for="item in items.filter(
                          (a) => a.state['value'] == list.id
                        )"
                        :key="item._id"
                      >
                        {{ item.storeName }} :{{
                          $store.state.language == "chinese"
                            ? item.branch.label.split("/")[1]
                            : item.branch.label.split("/")[0]
                        }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li class="col-md-6">
              <div class="content-wrap">
                <div class="img-content">
                  <video-embed :src="itemsVideo.boxstorage"></video-embed>
                </div>
                <div class="content">
                  <div class="title">
                    <h2>
                      {{ $store.state.resource.home.boxstoragetitle }}
                    </h2>
                  </div>
                  <p>
                    {{ $store.state.resource.home.boxstoragetext }}
                  </p>
                  <div class="box-storage">
                    <div class="title-content col-md-6">
                      <div class="title">
                        {{ $store.state.resource.home.boxstoragebyitem }}
                      </div>
                      <p>
                        {{ $store.state.resource.home.boxstoragebyitemtext }}
                      </p>
                      <div class="img-content">
                        <img src="../assets/images/by-item.png" />
                      </div>
                    </div>
                    <div class="title-content col-md-6">
                      <div class="title">
                        {{ $store.state.resource.home.boxstoragebysqft }}
                      </div>
                      <p>
                        {{ $store.state.resource.home.boxstoragebysqfttext }}
                      </p>
                      <div class="img-content">
                        <img src="../assets/images/by-square-feet.png" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>
      <section class="our-feature">
        <div class="container">
          <div class="sectoin-title">
            <h2 >
              {{ $store.state.resource.home.ourfeaturetitle }}
            </h2>
          </div>
          <div class="section-content">
            <p style="font-size:25px">
              {{ $store.state.resource.home.ourfeaturetext }}
            </p>
          </div>
          <ul class="row">
            <li class="col-xl-4 col-lg-6 col-md-6 col-sm-12 pl-5 pr-3">
              <div class="content-wrap">
                <div class="img-content">
                  <img src="../assets/images/our-feature-1.png" />
                </div>
                <div class="content">
                  <h3 class="title">
                    <a
                      v-on:click="booknow('/service/selfstorage')"
                      style="cursor: pointer;font-size:28px"
                      >{{
                        $store.state.resource.home.ourfeaturesselfstorage
                      }}</a
                    >
                  </h3>
                  <p style="font-size:21px">
                    {{ $store.state.resource.home.ourfeaturesselfstoragetext }}
                  </p>
                  <div class="buttons btn-book">
                    <a
                      class="btn btn-primary book-now"
                      v-on:click="booknow('/service/selfstorage')"
                      sty
                      >{{
                        $store.state.resource.home
                          .ourfeaturesselfstoragebtnbooknow
                      }}</a
                    >
                    <a
                      class="btn btn-primary looking-better"
                      v-on:click="booknow('/service/selfstorage')"
                      >{{
                        $store.state.resource.home
                          .ourfeaturesselfstoragebtnlooking
                      }}</a
                    >
                  </div>
                </div>
              </div>
            </li>
            <li class="col-xl-4 col-lg-6 col-md-6 col-sm-12 pl-5 pr-3">
              <div class="content-wrap">
                <div class="img-content">
                  <img src="../assets/images/our-feature-1.png" />
                </div>
                <div class="content">
                  <h3 class="title">
                    <a
                      v-on:click="booknow('/service/boxstorage')"
                      style="cursor: pointer;font-size:28px"
                      >{{ $store.state.resource.home.ourfeaturesstoragebox }}</a
                    >
                  </h3>
                  <p style="font-size:21px">
                    {{ $store.state.resource.home.ourfeaturesstorageboxtext }}
                  </p>
                  <div class="buttons btn-book">
                    <a
                      class="btn btn-primary book-now"
                      v-on:click="booknow('/service/boxstorage')"
                      >{{
                        $store.state.resource.home
                          .ourfeaturesstorageboxbtnbooknow
                      }}</a
                    >
                    <a
                      class="btn btn-primary looking-better"
                      v-on:click="booknow('/service/boxstorage')"
                      >{{
                        $store.state.resource.home
                          .ourfeaturesstorageboxbtnlooking
                      }}</a
                    >
                  </div>
                </div>
              </div>
            </li>
            <li class="col-xl-4 col-lg-6 col-md-6 col-sm-12 pl-5 pr-3">
              <div class="content-wrap">
                <div class="img-content">
                  <img src="../assets/images/our-feature-1.png" />
                </div>
                <div class="content">
                  <h3 class="title">
                    <a href="#" style="font-size:28px">{{
                      $store.state.resource.home.ourfeaturesmovingservice
                    }}</a>
                  </h3>
                  <p style="font-size:21px">
                    {{
                      $store.state.resource.home.ourfeaturesmovingservicetext
                    }}
                  </p>
                  <div class="buttons btn-book">
                    <a class="btn btn-primary book-now" href="#">{{
                      $store.state.resource.home
                        .ourfeaturesmovingservicebtnbooknow
                    }}</a>
                    <a href="#" class="btn btn-primary looking-better">{{
                      $store.state.resource.home
                        .ourfeaturesmovingservicebtnlooking
                    }}</a>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import APIService from "@/services/api.service.js";
import Store from "@/store/index";
import BannerSlider from "@/users/component/bannerslider";

export default {
  data() {
    return {
      items: [],
      itemsVideo: [],
      listOfMapValue: [],
    };
  },
  components: {
    BannerSlider: BannerSlider,
  },
  methods: {
    booknow(url) {
      this.$router.push(url);
    },
  },
  created() {
    if (window.location.href.indexOf("changepassword") > 0) {
      this.$emit("changepassword");
    }
    Store.commit("showLoader");
    document.title = this.$store.state.projecttitle + " - Home";
    APIService.post(
      "/storelist",
      { userType: "user", languageType: this.$store.state.language },
      null
    ).then((response) => {
      Store.commit("hideLoader");
      if (response.data) {
        this.listOfMapValue = [];
        for (var j = 0; j < response.data.length; j++) {
          this.listOfMapValue = this.listOfMapValue.filter(
            (a) => a.id != response.data[j].state.value
          );
          const tag = {
            name: response.data[j].state.label,
            id: response.data[j].state.value,
          };
          this.listOfMapValue.push(tag);
        }
      }
      this.$set(this, "items", response.data);
    });
    APIService.getById("/GetVideo", "").then((response) => {
      if (
        response.data != null &&
        response.data != "" &&
        response.data != undefined
      ) {
        this.itemsVideo = response.data[0];
      }
    });
  },
};
</script>
<style scoped>
.sectoin-title h2 {
  font-weight: bold;
  color:#4B5FC4 !important
}
.our-feature ul li .content-wrap .content .buttons {
  position: absolute;
  left: 0;
  right: 0;
  padding: 0px 0px !important;
}
.btn-book {
  margin-left: 47px;
}

.our-feature ul li .content-wrap .content a.book-now {
  background: #465ecb;
  border: 0;
  outline: 0;
  padding: 15px 70px 15px 10px;
  position: relative;
  font-size: 18px !important;
  line-height: 24px;
}
.our-feature ul li .content-wrap .content a.looking-better {
  background: #ef2b37;
  border: 0;
  outline: 0;
  padding: 15px 34px 15px 44px;
  position: relative;
  font-size: 18px !important;
  line-height: 24px;
}

.our-feature ul li .content-wrap .content a.book-now:before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  border-top: 60px solid transparent;
  border-right: 50px solid #f2f2f2;
  width: 0;
}

.our-feature ul li .content-wrap .content a.looking-better:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  border-bottom: 60px solid transparent;
  border-left: 50px solid #f2f2f2;
  width: 0;
}
.list {
  color: #4e7082;
  font-size: 12px;
}
.span-content {
  font-size: 12px;
  color: #92a7d8;
  margin-bottom: 8px;
}
.cursor {
  cursor: pointer;
}
.banner-image {
  max-height: 600px;
}
.btn-book {
  display: inline-flex;
}

@media only screen and (max-width: 1200px) {
  .btn-book {
    margin-left: 47px;
  }
}

@media only screen and (max-width: 1024px) {
  .btn-book {
    margin-left: 47px;
  }
  .our-feature ul li .content-wrap .content a.book-now {
    font-size: 19px !important;
    padding: 15px 100px 15px 10px;
  }
  .our-feature ul li .content-wrap .content a.looking-better {
    padding: 15px 100px 15px 44px;
    font-size: 18px !important;
  }
}

@media only screen and (max-width: 992px) {
  .our-storage,
  .our-feature {
    padding: 25px 0px;
  }
  .our-storage .container,
  .our-feature .container {
    padding-left: 0;
    padding-right: 0;
  }

  .our-feature ul {
    padding-top: 20px;
  }

  .btn-book {
    display: inline-flex;
    height: 40px;
    margin-left: 47px;
  }

  .btn-book .book-now {
    z-index: 2;
    padding-top: 8px !important;
    font-size: 16px !important;
  }

  .btn-book .looking-better {
    z-index: 1;
    padding-top: 8px !important;
    font-size: 16px !important;
    margin-left: -17px;
  }
}
/* @media only screen and (min-width: 768px) and (max-width: 992px)  {
   .our-feature ul li .content-wrap .content a.book-now {
    font-size: 19px !important;
    padding: 15px 70px 15px 10px;
  }
  .our-feature ul li .content-wrap .content a.looking-better {
    font-size: 18px !important;
    padding: 15px 34px 15px 44px;
  }
} */
@media only screen and (max-width: 768px) {
  .banner-image {
    height: auto !important;
  }
  .our-storage,
  .our-feature {
    padding: 25px 0px;
  }
  .our-storage .container,
  .our-feature .container {
    padding-left: 0;
    padding-right: 0;
  }

  #self-store-cont {
    margin-bottom: 20px;
  }

  .our-storage
    ul
    li
    .content-wrap
    .content
    .box-storage
    .title-content:first-child {
    border-right: none;
  }

  .our-feature ul {
    padding-top: 20px;
  }
  .our-feature ul li .content-wrap .content a.book-now {
    padding: 15px 70px 15px 10px;
    font-size: 19px !important;
  }
  .our-feature ul li .content-wrap .content a.looking-better {
    padding: 15px 34px 15px 44px;
    font-size: 18px !important;
  }
  /* .our-feature ul li .content-wrap .content a.book-now {
    font-size: 19px !important;
  }
  .our-feature ul li .content-wrap .content a.looking-better {
    font-size: 18px !important;
  } */
  .btn-book {
    display: inline-flex;
    height: 40px;
    margin-left: 49px;
  }

  .btn-book .book-now {
    z-index: 2;
    padding-top: 8px !important;
    font-size: 16px !important;
  }

  .btn-book .looking-better {
    z-index: 1;
    padding-top: 8px !important;
    font-size: 16px !important;
    margin-left: -17px;
  }
}

@media only screen and (max-width: 425px) {
  .btn-book {
    margin-left: 47px;
  }
  .our-feature ul li .content-wrap .content a.book-now {
    font-size: 22px !important;
  }
  .our-feature ul li .content-wrap .content a.looking-better {
    font-size: 23px !important;
  }
}

@media only screen and (max-width: 375px) {
  .our-feature ul li .content-wrap .content a.book-now {
    font-size: 17px !important;
  }
  .our-feature ul li .content-wrap .content a.looking-better {
    font-size: 17px !important;
  }
  /* .btn-book {
    margin-left: 20px;
  } */
}

@media only screen and (max-width: 320px) {
  .our-feature ul li .content-wrap .content a.book-now {
    font-size: 12px !important;
  }
  .our-feature ul li .content-wrap .content a.looking-better {
    font-size: 12px !important;
  }
  /* .btn-book {
    margin-left: 19px;
  } */
}

@media only screen and (min-width: 769px) and (max-width: 790px) {
  .btn-book {
    margin-left: 37px;
  }
}


</style>
