<template>
  <div>
    <CCard>
      <CCardHeader>
        <CRow>
          <CCol>
            <strong>List Of Registered User</strong>
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
        </CDataTable>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import APIService from "@/services/api.service.js";
import Store from "@/store/index";
export default {
  name: "RegUsers",

  data() {
    return {
      item: [],
      fields: [
        {
          key: "firstName",
          label: "First Name",
          sortable: true,
          sortDirection: "asc",
        },
        {
          key: "lastName",
          label: "Last Name",
          sortable: true,
          sortDirection: "asc",
        },
        {
          key: "email",
          label: "Email",
          sortable: true,
          sortDirection: "asc",
        },
      ],
      userId: this.$store.state.userInfo.userId,
    };
  },
  created() {
    Store.commit("showLoader");
    this.getRegisterUserListData();    
    document.title = this.$store.state.projecttitle + " - Register User";
  },
  methods: {
    getRegisterUserListData() {
      APIService.post(
        "/registeruserlist",
        null,
        this.$store.state.userInfo.userType == "Users"
      )
        .then((response) => {
          Store.commit("hideLoader");
          this.$set(this, "item", response.data);
        });
    },
  },
};
</script>