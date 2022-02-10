<template>
  <div>
    <CCard>
      <CCardHeader>
        <CRow>
          <CCol>
            <strong>List Of Shipping Order</strong>
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
          <template #storename="{ item }">
            <td v-if="item.storename != undefined">
              {{ item.storename }}
            </td>
            <td v-if="item.storename == undefined"></td>
          </template>
          <template #email="{ item }">
            <td
              v-if="
                item.servicetype == 'selfstorage' && item.email != undefined
              "
            >
              {{ item.firstname }} {{ item.lastname }} ({{ item.email }})
            </td>
            <td
              v-if="
                item.servicetype == 'selfstorage' && item.email == undefined
              "
            ></td>
            <td
              v-if="
                item.servicetype == 'boxstorage' ||
                  (item.servicetype == 'movingservice' &&
                    item.bookingdetail.email != undefined)
              "
            >
              {{ item.bookingdetail.firstname }}
              {{ item.bookingdetail.lastname }} ({{ item.bookingdetail.email }})
            </td>
          </template>
          <template #CreateDate="{ item }">
            <td>
              {{ $formatDate(item.CreateDate) }}
            </td>
          </template>
          <template #billinginfopaymentid="{ item }">
            <td>{{ item.billinginfo.paymentid }}</td>
          </template>
          <template #action="{ item }">
            <td>
              <span v-if="item.status != 'Refund'">
                <CButton
                  block
                  router-link
                  :to="'/admin/shippingorderdetail/' + item._id"
                  color="primary"
                  >Edit</CButton
                >
                <!-- v-if="item.servicetype == selfstorage" -->
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
  name: "ShippingOrderList",
  data() {
    return {
      item: [],
      fields: [
        {
          key: "action",
          label: "Action",
          sortable: true,
          sortDirection: "asc",
          filter: false,
        },
        {
          key: "email",
          label: "User",
          sortable: true,
          sortDirection: "asc",
        },
        {
          key: "servicetype",
          label: "Service Type",
          sortable: true,
          sortDirection: "asc",
        },
        {
          key: "status",
          label: "Status",
          sortable: true,
          sortDirection: "asc",
        },
        {
          key: "CreateDate",
          label: "Date",
          sortable: true,
          sortDirection: "asc",
        },
        {
          key: "billinginfopaymentid",
          label: "Payment Id",
          sortable: true,
          sortDirection: "asc",
        },
        {
          key: "charges",
          label: "Charges",
          sortable: true,
          sortDirection: "asc",
        },
        {
          key: "storename",
          label: "Store",
          sortable: true,
          sortDirection: "asc",
        },
      ],
      userId: this.$store.state.userInfo.userId,
    };
  },
  created() {
    Store.commit("showLoader");
    document.title = this.$store.state.projecttitle + " - Shipping Order";
    this.getPaymentListData();
  },
  methods: {
    getPaymentListData() {
      APIService.post(
        "/paymentdetaillist",
        this.$store.state.userInfo.userType == "Users"
      ).then((response) => {
        Store.commit("hideLoader");
        this.$set(this, "item", response.data);
      });
    },
  },
};
</script>
