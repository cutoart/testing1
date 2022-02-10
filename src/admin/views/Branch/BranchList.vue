<template>
  <div>
    <CCard>
      <CCardHeader>
        <CRow>
          <CCol>
            <strong>Branch</strong>
          </CCol>
          <CCol col="2">
            <CButton block router-link :to="{ name: 'AddBranch' }" color="dark"
              >Add Branch</CButton
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
          <template #ChineseBranchName="{ item }">
            <td>
              {{
                item.ChineseBranchName != null &&
                item.ChineseBranchName != undefined &&
                item.ChineseBranchName != ""
                  ? item.ChineseBranchName
                  : "-"
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
                      name: 'EditBranch',
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
  name: "Branch",
  data() {
    return {
      item: [],
      fields: [
        {
          key: "Name",
          label: "Branch Name",
          sortable: true,
          sortDirection: "asc",
        },
        {
          key: "ChineseBranchName",
          label: "Chinese Branch Name",
          sortable: true,
          sortDirection: "asc",
        },
        {
          key: "Code",
          label: "Branch Code",
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
    this.getBranchListData();
    document.title = this.$store.state.projecttitle + " - Branch";
  },
  methods: {
    getBranchListData() {
      APIService.post(
        "/branchlist",
        this.$store.state.userInfo.userType == "Users"
      ).then((response) => {
        Store.commit("hideLoader");
        this.$set(this, "item", response.data);
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
            APIService.delete("/DeActivateBranch", req).then((response) => {
              this.$set(this, "item", response.data);
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
        message: "Are you sure your want to Delete this record?",
        button: {
          no: "No",
          yes: "Yes",
        },
        callback: (confirm) => {
          if (confirm) {
            APIService.delete("/DeleteBranch", req).then((response) => {
              this.$set(this, "item", response.data);
            });
          }
        },
      });
    },
  },
};
</script>




