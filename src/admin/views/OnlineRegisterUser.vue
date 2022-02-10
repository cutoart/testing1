<template>
  <div>
    <CCard>
      <CCardHeader>
        <CRow>
          <CCol>
            <strong>Online Register User List</strong>
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
          <template #region="{ item }">
            <td>{{ item.region.label }}</td>
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
  data() {
    return {
      item: [],
      fields: [
        {
          key: "region",
          label: "Region",
          sortable: true,
          sortDirection: "asc",
        },
        {
          key: "name",
          label: "Name",
          sortable: true,
          sortDirection: "asc",
        },
        {
          key: "contact",
          label: "Contact Number",
          sortable: true,
          sortDirection: "asc",
        },
        {
          key: "email",
          label: "Email",
          sortable: true,
          sortDirection: "asc",
        },
        {
          key: "content",
          label: "Content",
          sortable: true,
          sortDirection: "asc",
        },
      ],
    };
  },
  created() {
    Store.commit("showLoader");
    this.getOnlineRegisterListData();
    document.title = this.$store.state.projecttitle + " - Online Register";
  },
  methods: {
    getOnlineRegisterListData() {
      APIService.post("/onlineregisterlist").then((response) => {
        Store.commit("hideLoader");
        this.$set(this, "item", response.data);
      });
    },
  },
};
</script>