<template>
  <div>
    <CCard>
      <CCardHeader>
        <CRow>
          <CCol>
            <div class="hello">List FAQs</div>
          </CCol>
          <CCol col="2">
            <CButton block router-link :to="{ name: 'AddFAQs' }" color="dark">
              Add FAQs
            </CButton>
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
                      name: 'EditFAQs',
                      params: { id: item._id },
                    }"
                  >
                    Edit
                  </CDropdownItem>
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
                </CDropdown>
              </span>
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
          key: "question",
          label: "Question",
          sortable: true,
          sortDirection: "asc",
        },        
      ],
    };
  },

  created() {
    Store.commit("showLoader");
    document.title = this.$store.state.projecttitle + " - FAQs";
    this.getFAQListData();
  },

  methods: {
    getFAQListData() {
      APIService.post("/ListOfFAQ", { usertype: "admin" }, null).then(
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
            APIService.delete("/DeActivateFaq", req).then((response) => {
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
            APIService.delete("/DeleteFaq", req).then((response) => {
              this.$set(this, "item", response.data);
            });
          }
        },
      });
    },
  },
};
</script>
