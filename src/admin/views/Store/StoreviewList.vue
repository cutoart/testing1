<template>
  <div>
    <CCard>
      <CCardHeader>
        <CRow>
          <CCol>
            <strong>Store</strong>
          </CCol>
          <CCol col="2">
            <CButton block router-link :to="{ name: 'AddStore' }" color="dark"
              >Add Store</CButton
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
          <template #branch="{ item }">
            <td>{{ item.branch.label }}</td>
          </template>
          <template #chineseStoreName="{ item }">
            <td>
              <span
                v-if="
                  item.chineseValues != null &&
                  item.chineseValues != '' &&
                  item.chineseValues != undefined
                "
              >
                {{ item.chineseValues.chineseStoreName }}
              </span>
            </td>
          </template>
          <template #chineseAddress="{ item }">
            <td>
              <span
                v-if="
                  item.chineseValues != null &&
                  item.chineseValues != '' &&
                  item.chineseValues != undefined
                "
              >
                {{ item.chineseValues.chineseAddress }}
              </span>
            </td>
          </template>
          <template #chineseArea="{ item }">
            <td>
              <span
                v-if="
                  item.chineseValues != null &&
                  item.chineseValues != '' &&
                  item.chineseValues != undefined
                "
              >
                {{ item.chineseValues.chineseArea }}
              </span>
            </td>
          </template>
          <template #state="{ item }">
            <td>{{ item.state.label }}</td>
          </template>
          <template #city="{ item }">
            <td>{{ item.city.label }}</td>
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
                      name: 'EditStore',
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
  name: "Store",
  data() {
    return {
      item: [],
      fields: [
        {
          key: "status",
          label: "Action",
          sortable: true,
          sortDirection: "asc",
          filter: false,
        },
        {
          key: "branch",
          label: "Branch",
          sortable: true,
          sortDirection: "asc",
        },
        {
          key: "storeName",
          label: "Store Name",
          sortable: true,
          sortDirection: "asc",
        },
        {
          key: "chineseStoreName",
          label: "Chinese Store Name",
          sortable: true,
          sortDirection: "asc",
        },
        {
          key: "address",
          label: "Address",
          sortable: true,
          sortDirection: "asc",
        },
        {
          key: "chineseAddress",
          label: "Chinese Address",
          sortable: true,
          sortDirection: "asc",
        },
        {
          key: "area",
          label: "Area",
          sortable: true,
          sortDirection: "asc",
        },
        {
          key: "chineseArea",
          label: "Chinese Area",
          sortable: true,
          sortDirection: "asc",
        },
        {
          key: "state",
          label: "State",
          sortable: true,
          sortDirection: "asc",
        },
        {
          key: "city",
          label: "City",
          sortable: true,
          sortDirection: "asc",
        },
        // {
        //   key: "pincode",
        //   label: "Pincode",
        //   sortable: true,
        //   sortDirection: "asc",
        // },
        {
          key: "telephoneNumber",
          label: "Telephone Number",
          sortable: true,
          sortDirection: "asc",
        },
        {
          key: "directlinephoneNumber",
          label: "Directline Phone Number",
          sortable: true,
          sortDirection: "asc",
        },
        {
          key: "whatsappNumber",
          label: "Whatsapp Number",
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
          key: "latitude",
          label: "Latitude",
          sortable: true,
          sortDirection: "asc",
        },
        {
          key: "longitude",
          label: "Longitude",
          sortable: true,
          sortDirection: "asc",
        },
        {
          key: "services",
          label: "Services",
          sortable: true,
          sortDirection: "asc",
        },
      ],
      userId: this.$store.state.userInfo.userId,
    };
  },
  created() {
    Store.commit("showLoader");
    this.getStoreListData();
    document.title = this.$store.state.projecttitle + " - Store";
  },
  methods: {
    getStoreListData() {
      APIService.post("/storelist", { userType: "admin" }).then((response) => {
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
            APIService.delete("/DeActivateStore", req).then((response) => {
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
            APIService.delete("/DeleteStore", req).then((response) => {
              this.$set(this, "item", response.data);
            });
          }
        },
      });
    },
  },
};
</script>
