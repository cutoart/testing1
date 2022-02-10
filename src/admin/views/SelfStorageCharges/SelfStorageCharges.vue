<template>
  <div>
    <CCol>
      <CCard>
        <CForm @submit.prevent="handleSubmit">
          <CCardHeader>
            <strong>Add Self Store Charges</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="6">
                <span>Store*</span>
                <v-select
                  style="margin-top: 8px"
                  v-model="user.store"
                  :options="optionsStore"
                  placeholder="Select Store"
                  :class="{ 'is-invalid': $v.user.store.$error }"
                  :disabled="id != undefined && id != null"
                />
                <div v-if="!$v.user.store.required" class="invalid-feedback">
                  Store is required.
                </div>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="4" class="mt-3">
                <h5>Durations :</h5>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="4">
                <CInput
                  label="No of Months"
                  placeholder="Enter No of Months"
                  v-model="duration.months"
                  :maxlength="2"
                />
              </CCol>
              <CCol sm="4">
                <CInput
                  label="Discount"
                  placeholder="Enter Discount in Percentage(%)"
                  v-model="duration.discount"
                  :maxlength="2"
                />
              </CCol>
              <CCol sm="2" class="mt-4">
                <b-button variant="primary"
                  ><b-icon-plus
                    variant="light"
                    class="add-button"
                    v-on:click="addduration"
                  ></b-icon-plus
                ></b-button>
              </CCol>
            </CRow>
            <CRow v-if="user.storedurations.length > 0">
              <CCol sm="12">
                <b-table
                  hover
                  :items="user.storedurations"
                  :fields="durationcolumn"
                >
                  <template #cell(index)="data">
                    <b-button variant="danger"
                      ><b-icon-dash
                        variant="light"
                        class="remove-button"
                        v-on:click="removeduration(data.index)"
                      ></b-icon-dash
                    ></b-button>
                  </template>
                </b-table>
              </CCol>
            </CRow>
            <CRow v-if="user.storedurations.length > 0">
              <CCol sm="4" class="mt-3">
                <h5>Charges :</h5>
              </CCol>
            </CRow>
            <CRow v-if="user.storedurations.length > 0">
              <CCol sm="2">
                <CInput
                  label="Usable Area(sf)"
                  placeholder="Enter Usable Area"
                  v-model="charges.usablearea"
                  :maxlength="5"
                />
              </CCol>
              <CCol sm="2">
                <CInput
                  label="Area Width(feet)"
                  placeholder="Enter Area Width"
                  v-model="charges.areainwidth"
                  :maxlength="5"
                />
              </CCol>
              <CCol sm="2">
                <CInput
                  label="Area Depth(feet)"
                  placeholder="Enter Area Depth"
                  v-model="charges.areaindepth"
                  :maxlength="5"
                />
              </CCol>
              <CCol sm="3">
                <CInput
                  label="Standard Rate(per month)"
                  placeholder="Enter Rate/Month"
                  v-model="charges.monthlyrate"
                  :maxlength="10"
                />
              </CCol>
              <CCol sm="2" class="mt-4">
                <b-button variant="primary"
                  ><b-icon-plus
                    variant="light"
                    class="add-button"
                    v-on:click="addcharges"
                  ></b-icon-plus
                ></b-button>
              </CCol>
            </CRow>
            <CRow v-if="user.storecharges.length > 0">
              <CCol sm="12">
                <table
                  role="table"
                  aria-busy="false"
                  class="table b-table table-hover"
                >
                  <thead role="rowgroup">
                    <tr role="row">
                      <th role="columnheader" scope="col">
                        <div>Usable Area(sf)</div>
                      </th>
                      <th role="columnheader" scope="col">
                        <div>Width X Depth (feet)</div>
                      </th>
                      <th role="columnheader" scope="col">
                        <div>Standard Rate (per month)</div>
                      </th>
                      <th
                        v-for="_duration in user.storedurations"
                        v-bind:key="_duration.index"
                        role="columnheader"
                        scope="col"
                      >
                        <div>
                          {{ _duration.months }} months <br />
                          <span>({{ _duration.discount }}% off)</span>
                        </div>
                      </th>
                      <th role="columnheader" scope="col">
                        <div>Remove</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody role="rowgroup">
                    <!---->
                    <tr
                      role="row"
                      v-for="_charges in user.storecharges"
                      v-bind:key="_charges.index"
                    >
                      <td role="cell">{{ _charges.usablearea }}</td>
                      <td role="cell">
                        {{ _charges.areainwidth }}X{{ _charges.areaindepth }}
                      </td>
                      <td role="cell">{{ _charges.monthlyrate }}</td>
                      <td
                        role="cell"
                        v-for="_duration in user.storedurations"
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
                      <td role="cell">
                        <b-button variant="danger"
                          ><b-icon-dash
                            variant="light"
                            class="remove-button"
                            v-on:click="removecharges(_charges.index)"
                          ></b-icon-dash
                        ></b-button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </CCol>
            </CRow>
          </CCardBody>
          <CCardFooter>
            <CButton
              type="submit"
              class="mr-1"
              :disabled="submitted"
              color="primary"
              >Save</CButton
            >
            <CButton
              type="button"
              router-link
              :to="{ name: 'SelfStoreCharges' }"
              class="mr-1"
              color="secondary"
              >Cancel</CButton
            >
          </CCardFooter>
        </CForm>
      </CCard>
    </CCol>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import APIService from "@/services/api.service.js";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import Store from "@/store/index";

export default {
  name: "SelfStoreCharges",
  components: {
    vSelect,
  },
  created() {
    if (this.id != undefined && this.id != null) {
      Store.commit("showLoader");
      document.title =
        this.$store.state.projecttitle + " - Edit Self Store Charges";
      APIService.getById("/getselfstorecharges", this.id).then((response) => {
        Store.commit("hideLoader");
        this.$set(this, "user", response.data);
      });
    } else {
      document.title =
        this.$store.state.projecttitle + " - Add Self Store Charges";
    }
    var _optionsStorelist = [];
    APIService.post("/getselfstoreforDD").then((response) => {
      for (var i = 0; i < response.data.length; i++) {
        const tag = {
          label:
            response.data[i].storeName +
            (response.data[i].chineseValues != null &&
            response.data[i].chineseValues != undefined &&
            response.data[i].chineseValues != ""
              ? " / " + response.data[i].chineseValues.chineseStoreName
              : ""),
          value: response.data[i]._id,
        };
        _optionsStorelist.push(tag);
      }
      this.optionsStore = _optionsStorelist;
    });
  },
  data() {
    return {
      id: this.$route.params.id,
      optionsStore: [],
      user: {
        store: "",
        storedurations: [],
        storecharges: [],
        createdBy: this.$store.state.userInfo.userId,
        parentId: this.$store.state.userInfo.userType == "Users",
      },
      duration: {
        months: 0,
        discount: 0,
      },
      durationcolumn: [
        {
          key: "months",
          label: "No of Months",
        },
        {
          key: "discount",
          label: "Discount",
        },
        {
          key: "index",
          label: "Remove",
        },
      ],
      charges: {
        usablearea: 0,
        areainwidth: 0,
        areaindepth: 0,
        monthlyrate: 0,
      },
      submitted: false,
      modelstate_email: "",
    };
  },
  validations: {
    user: {
      store: { required },
    },
  },
  methods: {
    addduration() {
      this.duration.index = this.user.storedurations.length;
      this.user.storedurations.push(this.duration);
      this.duration = {
        months: 0,
        discount: 0,
      };
    },
    removeduration(index) {
      this.user.storedurations.splice(index, 1);
    },
    addcharges() {
      this.charges.index = this.user.storecharges.length;
      this.user.storecharges.push(this.charges);
      this.charges = {
        usablearea: 0,
        areainwidth: 0,
        areaindepth: 0,
        monthlyrate: 0,
      };
    },
    removecharges(index) {
      this.user.storecharges.splice(index, 1);
    },
    handleSubmit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      if (
        this.user.storedurations == null ||
        this.user.storedurations == undefined ||
        (this.user.storedurations != null &&
          this.user.storedurations != undefined &&
          this.user.storedurations.length == 0)
      ) {
        this.$dangerAlert("Duration is required!!!");
        return;
      }
      if (
        this.user.storecharges == null ||
        this.user.storecharges == undefined ||
        (this.user.storecharges != null &&
          this.user.storecharges != undefined &&
          this.user.storecharges.length == 0)
      ) {
        this.$dangerAlert("Charges is required!!!");
        return;
      }
      this.submitted = true;

      if (this.id != undefined && this.id != null && this.id != "") {
        APIService.post("/updateselfstorecharges", this.user, this.id).then(
          () => {
            this.$successAlert("Self Store Charges Updated Successfully!!!.");
            this.$router.push({ name: "SelfStoreCharges" });
            this.submitted = false;
          }
        );
      } else {
        APIService.getById(
          "/getselfstorechargesbystoreid",
          this.user.store.value
        ).then((response) => {
          if (
            response.data == null ||
            response.data == undefined ||
            response.data == ""
          ) {
            APIService.post("/addselfstorecharges", this.user).then(() => {
              this.$successAlert("Self Store Charges Added Successfully!!!.");
              this.$router.push({ name: "SelfStoreCharges" });
              this.submitted = false;
            });
          } else {
            this.$dangerAlert("Charges already exist for selected store!!!");
            this.submitted = false;
          }
        });
      }
    },
  },
};
</script>
<style scoped>
.add-button {
  font-size: 30px !important;
}
.remove-button {
  font-size: 22px !important;
}
</style>
