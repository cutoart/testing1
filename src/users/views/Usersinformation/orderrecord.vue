<template>
  <div class="my-account-details-content col-md-9">
    <div id="section-user-info" class="tab-content">
      <div class="info content">
        <div class="row">
          <div class="col-12 section-title">
            <b>{{ $store.state.resource.orderrecord.orderrecord }}</b>
          </div>
        </div>
        <div class="row scrollbar col-12">
          <div>
            <table>
              <tr>
                <th>{{ $store.state.resource.orderrecord.type }}</th>
                <th>{{ $store.state.resource.orderrecord.item }}</th>
                <th>{{ $store.state.resource.orderrecord.orderid }}</th>
                <th style="width: 80px">
                  {{ $store.state.resource.orderrecord.date }}
                </th>
                <th>{{ $store.state.resource.orderrecord.price }}</th>
              </tr>
              <tr v-for="item in orders" v-bind:key="item.index">
                <td>{{ item.servicetype }}</td>
                <td v-if="item.servicetype == 'selfstorage'">
                  {{ item.storename }} - {{ item.sqfeet
                  }}{{ $store.state.resource.orderrecord.selfstoragesqft }} -
                  {{ item.duration
                  }}{{ $store.state.resource.orderrecord.selfstoragemonth }}
                </td>
                <td
                  v-if="
                    item.servicetype == 'boxstorage' ||
                      item.servicetype == 'movingservice'
                  "
                >
                  {{ item.boxname }}
                </td>
                <td>{{ item.billinginfo.paymentid }}</td>
                <td>{{ $formatDate(item.CreateDate) }}</td>
                <td>${{ item.charges }}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import APIService from "@/services/api.service.js";
import Store from "@/store/index";

export default {
  data() {
    return {
      id: this.$store.state.regUserInfo.userId,
      orders: [],
      billinginfo: [],
      appointment: [],
      selectedboxes: [],
      submitted: false,
    };
  },
  created() {
    document.title = this.$store.state.projecttitle + " - Order Record";
    this.getorderrecorddata();
  },
  methods: {
    getorderrecorddata() {
      Store.commit("showLoader");
      APIService.post("/getpaymentbyuserid", { type: "" }, this.id).then(
        (response) => {
          Store.commit("hideLoader");
          for (var idata = 0; idata < response.data.length; idata++) {
            if (
              response.data[idata].servicetype == "boxstorage" ||
              response.data[idata].servicetype == "movingservice"
            ) {
              var boxname = "";
              for (
                let index = 0;
                index < response.data[idata].selectedboxes.length;
                index++
              ) {
                boxname =
                  boxname +
                  "" +
                  (index > 0 ? ", " : "") +
                  response.data[idata].selectedboxes[index].boxtype +
                  " X " +
                  response.data[idata].selectedboxes[index].noofbox;
              }
              response.data[idata].boxname = boxname;
            }
          }
          this.$set(this, "orders", response.data);
        }
      );
    },
  },
};
</script>

<style scoped>
.section-title b {
  font-size: 20px;
  color: rgb(0, 0, 0);
  padding-top: 0px;
}

table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 780px;
}

td,
th {
  border-bottom: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  font-size: 12px;
}

.my-account-details-content .tab-content .content {
  padding: 20px 20px;
}

.scrollbar::-webkit-scrollbar {
  height: 5px;
  background-color: #f5f5f5;
}
.scrollbar::-webkit-scrollbar-track {
  background-color: #f5f5f5;
}
.scrollbar::-webkit-scrollbar-thumb {
  background-color: #e5e5e5;
  border: 2px solid #e5e5e5;
}

.scrollbar{
  overflow-x: scroll;
}

@media only screen and (max-width: 992px) {
  .my-account-details-content .tab-content .content[data-v-a59f33d6] {
    padding: 20px 20px;
    margin-top: 0px;
    margin-left: 20px;
  }
}

@media only screen and (max-width: 765px) {
  .my-account-details-content .tab-content .content[data-v-a59f33d6] {
    padding: 20px 20px;
    margin-top: 20px;
    margin-left: 0px;
  }
}
</style>
