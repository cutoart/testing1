<template>
  <div>
    <CCard>
      <CCardHeader>
        <CRow>
          <CCol>
            <div class="hello">Appointments</div>
          </CCol>
          <CCol col="2">
            <CButton
              block
              router-link
              :to="{ name: 'BookStorage' }"
              color="dark"
            >
              Book Storage
            </CButton>
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
          <template #status="{ item }">
            <td>
              <span>
                <CDropdown
                  size="sm"
                  toggler-text="Action"
                  color="link"
                  class="m-0 d-inline-block"
                >
                  <CDropdownItem :to="'/admin/selfstoragepayment/' + item._id"
                    >Edit</CDropdownItem
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
          key: "userName",
          label: "User Name",
          sortable: true,
          sortDirection: "asc",
        },
        {
          key: "date",
          label: "Date",
          sortable: true,
          sortDirection: "asc",
        },
        {
          key: "starttime",
          label: "Start Time",
          sortable: true,
          sortDirection: "asc",
        },
        {
          key: "endtime",
          label: "End Time",
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
    };
  },
  created() {
    Store.commit("showLoader");
    this.getBookAppointmentListData();
    document.title =
      this.$store.state.projecttitle + " - Book Appointment List";
  },
  methods: {
    getBookAppointmentListData() {
      APIService.post("/bookappointmentlist").then((response) => {
        Store.commit("hideLoader");
        this.$set(this, "item", response.data);
      });
    },
  },
};
</script>