<template>
  <div>
    <CCard>
      <CCardHeader>
        <CRow>
          <CCol>
            <strong>Contact Us List</strong>
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
          <template #Content="{item}">
            <td
              style="max-width:350px;overflow: hidden !important;text-overflow: ellipsis;white-space: nowrap;"
            >
              <span>
                <a
                  style="text-decoration:none;color:unset;"
                  href="javascript:;"
                  data-toggle="tooltip"
                  title="Click here to view more"
                  @click="
                    (ShowContactusModal = true),
                      (ContactusModalContent = item.Content)
                  "
                >
                  {{ item.Content }}
                </a>
              </span>
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
                  <CDropdownItem @click="deleteItem(item._id)"
                    >Delete</CDropdownItem
                  >
                </CDropdown></span
              >
            </td>
          </template>
        </CDataTable>
        <CModal title="Content" :show.sync="ShowContactusModal">
          <ContactUsModal
            :ShowContactusModal.sync="ShowContactusModal"
            :content="ContactusModalContent"
          />
        </CModal>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import APIService from "@/services/api.service.js";
import Store from "@/store/index";
import ContactUsModal from "./ContactusModal";
export default {
  components: {
    ContactUsModal,
  },
  data() {
    return {
      item: [],
      ShowContactusModal: false,
      ContactusModalContent: "",
      fields: [
        {
          key: "status",
          label: "Action",
          sortable: true,
          sortDirection: "asc",
          filter: false,
        },
        {
          key: "Firstname",
          label: "First Name",
          sortable: true,
          sortDirection: "asc",
        },
        {
          key: "Lastname",
          label: "Last Name",
          sortable: true,
          sortDirection: "asc",
        },
        {
          key: "phoneNumber",
          label: "phoneNumber",
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
          key: "Content",
          label: "Content",
          sortable: true,
          sortDirection: "asc",
        },
      ],
      userId: this.$store.state.userInfo.userId,
    };
  },
  created() {
    Store.commit("showLoader");
    this.getContactUsListData();
    document.title = this.$store.state.projecttitle + " - Contact Us";
  },
  methods: {
    getContactUsListData() {
      APIService.post("/contactuslist").then((response) => {
        Store.commit("hideLoader");
        this.$set(this, "item", response.data);
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
            APIService.delete("/DeleteContact", req).then((response) => {
              this.$set(this, "item", response.data);
            });
          }
        },
      });
    },
  },
};
</script>
