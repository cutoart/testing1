<template>
  <div>
    <CCard>
      <CCardHeader>
        <CRow>
          <CCol>
            <div class="hello">List BoxStore</div>
          </CCol>
          <CCol col="2">
            <CButton
              block
              router-link
              :to="{ name: 'AddBoxstore' }"
              color="dark"
              >Add Box Store</CButton
            >
          </CCol>
        </CRow>
      </CCardHeader>
      <CCardBody>
        <CDataTable
          :hover="true"
          :striped="true"
          :items="item"
          :fields="fields"
          :border="true"
          :column-filter="true"
          :table-filter="true"
          :items-per-page="20"
          :items-per-page-select="true"
          pagination
          sorter
        >
          <template #image="{ item }">
            <td style="text-align: center">
              <img
                :src="$store.state.apiURL + '/boxstore/' + item.image"
                height="100"
                width="100"
              />
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
                      name: 'EditBoxstore',
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
          key: "title",
          label: "Title",
          sortable: true,
          sortDirection: "asc",
        },
        {
          key: "description",
          label: "Description",
          sortable: true,
          sortDirection: "asc",
        },
        {
          key: "price",
          label: "Price",
          sortable: true,
          sortDirection: "asc",
        },
        {
          key: "image",
          label: "Image",
          sortable: true,
          sortDirection: "asc",
        },
      ],
    };
  },

  created() {
    Store.commit("showLoader");
    document.title = this.$store.state.projecttitle + " - Box Store";
    this.getBoxstoreListData();
  },

  methods: {
    getBoxstoreListData() {
      APIService.post("/ListOfBoxstore", { usertype: "admin" }, null).then(
        ((response) => {
          Store.commit("hideLoader");
          this.$set(this, "item", response.data);
        }).bind(this)
      );
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
            APIService.delete("/DeActivateBoxstore", req).then((response) => {
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
            APIService.delete("/DeleteBoxstore", req).then((response) => {
              this.$set(this, "item", response.data);
            });
          }
        },
      });
    },
  },
};
</script>
