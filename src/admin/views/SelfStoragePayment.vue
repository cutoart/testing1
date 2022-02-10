<template>
  <div>
    <CCol>
      <CCard>
        <CCardHeader>
          <CRow>
            <CCol>
              <strong v-if="bookingId">Edit Self Storage Payment </strong>
              <strong v-else>Add Self Storage Payment </strong>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <h6 class="col-4">
              <strong>User Name :</strong>
              {{ item.userName }}
            </h6>
            <h6 class="col-4">
              <strong>User Email :</strong>
              {{ item.email }}
            </h6>
          </CRow>
          <CRow class="pt-3">
            <h5
              class="col-12"
              v-if="vmodel.selfstoragestep2.storedetail.branch != null"
            >
              {{ vmodel.selfstoragestep2.storedetail.storeName }} :
              {{ vmodel.selfstoragestep2.storedetail.branch.label }}
            </h5>
          </CRow>
          <CRow class="pt-3">
            <CCol>
              {{ $store.state.resource.selfstoragestep2storedetail.address }}:
              {{ vmodel.selfstoragestep2.storedetail.address }}
              <span v-if="vmodel.selfstoragestep2.storedetail.pincode != null">
                ,({{ vmodel.selfstoragestep2.storedetail.pincode }})
              </span>
            </CCol>
          </CRow>
          <CRow class="pt-3">
            <CCol>
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th style="width: 150px">
                      {{
                        $store.state.resource.selfstoragestep2storedetail
                          .usablearea
                      }}
                    </th>
                    <th style="width: 150px">
                      {{
                        $store.state.resource.selfstoragestep2storedetail
                          .widthdepth
                      }}
                    </th>
                    <th style="width: 150px">
                      {{
                        $store.state.resource.selfstoragestep2storedetail
                          .standardrate
                      }}
                    </th>
                    <th
                      v-for="_duration in selfstorecharges.storedurations"
                      v-bind:key="_duration.index"
                      style="width: 150px"
                    >
                      {{ _duration.months }}
                      {{
                        $store.state.resource.selfstoragestep2storedetail
                          .months
                      }}<br />({{ _duration.discount
                      }}{{
                        $store.state.resource.selfstoragestep2storedetail.off
                      }})
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="_charges in selfstorecharges.storecharges"
                    v-bind:key="_charges.index"
                  >
                    <td>{{ _charges.usablearea }}</td>
                    <td>
                      {{ _charges.areainwidth }}X{{ _charges.areaindepth }}
                    </td>
                    <td>{{ _charges.monthlyrate }}</td>
                    <td
                      v-for="_duration in selfstorecharges.storedurations"
                      v-bind:key="_duration.index"
                    >
                      {{
                        Math.round(
                          _duration.discount > 0
                            ? _charges.monthlyrate -
                                (_charges.monthlyrate * _duration.discount) /
                                  100
                            : _charges.monthlyrate
                        )
                      }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </CCol>
          </CRow>
          <CRow class="mt-3">
            <CCol sm="6">
              <strong>Commencement date :</strong>
            </CCol>
            <CCol sm="6">
              <strong>Order Status :</strong>
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="6">
              <b-datepicker
                id="date"
                class="form-control"
                :min="new Date()"
                :date-format-options="{
                  year: 'numeric',
                  month: 'short',
                  day: '2-digit',
                  weekday: 'short',
                }"
                v-model="book.commencementdate"
                :class="{
                  'is-invalid': $v.book.commencementdate.$error,
                }"
              ></b-datepicker>
              <span
                v-if="$v.book.commencementdate.required === false"
                class="invalid-feedback"
              >
                Commencement Date is required
              </span>
            </CCol>
            <CCol sm="6">
              <v-select
                v-model="book.status"
                :options="book.optionstatus"
                placeholder="Select Status"
                :clearable="false"
              />
            </CCol>
          </CRow>
          <CRow class="pl-3 mt-3">
            <strong>Select Square Feet :</strong>
          </CRow>
          <CRow>
            <CCol
              class="col-3"
              v-for="item in selfstorecharges.storecharges"
              :key="item.index"
            >
              <CButton
                class="col-12 mt-1 btn-secondary button-storecharge"
                :class="{
                  active: vmodel.selfstoragestep2.active_sq == item.index,
                }"
                @click="toggleClass(item.index)"
              >
                {{ item.usablearea }}
                {{ $store.state.resource.selfstoragestep2storedetail.btnsqft }}
              </CButton></CCol
            >
          </CRow>
          <CRow class="pl-3 mt-3">
            <strong>Select Month :</strong>
          </CRow>
          <CRow>
            <CCol
              class="col-3"
              v-for="item in selfstorecharges.storedurations"
              :key="item.index"
              @click="togglemonth(item.index)"
            >
              <CButton
                class="col-12 mt-1 btn-secondary button-storecharge"
                :class="{
                  active: vmodel.selfstoragestep2.active_month == item.index,
                }"
              >
                {{ item.months }}
                {{ $store.state.resource.selfstoragestep2storedetail.btnmonth }}
              </CButton></CCol
            >
          </CRow>
          <CRow>
            <CCol class="col-3 mt-3">
              <CCol class="col-12 mt-3 border1">
                {{ $store.state.resource.selfstoragestep2storedetail.price }}
              </CCol>
              <CCol class="border text-center">
                ${{ vmodel.selfstoragestep2.charges }}
              </CCol>
            </CCol>
          </CRow>
        </CCardBody>
        <CCardFooter>
          <CRow style="float: right">
            <CButton
              type="submit"
              class="mr-3"
              color="primary"
              @click="savepayment()"
            >
              Submit
            </CButton>
            <CButton
              type="button"
              router-link
              :to="{ name: 'BookAppointmentList' }"
              class="mr-3"
              color="secondary"
            >
              Cancel
            </CButton>
          </CRow>
        </CCardFooter>
      </CCard>
    </CCol>
  </div>
</template>

<script>
import APIService from "@/services/api.service.js";
import Store from "@/store/index";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { required } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      id:
        this.$route.params.id == undefined
          ? this.$route.query.id
          : this.$route.params.id,
      item: {},
      user: {},
      paymentlist: {},
      bookingId: "",
      paymentId: "",
      book: {
        servicetype: "",
        status: "Processing",
        optionstatus: ["Processing", "Confirm", "Retreat", "Retrieve"],
        commencementdate: "",
        selfstoragestep2: {
          storedetail: {},
          appointment: {
            date: "",
            starttime: "",
            endtime: "",
          },
          sqfeet: 0,
          duration: 0,
          charges: 0,
          email: "",
          firstname: "",
          lastname: "",
          phonenumber: "",
        },
        selfstoragestep3: {
          firstname: "",
          lastname: "",
          phonenumber: "",
          address: "",
          region: "",
          paymentid: "",
        },
        userid: "",
      },
      storeId: "",
      userId: "",
      vmodel: {
        servicetype: "",
        selfstoragestep2: {
          storedetail: {},
          facilities: [],
          active_sq: 0,
          active_month: 0,
          sqfeet: 0,
          duration: 0,
          charges: 0,
        },
      },
      selfstorecharges: {
        store: "",
        storedurations: [],
        storecharges: [],
      },
    };
  },
  components: {
    vSelect,
  },
  validations: {
    book: {
      commencementdate: { required },
    },
  },
  created() {
    document.title = this.$store.state.projecttitle + " - Self Storage Payment";
    this.BookAppointmentById();
  },
  methods: {
    toggleClass(sq) {
      this.vmodel.selfstoragestep2.active_sq = sq;
      this.calculatecharges();
    },
    togglemonth(month) {
      this.vmodel.selfstoragestep2.active_month = month;
      this.calculatecharges();
    },
    calculatecharges() {
      if (
        this.selfstorecharges != null &&
        this.selfstorecharges != undefined &&
        this.selfstorecharges != ""
      ) {
        this.vmodel.selfstoragestep2.sqfeet =
          this.selfstorecharges.storecharges[
            this.vmodel.selfstoragestep2.active_sq
          ].usablearea;

        this.vmodel.selfstoragestep2.duration =
          this.selfstorecharges.storedurations[
            this.vmodel.selfstoragestep2.active_month
          ].months;

        var monthlyrate =
          this.selfstorecharges.storecharges[
            this.vmodel.selfstoragestep2.active_sq
          ].monthlyrate;

        var discount =
          this.selfstorecharges.storedurations[
            this.vmodel.selfstoragestep2.active_month
          ].discount;

        this.vmodel.selfstoragestep2.charges = Math.round(
          discount > 0
            ? monthlyrate - (monthlyrate * discount) / 100
            : monthlyrate
        );
        this.book.selfstoragestep2.sqfeet = this.vmodel.selfstoragestep2.sqfeet;
        this.book.selfstoragestep2.duration =
          this.vmodel.selfstoragestep2.duration;
        this.book.selfstoragestep2.charges =
          this.vmodel.selfstoragestep2.charges;
      }
    },
    BookAppointmentById() {
      APIService.getById("/BookAppointmentGetById", this.id).then(
        (response) => {
          Store.commit("hideLoader");
          this.$set(this, "item", response.data);
          this.storeId = response.data.storeid;
          this.userId = response.data.userId;
          this.book.selfstoragestep2.appointment.date = response.data.date;
          this.book.selfstoragestep2.appointment.starttime =
            response.data.starttime;
          this.book.selfstoragestep2.appointment.endtime =
            response.data.endtime;

          APIService.getById("/GetUserById", this.userId).then((response) => {
            Store.commit("hideLoader");
            this.book.selfstoragestep2.email = response.data.email;
            this.book.selfstoragestep2.firstname = response.data.firstName;
            this.book.selfstoragestep2.lastname = response.data.lastName;
            this.book.selfstoragestep2.phonenumber = "";
            this.book.selfstoragestep3.firstname = response.data.firstName;
            this.book.selfstoragestep3.lastname = response.data.lastName;
            this.book.selfstoragestep3.address = response.data.address;
            this.book.selfstoragestep3.region = response.data.region;
            this.book.selfstoragestep3.paymentid = "";
            this.book.userid = response.data._id;
          });

          APIService.getById("/getstore", this.storeId).then((response) => {
            this.book.selfstoragestep2.storedetail = response.data;
            this.book.servicetype = "selfstorage";
            if (this.$store.state.language === "chinese") {
              response.data.storeName =
                response.data.chineseValues.chineseStoreName;
              response.data.address =
                response.data.chineseValues.chineseAddress;
              response.data.area = response.data.chineseValues.chineseArea;
              response.data.remarks =
                response.data.chineseValues.chineseRemarks;
            }
            this.vmodel.selfstoragestep2.storedetail = response.data;
          });

          this.vmodel.servicetype = "selfstorage";
          APIService.getById(
            "/getselfstorechargesbystoreid",
            this.storeId
          ).then((response) => {
            this.$set(this, "selfstorecharges", response.data);
            APIService.getById("/GetPaymentByBookingId", this.id).then(
              (response) => {
                Store.commit("hideLoader");
                this.$set(this, "paymentlist", response.data);
                if (
                  response.data[0] != null &&
                  response.data[0] != undefined &&
                  response.data[0] != ""
                ) {
                  var sqindex =
                    response.data[0].sqfeet != undefined &&
                    response.data[0].sqfeet != null &&
                    response.data[0].sqfeet != ""
                      ? this.selfstorecharges.storecharges
                          .filter(
                            (x) => x.usablearea == response.data[0].sqfeet
                          )
                          .map((x) => x.index)
                      : 0;
                  this.vmodel.selfstoragestep2.active_sq = sqindex;
                  var monthindex =
                    response.data[0].duration != undefined &&
                    response.data[0].duration != null &&
                    response.data[0].duration != ""
                      ? this.selfstorecharges.storedurations
                          .filter((x) => x.months == response.data[0].duration)
                          .map((x) => x.index)
                      : 0;
                  this.vmodel.selfstoragestep2.active_month = monthindex;
                  this.paymentId = response.data[0]._id;
                  this.bookingId = response.data[0].bookingid;
                  this.book.commencementdate =
                    response.data[0].commencementdate;
                  this.book.status = response.data[0].status;
                  if (this.book.status == "Processing") {
                    this.book.optionstatus = [
                      "Processing",
                      "Confirm",
                      "Retreat",
                      "Retrieve",
                    ];
                  } else if (this.book.status == "Confirm") {
                    this.book.optionstatus = ["Confirm", "Retreat", "Retrieve"];
                  } else if (this.book.status == "Retreat") {
                    this.book.optionstatus = ["Retreat", "Retrieve"];
                  }
                } else {
                  this.vmodel.selfstoragestep2.active_sq = 0;
                  this.vmodel.selfstoragestep2.active_month = 0;
                }
                this.calculatecharges();
              }
            );

            Store.commit("hideLoader");
          });
        }
      );
    },
    savepayment() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      Store.commit("showLoader");
      if (
        this.bookingId != undefined &&
        this.bookingId != null &&
        this.bookingId != ""
      ) {
        APIService.post("/updatepayment", this.book, this.paymentId).then(
          () => {
            this.$successAlert("Booking Updated!!!.");
            this.$router.push({ name: "BookAppointmentList" });
            Store.commit("hideLoader");
          }
        );
      } else {
        this.book.bookingid = this.id;
        APIService.post("/addpaymentdetail", this.book).then(() => {
          this.$successAlert("Booking Confirm!!!.");
          this.$router.push({ name: "BookAppointmentList" });
          Store.commit("hideLoader");
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.text-center {
  margin-top: 10px;
}
.active {
  background: #14b7eb !important;
  color: #ffffff !important;
}
.border1 {
  font-size: 25px;
  margin-top: 40px;
  color: #ffffff;
  background: #6c757d;
  width: 375px !important;
  height: 35px;
  text-align: center;
}
.border {
  font-size: 40px;
  background: #ffffff;
  color: #407bff;
  margin-top: 0px;
  width: 375px !important;
  height: 75px;
  text-align: center;
  border-bottom-right-radius: 30px;
}
.button-storecharge {
  border: none;
}
</style>