<template>
  <div>
    <CCard>
      <CCardHeader>
        <CRow>
          <CCol>
            <strong>District</strong>
          </CCol>
          <CCol col="2">
            <CButton
              block
              router-link
              :to="{ name: 'AddDistrict' }"
              color="dark"
              >Add District</CButton
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
          <template #chineseName="{ item }">
            <td>
              {{
                item.chineseName != null &&
                item.chineseName != undefined &&
                item.chineseName != ""
                  ? item.chineseName
                  : "-"
              }}
            </td>
          </template>
          <template #stateid="{ item }">
            <td>
              {{
                states
                  .filter((x) => {
                    return x._id == item.stateid;
                  })
                  .map((result) => {
                    return result.name;
                  })[0]
              }}
            </td>
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
                      name: 'EditDistrict',
                      params: { id: item._id },
                    }"
                    >Edit</CDropdownItem
                  >
                  <CDropdownItem
                    v-if="item.deleted == false"
                    @click="deActivateItem(item._id, item.deleted)"
                    >Deactivate</CDropdownItem
                  >
                  <CDropdownItem
                    v-else
                    @click="deActivateItem(item._id, item.deleted)"
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
  name: "District",
  data() {
    return {
      item: [],
      states: [],
      fields: [
        {
          key: "name",
          label: "District Name",
          sortable: true,
          sortDirection: "asc",
        },
        {
          key: "chineseName",
          label: "Chinese District Name",
          sortable: true,
          sortDirection: "asc",
        },
        {
          key: "stateid",
          label: "Country",
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
    this.getDistrictListData();
    document.title = this.$store.state.projecttitle + " - District";
  },
  methods: {
    getDistrictListData() {
      APIService.post(
        "/citylist",
        this.$store.state.userInfo.userType == "Users"
      ).then((response) => {
        Store.commit("hideLoader");
        this.$set(this, "item", response.data.cities);
        this.$set(this, "states", response.data.states);
      });
    },
    deActivateItem(id, deleted) {
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
            APIService.delete("/DeActivatedistrict", req).then((response) => {
              this.$set(this, "item", response.data.cities);
              this.$set(this, "states", response.data.states);
            });
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
        message:
          "Store will also delete. Are you sure your want to Delete this record?",
        button: {
          no: "No",
          yes: "Yes",
        },
        callback: (confirm) => {
          if (confirm) {
            APIService.delete("/Deletedistrict", req).then((response) => {
              this.$set(this, "item", response.data.cities);
              this.$set(this, "states", response.data.states);
            });
          }
        },
      });
    },
  },
};
</script>




