<template>
  <div>
    <CCard>
      <CCardHeader>
        <CRow>
          <CCol>
            <strong>Self Store Charges</strong>
          </CCol>
          <CCol col="3">
            <CButton
              block
              router-link
              :to="{ name: 'AddSelfStoreCharges' }"
              color="dark"
              >Add Self Store Charges</CButton
            >
          </CCol>
        </CRow>
      </CCardHeader>
      <CCardBody>
        <CDataTable
          :hover="true"
          :striped="true"
          :border="true"
          :items="item"
          :fields="fields"
          :column-filter="true"
          :table-filter="true"
          :responsive="true"
          :items-per-page="20"
          :items-per-page-select="true"
          pagination
          sorter
        >
          <template #store="{ item }">
            <td>{{ item.store.label }}</td>
          </template>
          <template #status="{ item }">
            <td>
              <span>
                <CDropdown
                  size="sm"
                  toggler-text="Action"
                  color="link"
                  class="m-0 d-inline-block"
                >
                  <CDropdownItem
                    :to="{
                      name: 'EditSelfStoreCharges',
                      params: { id: item._id },
                    }"
                    v-if="item.deleted == false"
                    >Edit</CDropdownItem
                  >
                  <CDropdownItem
                    v-if="item.deleted == false"
                    @click="
                      deActivateItem(item._id, item.deleted, item.store.value)
                    "
                    >Deactivate</CDropdownItem
                  >
                  <CDropdownItem
                    v-else
                    @click="
                      deActivateItem(item._id, item.deleted, item.store.value)
                    "
                    >Activate</CDropdownItem
                  >
                  <CDropdownItem @click="deleteItem(item._id)"
                    >Delete</CDropdownItem
                  >
                </CDropdown></span
              >
            </td>
          </template>
        </CDataTable>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import APIService from "@/services/api.service.js";
import Store from "@/store/index";
export default {
  name: "SelfStoreCharges",
  data() {
    return {
      item: [],
      fields: [
        {
          key: "store",
          label: "Store",
          sortable: true,
          sortDirection: "asc",
        },
        {
          key: "branchname",
          label: "Branch Name",
          sortable: true,
          sortDirection: "asc",
        },
        {
          key: "status",
          label: "Action",
          sortable: true,
          sortDirection: "asc",
          filter: false,
        },
      ],
      userId: this.$store.state.userInfo.userId,
    };
  },
  created() {
    Store.commit("showLoader");
    this.getSeltStoreChargesListData();
    document.title = this.$store.state.projecttitle + " - Self Store Charges";
  },
  methods: {
    getSeltStoreChargesListData() {
      APIService.post(
        "/selfstorechargeslist",
        this.$store.state.userInfo.userType == "Users"
      ).then((response) => {
        Store.commit("hideLoader");
        this.$set(this, "item", response.data);
      });
    },
    deActivateItem(id, deleted, storeid) {
      var req = {
        id: id,
        userId: this.userId,
        deleted: deleted,
      };
      this.$confirm({
        message:
          "Are you sure your want to " +
          (deleted == false ? "Deactivate" : "Activate") +
          " this record?",
        button: {
          no: "No",
          yes: "Yes",
        },
        callback: (confirm) => {
          if (confirm) {
            if (deleted == true) {
              APIService.getById("/getselfstorechargesbystoreid", storeid).then(
                (response) => {
                  if (
                    response.data == null ||
                    response.data == undefined ||
                    response.data == ""
                  ) {
                    APIService.delete("/deactivateselfstorecharges", req).then(
                      (response) => {
                        this.$set(this, "item", response.data);
                        this.$successAlert("Activate Successfully!!!");
                      }
                    );
                  } else {
                    this.$dangerAlert(
                      "Charges already exist for selected store!!!"
                    );
                    this.submitted = false;
                  }
                }
              );
            } else {
              APIService.delete("/deactivateselfstorecharges", req).then(
                (response) => {
                  this.$set(this, "item", response.data);
                  this.$successAlert("Deactivate Successfully!!!");
                }
              );
            }
          }
        },
      });
    },
    deleteItem(id) {
      var req = {
        id: id,
        userId: this.userId,
      };
      this.$confirm({
        message: "Are you sure your want to Delete this record?",
        button: {
          no: "No",
          yes: "Yes",
        },
        callback: (confirm) => {
          if (confirm) {
            APIService.delete("/deleteselfstorecharges", req).then(
              (response) => {
                this.$set(this, "item", response.data);
                this.$successAlert("Deleted Successfully!!!.");
              }
            );
          }
        },
      });
    },
  },
};
</script>
