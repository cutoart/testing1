<template>
  <div class="my-account-details-content storage col-md-9">
    <div id="section-user-info" class="tab-content">
      <div class="info content">
        <div class="row">
          <div class="col-6 section-title">
            <b>{{ $store.state.resource.storage.mystorage }}</b>
          </div>
          <div class="col-6 text-right section-title">
            <b>{{ $store.state.resource.storage.needmore }}</b>
          </div>
        </div>
        <div class="row scrollbar col-12">
          <div>
            <table>
              <tr>
                <th>{{ $store.state.resource.storage.storename }}</th>
                <th>{{ $store.state.resource.storage.location }}</th>
                <th>{{ $store.state.resource.storage.area }}</th>
                <th>{{ $store.state.resource.storage.duration }}</th>
                <th>{{ $store.state.resource.storage.paymentid }}</th>
                <th>{{ $store.state.resource.storage.paymentdate }}</th>
                <th>{{ $store.state.resource.storage.charges }}</th>
                <th>{{ $store.state.resource.storage.action }}</th>
                <th></th>
              </tr>
              <tr
                v-for="item in storages.filter(
                  (type) => type.servicetype == 'selfstorage'
                )"
                v-bind:key="item.index"
              >
                <td>{{ item.storename }} : {{ item.branchname }}</td>
                <td>{{ item.billinginfo.address }}</td>
                <td>
                  {{ item.sqfeet }}
                </td>
                <td>
                  {{ item.duration }}
                </td>
                <td>
                  {{ item.billinginfo.paymentid }}
                </td>
                <td>
                  {{ $formatDate(item.CreateDate) }}
                </td>
                <td>
                  {{ item.charges }}
                </td>
                <td>
                  <router-link
                    style="cursor: pointer"
                    :to="'/service?id=' + item.storeid + '&renewid=' + item._id"
                    v-if="item.renew == false"
                    >{{ $store.state.resource.storage.renew }}</router-link
                  >
                  <!-- v-if="new Date(item.duedate) <= new Date()" -->
                </td>
                <td
                  class="hoverlink"
                  style="cursor: pointer"
                  @click="
                    (ShowImageModal = true),
                      (user.paymentid = item._id),
                      (user.images =
                        item.images != undefined ? item.images : []),
                      (user.uploadedimages =
                        item.images != undefined ? item.images : [])
                  "
                >
                  {{ $store.state.resource.storage.changephoto }}
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
    <CModal
      :title="$store.state.resource.storage.modalchangephoto"
      :show.sync="ShowImageModal"
    >
      <vue-upload-multiple-image
        @upload-success="uploadImageSuccess"
        @before-remove="beforeRemove"
        @edit-image="editImage"
        :data-images="user.images"
        :dragText="$store.state.resource.storage.modaldragimages"
        :browseText="$store.state.resource.storage.modalselect"
        primaryText="Default"
        markIsPrimaryText="Set as default"
        :maxImage="10"
        popupText="This image will be displayed as default"
        dropText="Drop your file here ..."
        accept="image/jpeg,image/png,image/jpg"
        style="padding-left: 8rem !important"
      ></vue-upload-multiple-image>
      <CButton
        type="button"
        class="mr-1"
        color="primary"
        @click="handleSubmit()"
        :disabled="submitted"
        style="cursor: pointer; float: right"
        >{{ $store.state.resource.storage.modalbtnupload }}
      </CButton>
    </CModal>
  </div>
</template>

<script>
import APIService from "@/services/api.service.js";
import Store from "@/store/index";
import VueUploadMultipleImage from "vue-upload-multiple-image";

export default {
  components: {
    "vue-upload-multiple-image": VueUploadMultipleImage,
  },
  data() {
    return {
      id: this.$store.state.regUserInfo.userId,
      storages: [],
      billinginfo: [],
      ShowImageModal: false,
      user: {
        paymentid: "",
        images: [],
        uploadedimages: [],
      },
      submitted: false,
    };
  },
  methods: {
    uploadImageSuccess(formData, index, fileList) {
      console.log("data", formData, index, fileList);
      if (this.user.uploadedimages.length < 10) {
        this.user.uploadedimages.push(fileList[index]);
      }
    },
    beforeRemove(index, done, fileList) {
      console.log("index", index, fileList);
      var r = confirm("Are you sure you want to remove selected image?");
      if (r == true) {
        this.user.uploadedimages = fileList;
        this.user.images = fileList;
        done();
      }
    },
    editImage(formData, index, fileList) {
      console.log("edit data", formData, index, fileList);
      this.user.uploadedimages[index] = fileList[0];
    },
    handleSubmit() {
      this.submitted = true;
      if (
        this.user.paymentid != undefined &&
        this.user.paymentid != null &&
        this.user.paymentid != "" &&
        ((this.user.uploadedimages != null &&
          this.user.uploadedimages != [] &&
          this.user.uploadedimages.length > 0) ||
          (this.user.images != null &&
            this.user.images != [] &&
            this.user.images.length > 0))
      ) {
        APIService.post("/updatepaymentimage", this.user, this.user.paymentid).then(
          () => {
            this.$successAlert("image Updated Successfully!!!.");
            this.getboxdata();
            this.ShowImageModal = false;
            this.submitted = false;
          }
        );
      } else {
        this.submitted = false;
        this.$dangerAlert("Image(s) is required.");
      }
    },
    getboxdata() {
      Store.commit("showLoader");
      APIService.post(
        "/getpaymentbyuserid",
        { type: "selfstorage" },
        this.id
      ).then((response) => {
        Store.commit("hideLoader");
        if (
          response.data != undefined &&
          response.data != null &&
          response.data.length > 0
        ) {
          for (
            var storedata = 0;
            storedata < response.data.length;
            storedata++
          ) {
            if (response.data[storedata].images != undefined) {
              for (
                var image = 0;
                image < response.data[storedata].images.length;
                image++
              ) {
                var _image = {
                  default: image == 0 ? 1 : 0,
                  highlight: image == 0 ? 1 : 0,
                  name: response.data[storedata].images[image],
                  path:
                    this.$store.state.apiURL +
                    "/payment/" +
                    response.data[storedata].images[image],
                };
                response.data[storedata].images[image] = _image;
              }
              response.data[storedata].uploadedimages =
                response.data[storedata].images;
            }
          }
        }
        this.$set(this, "storages", response.data);
      });
    },
  },

  created() {
    document.title = this.$store.state.projecttitle + " - My Storage";
    this.getboxdata();
  },
};
</script>

<style scoped>
.storage {
  width: 760px;
}
.hoverlink:hover {
  color: blue;
}

table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border-bottom: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  font-size: 12px;
}
.section-title b {
  font-size: 20px;
  color: rgb(0, 0, 0);
  padding-top: 0px;
}
.my-account-details-content .tab-content .content {
  padding: 20px 20px;
}

.scrollbar::-webkit-scrollbar {
  height: 5px;
  background-color: #f5f5f5;
}
.scrollbar::-webkit-scrollbar-track {
  background-color: #f5f5f5;
}
.scrollbar::-webkit-scrollbar-thumb {
  background-color: #e5e5e5;
  border: 2px solid #e5e5e5;
}

.scrollbar {
  overflow-x: scroll;
}

@media only screen and (max-width: 992px) {
  .storage {
    width: 450px;
  }
  .my-account-details-content .tab-content .content[data-v-44a10f1e] {
    padding: 20px 20px;
    margin-top: 0px;
    margin-left: 20px;
  }
}

@media only screen and (max-width: 765px) {
  .storage {
    width: 335px;
  }
  .my-account-details-content .tab-content .content[data-v-44a10f1e] {
    padding: 20px 20px;
    margin-top: 20px;
    margin-left: 0px;
  }
}
</style>
