<template>
  <div class="my-account-details-content col-md-9">
    <div id="section-user-info" class="tab-content">
      <div class="info content">
        <div class="row">
          <div class="col-6 section-title">
            <b>{{ $store.state.resource.box.mybox }}</b>
          </div>
          <div class="col-6 text-right section-title">
            <b>{{ $store.state.resource.box.needmore }}</b>
          </div>
        </div>
        <div class="row scrollbar">
          <div>
            <table>
              <thead>
                <tr>
                  <th>{{ $store.state.resource.box.paymentdate }}</th>
                  <th>{{ $store.state.resource.box.paymentid }}</th>
                  <th>{{ $store.state.resource.box.totalboxes }}</th>
                  <th>{{ $store.state.resource.box.totalcharges }}</th>
                  <th>{{ $store.state.resource.box.appointmentdate }}</th>
                  <th>{{ $store.state.resource.box.appointmenttime }}</th>
                  <th>{{ $store.state.resource.box.action }}</th>
                </tr>
              </thead>
              <tbody
                v-for="item in boxstorages.filter(
                  (type) => type.servicetype == 'boxstorage'
                )"
                v-bind:key="item.id"
              >
                <tr>
                  <td>
                    {{ $formatDate(item.CreateDate) }}
                  </td>
                  <td>
                    {{ item.billinginfo.paymentid }}
                  </td>
                  <td>
                    {{ item.selectedboxes.totalBoxes }}
                  </td>
                  <td>
                    {{ item.selectedboxes.totalCharges }}
                  </td>
                  <td>
                    {{ item.bookingdetail.appointment.date }}
                  </td>
                  <td>
                    {{ item.bookingdetail.appointment.starttime }} -
                    {{ item.bookingdetail.appointment.endtime }}
                  </td>
                  <td>
                    <router-link
                      style="cursor: pointer"
                      :to="'/service?renewid=' + item._id"
                      v-if="
                        item.renew == false &&
                        item.status != 'Retrieve' &&
                        item.renewenable == true
                      "
                      >{{ $store.state.resource.storage.renew }}</router-link
                    >
                  </td>
                  <td
                    class="hoverlink"
                    style="cursor: pointer"
                    @click="showBoxDetails(item._id)"
                  >
                    {{ $store.state.resource.box.showdetails }}
                  </td>
                </tr>
                <tr v-if="item._id == boxId">
                  <td colspan="6">
                    <table>
                      <thead>
                        <tr>
                          <th>{{ $store.state.resource.box.detailboxtype }}</th>
                          <th>
                            {{ $store.state.resource.box.detailnoofboxes }}
                          </th>
                          <th>{{ $store.state.resource.box.detailcharges }}</th>
                          <th>
                            {{ $store.state.resource.box.detailboxnumber }}
                          </th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="items in item.selectedboxes"
                          :key="items.boxid"
                        >
                          <td>
                            {{ items.boxtype }}
                          </td>
                          <td>{{ items.noofbox }}</td>
                          <td>{{ items.charges }}</td>
                          <td>
                            {{
                              items.boxnumbers !== undefined &&
                              items.boxnumbers !== null
                                ? items.boxnumbers.join(", ")
                                : ""
                            }}
                          </td>
                          <td
                            class="hoverlink"
                            style="cursor: pointer"
                            @click="
                              (ShowBoxImageModal = true),
                                (user.paymentid = item._id),
                                (imageboxid = items.boxid),
                                (maxboxes = items.noofbox),
                                (user.boximages =
                                  items.boximages != undefined
                                    ? items.boximages
                                    : []),
                                (user.uploadedboximages =
                                  items.boximages != undefined
                                    ? items.boximages
                                    : [])
                            "
                          >
                            {{ $store.state.resource.box.changephoto }}
                          </td>
                        </tr>
                      </tbody>
                      <tbody></tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <CModal
      :title="$store.state.resource.box.modalchangephoto"
      :show.sync="ShowBoxImageModal"
    >
      <vue-upload-multiple-image
        @upload-success="uploadImageSuccess"
        @before-remove="beforeRemove"
        @edit-image="editImage"
        :data-images="user.boximages"
        :dragText="$store.state.resource.box.modaldragimages"
        :browseText="$store.state.resource.box.modalselect"
        primaryText="Default"
        markIsPrimaryText="Set as default"
        :maxImage="maxboxes"
        popupText="This image will be displayed as default"
        dropText="Drop your file here ..."
        accept="image/jpeg,image/png,image/jpg"
        style="padding-left: 8rem !important"
      ></vue-upload-multiple-image>
      <CButton
        type="button"
        class="mr-1"
        color="primary"
        :disabled="submitted"
        style="cursor: pointer; float: right"
        @click="handleBoxSubmit()"
        >{{ $store.state.resource.box.modalbtnupload }}</CButton
      >
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
      boxstorages: [],
      boxId: "",
      imageboxid: "",
      ShowBoxImageModal: false,
      maxboxes: 0,
      user: {
        paymentid: "",
        boximages: [],
        uploadedboximages: [],
      },
      submitted: false,
    };
  },
  methods: {
    showBoxDetails(boxid) {
      if (boxid == this.boxId) {
        this.boxId = "";
      } else {
        this.boxId = boxid;
      }
    },
    uploadImageSuccess(formData, index, fileList) {
      console.log("databox", formData, index, fileList);
      this.user.uploadedboximages.push(fileList[index]);
    },
    beforeRemove(index, done, fileList) {
      console.log("indexbox", index, fileList);
      var r = confirm("Are you sure you want to remove selected image?");
      if (r == true) {
        this.user.uploadedboximages = fileList;
        this.user.boximages = fileList;
        done();
      }
    },
    editImage(formData, index, fileList) {
      console.log("edit box data", formData, index, fileList);
      this.user.uploadedboximages[index] = fileList[0];
    },
    handleBoxSubmit() {
      this.submitted = true;
      if (
        this.user.paymentid != undefined &&
        this.user.paymentid != null &&
        this.user.paymentid != "" &&
        ((this.user.uploadedboximages != null &&
          this.user.uploadedboximages != [] &&
          this.user.uploadedboximages.length > 0) ||
          (this.user.boximages != null &&
            this.user.boximages != [] &&
            this.user.boximages.length > 0))
      ) {
        this.user.boxid = this.imageboxid;
        APIService.post(
          "/updatepaymentboximage",
          this.user,
          this.user.paymentid
        ).then(() => {
          this.$successAlert("image Updated Successfully!!!.");
          this.getboxdata();
          this.ShowBoxImageModal = false;
          this.submitted = false;
        });
      } else {
        this.submitted = false;
        this.$dangerAlert("Image(s) is required.");
      }
    },
    getboxdata() {
      Store.commit("showLoader");
      APIService.getById("/getglobalsettings", null).then((responsesett) => {
        var noofdaysbeforerenew = 0;
        if (
          responsesett.data !== null &&
          responsesett.data !== undefined &&
          responsesett.data.length > 0
        ) {
          noofdaysbeforerenew =
            responsesett.data[0].boxstoragenoofdays != undefined
              ? responsesett.data[0].boxstoragenoofdays
              : 0;
        }

        APIService.post(
          "/getpaymentbyuserid",
          { type: "boxstorage" },
          this.id
        ).then((response) => {
          Store.commit("hideLoader");

          for (var i = 0; i < response.data.length; i++) {
            var sum = 0;
            var sumOfBoxes = 0;
            for (var j = 0; j < response.data[i].selectedboxes.length; j++) {
              response.data[i].selectedboxes.Document =
                response.data[i].selectedboxes[j].boxtype == "Document Storage";
              response.data[i].selectedboxes.totalCharges = sum +=
                response.data[i].selectedboxes[j].charges;
              response.data[i].selectedboxes.totalBoxes = sumOfBoxes +=
                response.data[i].selectedboxes[j].noofbox;
            }
            var _duedate = new Date(response.data[i].duedate);
            if (
              noofdaysbeforerenew == 0 ||
              _duedate.setDate(_duedate.getDate() - noofdaysbeforerenew) <=
                new Date()
            ) {
              response.data[i].renewenable = true;
            } else {
              response.data[i].renewenable = false;
            }
          }
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
              for (
                var _selectedboxes = 0;
                _selectedboxes < response.data[storedata].selectedboxes.length;
                _selectedboxes++
              ) {
                if (
                  response.data[storedata].selectedboxes[_selectedboxes]
                    .boximages != undefined &&
                  response.data[storedata].selectedboxes[_selectedboxes]
                    .boximages != null
                ) {
                  for (
                    var boximage = 0;
                    boximage <
                    response.data[storedata].selectedboxes[_selectedboxes]
                      .boximages.length;
                    boximage++
                  ) {
                    var _boximage = {
                      default: boximage == 0 ? 1 : 0,
                      highlight: boximage == 0 ? 1 : 0,
                      name:
                        response.data[storedata].selectedboxes[_selectedboxes]
                          .boximages[boximage],
                      path:
                        this.$store.state.apiURL +
                        "/payment/" +
                        response.data[storedata].selectedboxes[_selectedboxes]
                          .boximages[boximage],
                    };
                    response.data[storedata].selectedboxes[
                      _selectedboxes
                    ].boximages[boximage] = _boximage;
                  }
                  response.data[storedata].selectedboxes[
                    _selectedboxes
                  ].uploadedimages =
                    response.data[storedata].selectedboxes[
                      _selectedboxes
                    ].boximages;
                }
              }
            }
          }
          this.$set(this, "boxstorages", response.data);
        });
      });
    },
  },
  created() {
    document.title = this.$store.state.projecttitle + " - My Box";
    this.getboxdata();
  },
};
</script>

<style scoped>
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
  .my-account-details-content .tab-content .content[data-v-729daac1] {
    padding: 20px 20px;
    margin-top: 0px;
    margin-left: 20px;
  }
}

@media only screen and (max-width: 765px) {
  .my-account-details-content .tab-content .content[data-v-729daac1] {
    padding: 20px 20px;
    margin-top: 20px;
    margin-left: 0px;
  }
}
</style>
