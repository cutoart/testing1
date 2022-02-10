<template>
  <div>
    <CCol>
      <CCard
        v-if="
          item != null && item != undefined && item.servicetype != undefined
        "
      >
        <CCardHeader>
          <CRow>
            <CCol>
              <h4>Order Detail</h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <div v-if="item.servicetype == 'selfstorage'">
          <CCardBody>
            <CRow class="pl-2">
              <h5>Store Details</h5>
            </CRow>
            <CRow class="pt-3">
              <CCol class="col-4">
                <span style="font-weight: bold"> Store: </span>
                {{ item.storename }}
              </CCol>
              <CCol class="col-4">
                <span style="font-weight: bold"> Area: </span>
                {{ item.sqfeet }} sqfeet
              </CCol>
              <CCol class="col-4">
                <span style="font-weight: bold"> Duration: </span>
                {{ item.duration }} months
              </CCol>
            </CRow>
            <CRow class="pt-3">
              <CCol class="col-4">
                <span style="font-weight: bold"> Charges: </span>
                {{ item.charges }}
              </CCol>
            </CRow>
          </CCardBody>

          <CCardBody>
            <CRow class="pl-2">
              <h5>Personal Details</h5>
            </CRow>
            <CRow class="pt-3">
              <CCol class="col-4">
                <span style="font-weight: bold"> Name: </span>
                {{ item.firstname }} {{ item.lastname }}</CCol
              >
              <CCol class="col-4">
                <span style="font-weight: bold"> Email: </span> {{ item.email }}
              </CCol>
              <CCol class="col-4">
                <span style="font-weight: bold"> Phone Number: </span>
                {{ item.phonenumber }}
              </CCol>
            </CRow>
          </CCardBody>

          <CCardBody>
            <CRow class="pl-2">
              <h5>Appointment Details</h5>
            </CRow>
            <CRow class="pt-3">
              <CCol class="col-4">
                <span style="font-weight: bold"> Date: </span>
                {{ item.appointment.date }}
              </CCol>
              <CCol class="col-4">
                <span style="font-weight: bold"> Time: </span>
                {{ item.appointment.starttime }} -
                {{ item.appointment.endtime }}
              </CCol>
            </CRow>
          </CCardBody>

          <CCardBody>
            <CRow class="pl-2">
              <h5>Billing Details</h5>
            </CRow>
            <CRow class="pt-3">
              <CCol class="col-4">
                <span style="font-weight: bold"> Name: </span>
                {{ item.billinginfo.firstname }} {{ item.billinginfo.lastname }}
              </CCol>
              <CCol class="col-4">
                <span style="font-weight: bold"> Phone Number: </span>
                {{ item.billinginfo.phonenumber }}
              </CCol>
              <CCol class="col-4">
                <span style="font-weight: bold"> Address: </span>
                {{ item.billinginfo.address }}
              </CCol>
            </CRow>
            <CRow class="pt-3">
              <CCol class="col-4">
                <span style="font-weight: bold"> Region: </span
                >{{ item.billinginfo.region }}</CCol
              >
              <CCol class="col-4">
                <span style="font-weight: bold"> Payment Id: </span>
                {{ item.billinginfo.paymentid }}</CCol
              >
              <CCol class="col-4">
                <span style="font-weight: bold"> Payment Date: </span>
                {{ $formatDate(item.CreateDate) }}</CCol
              >
            </CRow>
          </CCardBody>

          <CCardBody v-if="item.images != null">
            <CRow class="pl-2">
              <h5>Images</h5>
            </CRow>
            <div
              style="
                display: flex;
                margin-right: 10px;
                overflow: scroll;
                overflow-y: hidden;
              "
            >
              <div v-for="images in item.images" :key="images.images">
                <img
                  :src="$store.state.apiURL + '/payment/' + images"
                  style="
                    height: 150px !important;
                    width: 200px;
                    margin-right: 10px;
                  "
                />
              </div>
            </div>
          </CCardBody>

          <div v-if="optionstatus != null">
            <CCardFooter>
              <CButton
                type="submit"
                class="mr-1"
                v-on:click="submitstatus"
                :disabled="submitted"
                color="primary"
                >Save</CButton
              >
              <CButton
                type="button"
                router-link
                :to="{ name: 'ShippingOrder' }"
                class="mr-1"
                color="secondary"
                >Cancel</CButton
              >
            </CCardFooter>
          </div>
        </div>
        <div
          v-if="
            item.servicetype == 'boxstorage' ||
            item.servicetype == 'movingservice'
          "
        >
          <CCardBody>
            <CRow class="pl-2">
              <h5>Box Details</h5>
            </CRow>
            <CRow class="pt-3">
              <CCol
                class="col-6"
                v-for="list in item.selectedboxes"
                :key="list.boxid"
              >
                <CRow class="col-12">
                  <CCol class="col-6 p-0 pb-3"
                    ><span style="font-weight: bold">
                      {{ list.boxtype }} :</span
                    >
                    {{ list.noofbox }}
                    {{ getboxnumberdisplay(list.noofbox, list.boxid) }}</CCol
                  >
                  <CCol class="col-6 p-0 pb-3">
                    <span style="font-weight: bold"> Charge: </span>
                    {{ list.charges }}
                  </CCol>
                </CRow>
              </CCol>
            </CRow>
          </CCardBody>

          <CCardBody>
            <CRow class="pl-2">
              <h5>Booking Details</h5>
            </CRow>
            <CRow class="pt-3">
              <CCol class="col-3">
                <span style="font-weight: bold"> Name: </span>
                {{ item.bookingdetail.firstname }}
                {{ item.bookingdetail.lastname }}</CCol
              >
              <CCol class="col-3">
                <span style="font-weight: bold"> Email: </span>
                {{ item.bookingdetail.email }}
              </CCol>
              <CCol class="col-3">
                <span style="font-weight: bold"> Phone Number: </span>
                {{ item.bookingdetail.phonenumber }}
              </CCol>
              <CCol class="col-3">
                <span style="font-weight: bold"> Address: </span>
                {{ item.bookingdetail.address }}
              </CCol>
            </CRow>
            <CRow class="pt-3">
              <CCol class="col-3">
                <span style="font-weight: bold"> Region: </span>
                {{ item.bookingdetail.region }}
              </CCol>
              <CCol class="col-3">
                <span style="font-weight: bold"> walkup: </span>
                {{ item.bookingdetail.walkup }}
              </CCol>
              <CCol class="col-3">
                <span style="font-weight: bold"> remark: </span>
                {{ item.bookingdetail.remark }}
              </CCol>
            </CRow>
          </CCardBody>

          <CCardBody>
            <CRow class="pl-2">
              <h5>Appointment Details</h5>
            </CRow>
            <CRow class="pt-3">
              <CCol class="col-4">
                <span style="font-weight: bold"> Date: </span>
                {{ item.bookingdetail.appointment.date }}
              </CCol>
              <CCol class="col-4">
                <span style="font-weight: bold"> Time: </span>
                {{ item.bookingdetail.appointment.starttime }} -
                {{ item.bookingdetail.appointment.endtime }}
              </CCol>
            </CRow>
          </CCardBody>

          <CCardBody>
            <CRow class="pl-2">
              <h5>Billing Details</h5>
            </CRow>
            <CRow class="pt-3">
              <CCol class="col-4">
                <span style="font-weight: bold"> Name: </span>
                {{ item.billinginfo.firstname }} {{ item.billinginfo.lastname }}
              </CCol>
              <CCol class="col-4">
                <span style="font-weight: bold"> Phone Number: </span>
                {{ item.billinginfo.phonenumber }}
              </CCol>
              <CCol class="col-4">
                <span style="font-weight: bold"> Address: </span>
                {{ item.billinginfo.address }}
              </CCol>
            </CRow>
            <CRow class="pt-3">
              <CCol class="col-4">
                <span style="font-weight: bold"> Region: </span
                >{{ item.billinginfo.region }}</CCol
              >
              <CCol class="col-4">
                <span style="font-weight: bold"> Payment Id: </span>
                {{ item.billinginfo.paymentid }}</CCol
              >
              <CCol class="col-4">
                <span style="font-weight: bold"> Payment Date: </span>
                {{ $formatDate(item.CreateDate) }}</CCol
              >
            </CRow>
          </CCardBody>

          <CCardBody v-if="item.images != null">
            <CRow class="pl-2">
              <h5>Images</h5>
            </CRow>
            <div style="display: flex; margin-right: 10px">
              <div v-for="images in item.images" :key="images.images">
                <img
                  :src="$store.state.apiURL + '/payment/' + images"
                  style="
                    height: 150px !important;
                    width: 200px;
                    margin-right: 10px;
                  "
                />
              </div>
            </div>
          </CCardBody>
          <CCardBody>
            <div v-for="list in item.selectedboxes" :key="list.boxid">
              <CRow class="col-12">{{ list.boxtype }} :</CRow>
              <CRow>
                <CCol
                  class="col-3"
                  v-for="boxindex in list.noofbox"
                  :key="boxindex"
                >
                  <CInput
                    :id="list.boxid + boxindex"
                    :ref="list.boxid + boxindex"
                    :value="getboxnumber(list.boxid, boxindex)"
                  />
                </CCol>
              </CRow>
            </div>
          </CCardBody>
          <div v-if="optionstatus != null">
            <CCardBody>
              <CRow>
                <CCol sm="6">
                  <span>Order Status*</span>
                  <v-select
                    style="margin-top: 8px"
                    v-model="status"
                    :options="optionstatus"
                    placeholder="Select Status"
                    :clearable="false"
                    :class="{ 'is-invalid': $v.status.$error }"
                  />
                  <div v-if="!$v.status.required" class="invalid-feedback">
                    Status is required.
                  </div>
                </CCol>
              </CRow>
            </CCardBody>

            <CCardFooter>
              <CButton
                type="submit"
                class="mr-1"
                v-on:click="submitstatus"
                :disabled="submitted"
                color="primary"
                >Save</CButton
              >
              <CButton
                type="button"
                router-link
                :to="{ name: 'ShippingOrder' }"
                class="mr-1"
                color="secondary"
                >Cancel</CButton
              >
            </CCardFooter>
          </div>
        </div>
      </CCard>
    </CCol>
  </div>
</template>

<script>
import APIService from "@/services/api.service.js";
import Store from "@/store/index";
import { required } from "vuelidate/lib/validators";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
  name: "OrderDetails",
  data() {
    return {
      item: [],
      id: this.$route.params.id,
      status: "",
      optionstatus: null,
      submitted: false,
      boxindex: [],
      selectedboxes: [],
    };
  },
  validations: {
    status: { required },
  },
  components: {
    vSelect,
  },
  created() {
    Store.commit("showLoader");
    this.getPaymentDetailsListData();
  },
  methods: {
    getPaymentDetailsListData() {
      APIService.getById("/orderdetailsbyid", this.id).then((response) => {
        for (var i = 0; i < response.data.length; i++) {
          response.data[i].images =
            this.$store.state.apiURL + "/payment/" + response.data[i].images;
        }
        this.selectedboxes = response.data.selectedboxes;
        this.$set(this, "item", response.data);

        this.status = this.item.status;
        if (this.status == "Processing") {
          this.optionstatus = ["Processing", "Confirm", "Retreat", "Retrieve"];
        } else if (this.status == "Confirm") {
          this.optionstatus = ["Confirm", "Retreat", "Retrieve"];
        } else if (this.status == "Retreat") {
          this.optionstatus = ["Retreat", "Retrieve"];
        }
        Store.commit("hideLoader");
      });
    },
    submitstatus() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      var newselctedboxes = this.item.selectedboxes;
      for (var boxes = 0; boxes < this.item.selectedboxes.length; boxes++) {
        var _boxnumbers = [];
        for (
          var noofboxs = 1;
          noofboxs <= this.item.selectedboxes[boxes].noofbox;
          noofboxs++
        ) {
          _boxnumbers.push(
            document.getElementById(
              this.item.selectedboxes[boxes].boxid + noofboxs
            ).value
          );
        }
        newselctedboxes[boxes].boxnumbers = _boxnumbers;
      }

      var vmodel = {
        paymentid: this.id,
        status: this.status,
        orderdata: this.item,
        selectedboxes: newselctedboxes,
      };

      if (this.item.status != this.status) {
        this.$confirm({
          message: "Are you sure your want to change status?",
          button: {
            no: "No",
            yes: "Yes",
          },
          callback: (confirm) => {
            if (confirm) {
              this.submitted = true;
              vmodel.apiurl = this.$store.state.apiURL;
              APIService.post("/updatepaymentstatus", vmodel).then(() => {
                this.$successAlert("Status Updated Successfully!!!.");
                this.$router.push({ name: "ShippingOrder" });
                this.submitted = false;
              });
            }
          },
        });
      } else {
        this.submitted = true;
        vmodel.apiurl = this.$store.state.apiURL;
        APIService.post("/updatepaymentstatus", vmodel).then(() => {
          this.$successAlert("Status Updated Successfully!!!.");
          this.$router.push({ name: "ShippingOrder" });
          this.submitted = false;
        });
      }
    },
    getboxnumber(boxid, boxindex) {
      if (
        this.selectedboxes.filter((x) => x.boxid == boxid)[0].boxnumbers !=
        undefined
      ) {
        return this.selectedboxes.filter((x) => x.boxid == boxid)[0].boxnumbers[
          boxindex - 1
        ];
      }
      return "";
    },
    getboxnumberdisplay(noofbox, boxid) {
      var _boxnumbers = [];
      for (var boxes = 0; boxes < noofbox; boxes++) {
        var number = this.getboxnumber(boxid, boxes + 1);
        if (number != null && number != undefined && number != "") {
          _boxnumbers.push(number);
        }
      }
      return _boxnumbers.length > 0 ? "(" + _boxnumbers.join(",") + ")" : "";
    },
  },
};
</script>
