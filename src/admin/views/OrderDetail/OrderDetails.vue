<template>
  <div>
    <CCol>
      <CCard
        v-if="
          item != null && item != undefined && item.servicetype != undefined
        "
      >
        <CCardHeader>
          <CRow>
            <CCol>
              <h4>Order Detail</h4>
            </CCol>
            <CCol col="2">
              <router-link
                id="backToList"
                :to="{ name: 'OrderManagementList' }"
              ></router-link>
              <CButton
                block
                color="dark"
                onclick="document.getElementById('backToList').click()"
                >Back</CButton
              >
            </CCol>
            <CCol col="2">
              <CButton block color="primary" v-on:click="sendmail()"
                >Send Mail</CButton
              >
            </CCol>
            <CCol col="2" v-if="item != [] && item != null"
              ><CButton block color="primary" v-on:click="generateReport()"
                >Export PDF</CButton
              ></CCol
            >
          </CRow>
        </CCardHeader>
        <div style="display: none">
          <vue-html2pdf
            :show-layout="false"
            :float-layout="true"
            :enable-download="false"
            :preview-modal="false"
            :paginate-elements-by-height="1400"
            filename="Order Detail"
            :pdf-quality="2"
            :manual-pagination="true"
            margin="0"
            pdf-format="a4"
            pdf-orientation="landscape"
            pdf-content-width="1100px"
            ref="html2Pdf"
            @beforeDownload="beforeDownload($event)"
          >
            <section slot="pdf-content">
              <div v-if="item.servicetype == 'selfstorage'">
                <CCardBody>
                  <CRow class="pl-2">
                    <h5>Store Details</h5>
                  </CRow>
                  <CRow class="pt-3">
                    <CCol class="col-4">
                      <span style="font-weight: bold"> Store: </span>
                      {{ item.storename }}
                    </CCol>
                    <CCol class="col-4">
                      <span style="font-weight: bold"> Area: </span>
                      {{ item.sqfeet }} sqfeet
                    </CCol>
                    <CCol class="col-4">
                      <span style="font-weight: bold"> Duration: </span>
                      {{ item.duration }} months
                    </CCol>
                  </CRow>
                  <CRow class="pt-3">
                    <CCol class="col-4">
                      <span style="font-weight: bold"> Charges: </span>
                      {{ item.charges }}
                    </CCol>
                  </CRow>
                </CCardBody>

                <CCardBody>
                  <CRow class="pl-2">
                    <h5>Personal Details</h5>
                  </CRow>
                  <CRow class="pt-3">
                    <CCol class="col-4">
                      <span style="font-weight: bold"> Name: </span>
                      {{ item.firstname }} {{ item.lastname }}</CCol
                    >
                    <CCol class="col-4">
                      <span style="font-weight: bold"> Email: </span>
                      {{ item.email }}
                    </CCol>
                    <CCol class="col-4">
                      <span style="font-weight: bold"> Phone Number: </span>
                      {{ item.phonenumber }}
                    </CCol>
                  </CRow>
                </CCardBody>

                <CCardBody>
                  <CRow class="pl-2">
                    <h5>Appointment Details</h5>
                  </CRow>
                  <CRow class="pt-3">
                    <CCol class="col-4">
                      <span style="font-weight: bold"> Date: </span>
                      {{ item.appointment.date }}
                    </CCol>
                    <CCol class="col-4">
                      <span style="font-weight: bold"> Time: </span>
                      {{ item.appointment.starttime }} -
                      {{ item.appointment.endtime }}
                    </CCol>
                  </CRow>
                </CCardBody>

                <CCardBody>
                  <CRow class="pl-2">
                    <h5>Billing Details</h5>
                  </CRow>
                  <CRow class="pt-3">
                    <CCol class="col-4">
                      <span style="font-weight: bold"> Name: </span>
                      {{ item.billinginfo.firstname }}
                      {{ item.billinginfo.lastname }}
                    </CCol>
                    <CCol class="col-4">
                      <span style="font-weight: bold"> Phone Number: </span>
                      {{ item.billinginfo.phonenumber }}
                    </CCol>
                    <CCol class="col-4">
                      <span style="font-weight: bold"> Address: </span>
                      {{ item.billinginfo.address }}
                    </CCol>
                  </CRow>
                  <CRow class="pt-3">
                    <CCol class="col-4">
                      <span style="font-weight: bold"> Region: </span
                      >{{ item.billinginfo.region }}</CCol
                    >
                    <CCol class="col-4">
                      <span style="font-weight: bold"> Payment Id: </span>
                      {{ item.billinginfo.paymentid }}</CCol
                    >
                    <CCol class="col-4">
                      <span style="font-weight: bold"> Payment Date: </span>
                      {{ $formatDate(item.CreateDate) }}</CCol
                    >
                  </CRow>
                </CCardBody>

                <CCardBody v-if="item.images != null">
                  <div class="html2pdf__page-break" />
                  <CRow class="pl-2">
                    <h5>Images</h5>
                  </CRow>
                  <CRow sm="10">
                    <CCol
                      sm="3"
                      v-for="images in item.images"
                      :key="images.images"
                    >
                      <img
                        :src="$store.state.apiURL + '/payment/' + images"
                        class="mb-3 store-img"
                      />
                    </CCol>
                  </CRow>
                </CCardBody>
              </div>

              <div
                v-if="
                  item.servicetype == 'boxstorage' ||
                  item.servicetype == 'movingservice'
                "
              >
                <CCardBody>
                  <CRow class="pl-2">
                    <h5>Box Details</h5>
                  </CRow>
                  <CRow class="pt-3">
                    <CCol
                      class="col-6"
                      v-for="list in item.selectedboxes"
                      :key="list.boxid"
                    >
                      <CRow class="col-12">
                        <CCol class="col-6 p-0 pb-3"
                          ><span style="font-weight: bold">
                            {{ list.boxtype }} :</span
                          >
                          {{ list.noofbox }}</CCol
                        >
                        <CCol class="col-6 p-0 pb-3">
                          <span style="font-weight: bold"> Charge: </span>
                          {{ list.charges }}
                        </CCol>
                      </CRow>
                    </CCol>
                  </CRow>
                </CCardBody>

                <CCardBody>
                  <CRow class="pl-2">
                    <h5>Booking Details</h5>
                  </CRow>
                  <CRow class="pt-3">
                    <CCol class="col-3">
                      <span style="font-weight: bold"> Name: </span>
                      {{ item.bookingdetail.firstname }}
                      {{ item.bookingdetail.lastname }}</CCol
                    >
                    <CCol class="col-3">
                      <span style="font-weight: bold"> Email: </span>
                      {{ item.bookingdetail.email }}
                    </CCol>
                    <CCol class="col-3">
                      <span style="font-weight: bold"> Phone Number: </span>
                      {{ item.bookingdetail.phonenumber }}
                    </CCol>
                    <CCol class="col-3">
                      <span style="font-weight: bold"> Address: </span>
                      {{ item.bookingdetail.address }}
                    </CCol>
                  </CRow>
                  <CRow class="pt-3">
                    <CCol class="col-3">
                      <span style="font-weight: bold"> Region: </span>
                      {{ item.bookingdetail.region }}
                    </CCol>
                    <CCol class="col-3">
                      <span style="font-weight: bold"> walkup: </span>
                      {{ item.bookingdetail.walkup }}
                    </CCol>
                    <CCol class="col-3">
                      <span style="font-weight: bold"> remark: </span>
                      {{ item.bookingdetail.remark }}
                    </CCol>
                  </CRow>
                </CCardBody>

                <CCardBody>
                  <CRow class="pl-2">
                    <h5>Appointment Details</h5>
                  </CRow>
                  <CRow class="pt-3">
                    <CCol class="col-4">
                      <span style="font-weight: bold"> Date: </span>
                      {{ item.bookingdetail.appointment.date }}
                    </CCol>
                    <CCol class="col-4">
                      <span style="font-weight: bold"> Time: </span>
                      {{ item.bookingdetail.appointment.starttime }} -
                      {{ item.bookingdetail.appointment.endtime }}
                    </CCol>
                  </CRow>
                </CCardBody>

                <CCardBody>
                  <CRow class="pl-2">
                    <h5>Billing Details</h5>
                  </CRow>
                  <CRow class="pt-3">
                    <CCol class="col-4">
                      <span style="font-weight: bold"> Name: </span>
                      {{ item.billinginfo.firstname }}
                      {{ item.billinginfo.lastname }}
                    </CCol>
                    <CCol class="col-4">
                      <span style="font-weight: bold"> Phone Number: </span>
                      {{ item.billinginfo.phonenumber }}
                    </CCol>
                    <CCol class="col-4">
                      <span style="font-weight: bold"> Address: </span>
                      {{ item.billinginfo.address }}
                    </CCol>
                  </CRow>
                  <CRow class="pt-3">
                    <CCol class="col-4">
                      <span style="font-weight: bold"> Region: </span
                      >{{ item.billinginfo.region }}</CCol
                    >
                    <CCol class="col-4">
                      <span style="font-weight: bold"> Payment Id: </span>
                      {{ item.billinginfo.paymentid }}</CCol
                    >
                    <CCol class="col-4">
                      <span style="font-weight: bold"> Payment Date: </span>
                      {{ $formatDate(item.CreateDate) }}</CCol
                    >
                  </CRow>
                </CCardBody>

                <CCardBody v-if="item.images != null">
                  <div class="html2pdf__page-break" />
                  <CRow class="pl-2">
                    <h5>Images</h5>
                  </CRow>
                  <CRow sm="10">
                    <CCol
                      sm="3"
                      v-for="images in item.images"
                      :key="images.images"
                    >
                      <img
                        :src="$store.state.apiURL + '/payment/' + images"
                        class="mb-3 store-img"
                      />
                    </CCol>
                  </CRow>
                  <!-- <div style="display: flex; margin-right: 10px">
                    <div v-for="images in item.images" :key="images.images">
                      <img
                        :src="$store.state.apiURL + '/payment/' + images"
                        style="
                    height: 150px !important;
                    width: 200px;
                    margin-right: 10px;
                  "
                      />
                    </div>
                  </div> -->
                </CCardBody>
              </div>
            </section>
          </vue-html2pdf>
        </div>

        <div v-if="item.servicetype == 'selfstorage'">
          <CCardBody>
            <CRow class="pl-2">
              <h5>Store Details</h5>
            </CRow>
            <CRow class="pt-3">
              <CCol class="col-4">
                <span style="font-weight: bold"> Store: </span>
                {{ item.storename }}
              </CCol>
              <CCol class="col-4">
                <span style="font-weight: bold"> Chinese Store: </span>
                {{ item.chienseStoreName }}
              </CCol>
              <CCol class="col-4">
                <span style="font-weight: bold"> Area: </span>
                {{ item.sqfeet }} sqfeet
              </CCol>
            </CRow>
            <CRow class="pt-3">
              <CCol class="col-4">
                <span style="font-weight: bold"> Duration: </span>
                {{ item.duration }} months
              </CCol>
              <CCol class="col-4">
                <span style="font-weight: bold"> Charges: </span>
                {{ item.charges }}
              </CCol>
            </CRow>
          </CCardBody>

          <CCardBody>
            <CRow class="pl-2">
              <h5>Personal Details</h5>
            </CRow>
            <CRow class="pt-3">
              <CCol class="col-4">
                <span style="font-weight: bold"> Name: </span>
                {{ item.firstname }} {{ item.lastname }}</CCol
              >
              <CCol class="col-4">
                <span style="font-weight: bold"> Email: </span> {{ item.email }}
              </CCol>
              <CCol class="col-4">
                <span style="font-weight: bold"> Phone Number: </span>
                {{ item.phonenumber }}
              </CCol>
            </CRow>
          </CCardBody>

          <CCardBody>
            <CRow class="pl-2">
              <h5>Appointment Details</h5>
            </CRow>
            <CRow class="pt-3">
              <CCol class="col-4">
                <span style="font-weight: bold"> Date: </span>
                {{ item.appointment.date }}
              </CCol>
              <CCol class="col-4">
                <span style="font-weight: bold"> Time: </span>
                {{ item.appointment.starttime }} -
                {{ item.appointment.endtime }}
              </CCol>
            </CRow>
          </CCardBody>

          <CCardBody>
            <CRow class="pl-2">
              <h5>Billing Details</h5>
            </CRow>
            <CRow class="pt-3">
              <CCol class="col-4">
                <span style="font-weight: bold"> Name: </span>
                {{ item.billinginfo.firstname }} {{ item.billinginfo.lastname }}
              </CCol>
              <CCol class="col-4">
                <span style="font-weight: bold"> Phone Number: </span>
                {{ item.billinginfo.phonenumber }}
              </CCol>
              <CCol class="col-4">
                <span style="font-weight: bold"> Address: </span>
                {{ item.billinginfo.address }}
              </CCol>
            </CRow>
            <CRow class="pt-3">
              <CCol class="col-4">
                <span style="font-weight: bold"> Region: </span
                >{{ item.billinginfo.region }}</CCol
              >
              <CCol class="col-4">
                <span style="font-weight: bold"> Payment Id: </span>
                {{ item.billinginfo.paymentid }}</CCol
              >
              <CCol class="col-4">
                <span style="font-weight: bold"> Payment Date: </span>
                {{ $formatDate(item.CreateDate) }}</CCol
              >
            </CRow>
          </CCardBody>

          <CCardBody v-if="item.images != null">
            <CRow class="pl-2">
              <h5>Images</h5>
            </CRow>
            <CRow sm="10">
              <CCol sm="3" v-for="images in item.images" :key="images.images">
                <img
                  :src="$store.state.apiURL + '/payment/' + images"
                  class="mb-3 store-img"
                />
              </CCol>
            </CRow>
          </CCardBody>
        </div>

        <div
          v-if="
            item.servicetype == 'boxstorage' ||
            item.servicetype == 'movingservice'
          "
        >
          <CCardBody>
            <CRow class="pl-2">
              <h5>Box Details</h5>
            </CRow>
            <CRow class="pt-3">
              <CCol
                class="col-6"
                v-for="list in item.selectedboxes"
                :key="list.boxid"
              >
                <CRow class="col-12">
                  <CCol class="col-6 p-0 pb-3"
                    ><span style="font-weight: bold">
                      {{ list.boxtype }} :</span
                    >
                    {{ list.noofbox }}</CCol
                  >
                  <CCol class="col-6 p-0 pb-3">
                    <span style="font-weight: bold"> Charge: </span>
                    {{ list.charges }}
                  </CCol>
                </CRow>
              </CCol>
            </CRow>
          </CCardBody>

          <CCardBody>
            <CRow class="pl-2">
              <h5>Booking Details</h5>
            </CRow>
            <CRow class="pt-3">
              <CCol class="col-3">
                <span style="font-weight: bold"> Name: </span>
                {{ item.bookingdetail.firstname }}
                {{ item.bookingdetail.lastname }}</CCol
              >
              <CCol class="col-3">
                <span style="font-weight: bold"> Email: </span>
                {{ item.bookingdetail.email }}
              </CCol>
              <CCol class="col-3">
                <span style="font-weight: bold"> Phone Number: </span>
                {{ item.bookingdetail.phonenumber }}
              </CCol>
              <CCol class="col-3">
                <span style="font-weight: bold"> Address: </span>
                {{ item.bookingdetail.address }}
              </CCol>
            </CRow>
            <CRow class="pt-3">
              <CCol class="col-3">
                <span style="font-weight: bold"> Region: </span>
                {{ item.bookingdetail.region }}
              </CCol>
              <CCol class="col-3">
                <span style="font-weight: bold"> walkup: </span>
                {{ item.bookingdetail.walkup }}
                ({{ item.bookingdetail.iswalkup ? "Yes" : "No" }})
              </CCol>
              <CCol class="col-3">
                <span style="font-weight: bold"> remark: </span>
                {{ item.bookingdetail.remark }}
              </CCol>
            </CRow>
          </CCardBody>

          <CCardBody>
            <CRow class="pl-2">
              <h5>Appointment Details</h5>
            </CRow>
            <CRow class="pt-3">
              <CCol class="col-4">
                <span style="font-weight: bold"> Date: </span>
                {{ item.bookingdetail.appointment.date }}
              </CCol>
              <CCol class="col-4">
                <span style="font-weight: bold"> Time: </span>
                {{ item.bookingdetail.appointment.starttime }} -
                {{ item.bookingdetail.appointment.endtime }}
              </CCol>
            </CRow>
          </CCardBody>

          <CCardBody>
            <CRow class="pl-2">
              <h5>Billing Details</h5>
            </CRow>
            <CRow class="pt-3">
              <CCol class="col-4">
                <span style="font-weight: bold"> Name: </span>
                {{ item.billinginfo.firstname }} {{ item.billinginfo.lastname }}
              </CCol>
              <CCol class="col-4">
                <span style="font-weight: bold"> Phone Number: </span>
                {{ item.billinginfo.phonenumber }}
              </CCol>
              <CCol class="col-4">
                <span style="font-weight: bold"> Address: </span>
                {{ item.billinginfo.address }}
              </CCol>
            </CRow>
            <CRow class="pt-3">
              <CCol class="col-4">
                <span style="font-weight: bold"> Region: </span
                >{{ item.billinginfo.region }}</CCol
              >
              <CCol class="col-4">
                <span style="font-weight: bold"> Payment Id: </span>
                {{ item.billinginfo.paymentid }}</CCol
              >
              <CCol class="col-4">
                <span style="font-weight: bold"> Payment Date: </span>
                {{ $formatDate(item.CreateDate) }}</CCol
              >
            </CRow>
          </CCardBody>

          <CCardBody v-if="item.images != null">
            <CRow class="pl-2">
              <h5>Images</h5>
            </CRow>
            <CRow sm="10">
              <CCol sm="3" v-for="images in item.images" :key="images.images">
                <img
                  :src="$store.state.apiURL + '/payment/' + images"
                  class="mb-3 store-img"
                />
              </CCol>
            </CRow>
          </CCardBody>

          <CCardBody
            v-if="
              item.servicetype == 'boxstorage' && item.selectedboxes != null
            "
          >
            <CRow class="pl-2">
              <h5>Box Images</h5>
            </CRow>
            <div
              v-for="boxdetail in item.selectedboxes"
              :key="boxdetail.boxid"
              sm="12"
            >
              <CCol sm="12"
                ><h6>{{ boxdetail.boxtype }}</h6></CCol
              >
              <CRow sm="12" class="mt-2 ml-2">
                <CCol
                  sm="3"
                  v-for="(image, index) in boxdetail.boximages"
                  :key="index"
                >
                  <img
                    :src="$store.state.apiURL + '/payment/' + image"
                    class="mb-3 store-img"
                  />
                </CCol>
                <CCol
                  v-if="
                    boxdetail.boximages === undefined ||
                    boxdetail.boximages === null ||
                    boxdetail.boximages === []
                  "
                >
                  No Image Uploaded!!!
                </CCol>
              </CRow>
            </div>
          </CCardBody>
        </div>
      </CCard>
    </CCol>
  </div>
</template>

<script>
import APIService from "@/services/api.service.js";
import Store from "@/store/index";
import VueHtml2pdf from "vue-html2pdf";

export default {
  name: "OrderDetails",
  data() {
    return {
      item: [],
      id: this.$route.params.id,
    };
  },
  components: {
    VueHtml2pdf,
  },

  created() {
    Store.commit("showLoader");
    this.getPaymentDetailsListData();
  },
  methods: {
    getPaymentDetailsListData() {
      APIService.getById("/orderdetailsbyid", this.id).then((response) => {
        for (var i = 0; i < response.data.length; i++) {
          response.data[i].images =
            this.$store.state.apiURL + "/payment/" + response.data[i].images;
        }
        this.item = response.data;
        Store.commit("hideLoader");
      });
    },
    sendmail() {
      var _data = {
        apiurl: this.$store.state.apiURL,
      };
      APIService.post("/orderdetailsmailbyid", _data, this.id).then(
        (response) => {
          this.item = response.data;
          this.$successAlert("Email sent. Please check your mail.");
          Store.commit("hideLoader");
        }
      );
    },
    generateReport() {
      this.$refs.html2Pdf.generatePdf();
    },
    async beforeDownload({ html2pdf, options, pdfContent }) {
      Store.commit("showLoader");
      options.image.type = "jpg";
      options.html2canvas.dpi = 192;
      options.html2canvas.letterRendering = true;
      options.margin = [0.5, 0, 0.7, 0];
      await html2pdf()
        .set(options)
        .from(pdfContent)
        .toPdf()
        .get("pdf")
        .then((pdf) => {
          const totalPages = pdf.internal.getNumberOfPages();
          for (let i = 1; i <= totalPages; i++) {
            pdf.setPage(i);
            pdf.setFontSize(10);
            pdf.setTextColor(150);
            pdf.text(
              "Page " + i + " of " + totalPages,
              pdf.internal.pageSize.getWidth() * 0.88,
              pdf.internal.pageSize.getHeight() - 0.3
            );
          }
          Store.commit("hideLoader");
        })
        .save();
    },
  },
};
</script>
<style scoped>
.store-img {
  height: 140px !important;
  width: 250px !important;
}
</style>
