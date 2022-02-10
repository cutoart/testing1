<template>
  <div>
    <CCol>
      <CCard>
        <CForm @submit.prevent="handleSubmit">
          <CCardHeader>
            <strong>Edit Register User</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="6">
                <div class="form-group">
                  <label for="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    autocomplete="off"
                    class="form-control"
                    placeholder="Email Address"
                    v-model="vmodel.email"
                    :class="{
                      'is-invalid':
                        (submitted && $v.vmodel.email.$error) ||
                        (modelstate_email != null &&
                          modelstate_email != '' &&
                          modelstate_email != undefined),
                    }"
                  />
                  <div
                    v-if="
                      (submitted && $v.vmodel.email.$error) ||
                        (modelstate_email != null &&
                          modelstate_email != '' &&
                          modelstate_email != undefined)
                    "
                    class="invalid-feedback"
                  >
                    <span v-if="!$v.vmodel.email.required"
                      >Email is required</span
                    >
                    <span v-if="!$v.vmodel.email.email">Email is invalid</span>
                    <span
                      v-if="
                        modelstate_email != null &&
                          modelstate_email != '' &&
                          modelstate_email != undefined
                      "
                      >{{ modelstate_email }}</span
                    >
                  </div>
                </div>
              </CCol>
              <CCol sm="6">
                <div class="form-group">
                  <label for="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    autocomplete="off"
                    class="form-control"
                    placeholder="First Name"
                    v-model="vmodel.firstName"
                    :class="{
                      'is-invalid': submitted && $v.vmodel.firstName.$error,
                    }"
                  />
                  <div
                    v-if="submitted && !$v.vmodel.firstName.required"
                    class="invalid-feedback"
                  >
                    First Name is required
                  </div>
                </div>
              </CCol>
              <CCol sm="6">
                <div class="form-group">
                  <label for="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    autocomplete="off"
                    class="form-control"
                    placeholder="Last Name"
                    v-model="vmodel.lastName"
                    :class="{
                      'is-invalid': submitted && $v.vmodel.lastName.$error,
                    }"
                  />
                  <div
                    v-if="submitted && !$v.vmodel.lastName.required"
                    class="invalid-feedback"
                  >
                    Last Name is required
                  </div>
                </div>
              </CCol>
              <CCol sm="6">
                <div class="form-group">
                  <label for="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    class="form-control"
                    placeholder="Password"
                    v-model="vmodel.password"
                    :class="{
                      'is-invalid': submitted && $v.vmodel.password.$error,
                    }"
                  />
                  <div
                    v-if="submitted && !$v.vmodel.password.required"
                    class="invalid-feedback"
                  >
                    Password is required
                  </div>
                </div>
              </CCol>
            </CRow>
          </CCardBody>
          <CCardFooter>
            <CButton
              type="submit"
              class="mr-1"
              :disabled="submitted"
              color="primary"
            >
              Save
            </CButton>
            <CButton
              type="button"
              router-link
              :to="{ name: 'ListofRegisterUser' }"
              class="mr-1"
              color="secondary"
            >
              Cancel
            </CButton>
          </CCardFooter>
        </CForm>
      </CCard>
    </CCol>
    <CCol>
      <CCard>
        <CCardHeader>
          <strong>List of Self Storage</strong>
        </CCardHeader>
        <table class="table">
          <thead>
            <tr>
              <th>Store Name</th>
              <th>Location</th>
              <th>Area</th>
              <th>Duration</th>
              <th>Payment Id</th>
              <th>Payment Date</th>
              <th>Charges</th>
              <th>Due date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in storages.filter(
                (type) => type.servicetype == 'selfstorage'
              )"
              v-bind:key="item.index"
            >
              <td>{{ item.storename }}</td>
              <td>{{ item.billinginfo.address }}</td>
              <td>{{ item.sqfeet }}</td>
              <td>{{ item.duration }}</td>
              <td>{{ item.billinginfo.paymentid }}</td>
              <td>{{ $formatDate(item.CreateDate) }}</td>
              <td>{{ item.charges }}</td>
              <td>{{ $formatDate(item.duedate) }}</td>
              <td
                class="hoverlink"
                style="cursor: pointer"
                @click="
                  (ShowDuedateModal = true),
                    (paymentmodel.paymentid = item._id),
                    (paymentmodel.duedate = item.duedate)
                "
              >
                Due date
              </td>
            </tr>
          </tbody>
        </table>
      </CCard>
    </CCol>
    <CCol>
      <CCard>
        <CCardHeader>
          <strong>List of Box Storage</strong>
        </CCardHeader>
        <table class="table">
          <thead>
            <tr>
              <th>Total Boxes</th>
              <th>Total Charges</th>
              <th>Payment Id</th>
              <th>Payment Date</th>
              <th>Appointment Date</th>
              <th>Appointment Time</th>
              <th>Due date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in storages.filter(
                (type) => type.servicetype == 'boxstorage'
              )"
              v-bind:key="item.id"
            >
              <td>{{ item.totalbox }}</td>
              <td>{{ item.charges }}</td>
              <td>{{ item.billinginfo.paymentid }}</td>
              <td>{{ $formatDate(item.CreateDate) }}</td>
              <td>{{ item.bookingdetail.appointment.date }}</td>
              <td>
                {{ item.bookingdetail.appointment.starttime }} -
                {{ item.bookingdetail.appointment.endtime }}
              </td>
              <td>{{ $formatDate(item.duedate) }}</td>
              <td
                class="hoverlink"
                style="cursor: pointer"
                @click="
                  (ShowDuedateModal = true),
                    (paymentmodel.paymentid = item._id),
                    (paymentmodel.duedate = item.duedate)
                "
              >
                Due date
              </td>
            </tr>
          </tbody>
        </table>
      </CCard>
    </CCol>
    <CModal title="DueDate" :show.sync="ShowDuedateModal">
      <label><b>Select Duedate</b></label>
      <b-datepicker
        id="time"
        class="form-control"
        :min="minDate"
        v-model="paymentmodel.duedate"
        style="border-radius: 0px !important"
        :class="{
          'is-invalid': paymentmodel.duedateerror != '',
        }"
      ></b-datepicker>
      <span v-if="paymentmodel.duedateerror != ''" class="invalid-feedback">{{
        paymentmodel.duedateerror
      }}</span>
      <CButton
        type="button"
        color="primary"
        @click="update()"
        style="cursor: pointer; float: right; margin-top:10px"
        >Update
      </CButton>
    </CModal>
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import APIService from "@/services/api.service.js";
import Store from "@/store/index";

export default {
  name: "RegisterUser",
  components: {},

  created() {
    if (this.id != undefined && this.id != null) {
      Store.commit("showLoader");
      document.title = this.$store.state.projecttitle + " - Edit Register User";
      APIService.getById("/getregisteruser", this.id).then((response) => {
        Store.commit("hideLoader");
        this.$set(this, "vmodel", response.data);
      });
    }
    this.getstoragedata();
  },

  data() {
    return {
      id: this.$route.params.id,
      storages: [],
      ShowDuedateModal: false,
      minDate: new Date(),
      vmodel: {
        email: "",
        firstName: "",
        lastName: "",
        password: "",
      },
      paymentmodel: { duedate: new Date(), paymentid: "", duedateerror: "" },
      submitted: false,
      modelstate_email: "",
    };
  },

  validations: {
    vmodel: {
      email: { required, email },
      firstName: { required },
      lastName: { required },
      password: { required },
    },
  },

  methods: {
    checkIfValid(fieldName) {
      const field = this.$v.vmodel[fieldName];
      if (!field.$dirty) {
        return null;
      }
      return !(field.$invalid || field.$model === "");
    },
    update() {
      if (
        this.paymentmodel.duedate == undefined ||
        this.paymentmodel.duedate == null ||
        this.paymentmodel.duedate == ""
      ) {
        this.paymentmodel.duedateerror = "Due date is required.";
        return;
      } else {
        this.paymentmodel.duedateerror = "";
      }

      if (
        this.paymentmodel.paymentid != undefined &&
        this.paymentmodel.paymentid != null &&
        this.paymentmodel.paymentid != ""
      ) {
        APIService.post(
          "/updateduedate",
          this.paymentmodel,
          this.paymentmodel.paymentid
        ).then(() => {
          this.$successAlert("duedate Updated Successfully!!!.");
          this.getstoragedata();
          this.ShowDuedateModal = false;
        });
      } else {
        this.submitted = false;
      }
    },
    handleSubmit() {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      var _vmodel = this.vmodel;
      if (this.id != undefined && this.id != null && this.id != "") {
        _vmodel.id = this.id;
      } else {
        _vmodel.id = "";
      }
      APIService.post("/CheckUserExist", _vmodel).then((response) => {
        if (response && response.data) {
          if (this.vmodel.email == response.data.email) {
            this.$set(this, "modelstate_email", "Email Already Exist !");
          }
          this.submitted = false;
        } else {
          APIService.post("/updateregisteruser", _vmodel, this.id).then(() => {
            this.$successAlert("Your data is updated.");
            this.$router.push({ name: "ListofRegisterUser" });
          });
        }
      });
    },
    getstoragedata() {
      Store.commit("showLoader");
      APIService.post("/getpaymentbyuserid", { type: "" }, this.id).then(
        (response) => {
          Store.commit("hideLoader");
          this.$set(this, "storages", response.data);
        }
      );
    },
  },
};
</script>

<style scoped>
.hoverlink:hover {
  color: blue;
}
</style>

<style>
.modal-footer {
  display: none !important;
}
</style>
