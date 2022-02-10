<template>
  <div>
    <CCard>
      <CCardHeader>
        <CRow>
          <CCol>
            <strong>List Of Registered User</strong>
          </CCol>
          <CCol col="2">
            <CLink
              href="/assets/user_import_sample.xlsx"
              target="_blank"
              v-show="false"
              id="downloadsample"
              ><CIcon name="cil-arrow-bottom" /> {{ "Download File" }}</CLink
            >
            <CButton
              block
              color="info"
              onclick="document.getElementById('downloadsample').click()"
              >{{ "Download Template" }}</CButton
            >
          </CCol>
          <CCol col="2">
            <CInputFile
              id="importdatafile"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              type="file"
              ref="importfile"
              @change="onFileChange"
              v-show="false"
            />
            <CButton
              block
              color="secondary"
              onclick="document.getElementById('importdatafile').click()"
              >{{ "Import CSV" }}</CButton
            >
          </CCol>
          <CCol col="2">
            <CButton block router-link :to="{ name: 'addUser' }" color="dark">{{
              "Add User"
            }}</CButton>
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
                  <CDropdownItem
                    :to="{
                      name: 'EditRegisterUser',
                      params: { id: item._id },
                    }"
                  >
                    Edit
                  </CDropdownItem>
                  <!-- <CDropdownItem
                    v-if="item.deleted == false"
                    @click="deActivateItem(item._id, item.deleted)"
                    >Deactivate</CDropdownItem
                  >
                  <CDropdownItem
                    v-else
                    @click="deActivateItem(item._id, item.deleted)"
                    >Activate</CDropdownItem
                  > -->
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
import XLSX from "xlsx";
export default {
  name: "RegisterUserList",
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
      importdata: null,
      listofData: [],
    };
  },
  created() {
    Store.commit("showLoader");
    this.getRegisterUserListData();
    document.title = this.$store.state.projecttitle + " - Register User";
  },
  methods: {
    getRegisterUserListData() {
      APIService.post("/registeruserlist").then((response) => {
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
            APIService.delete("/DeActivateRegisterUser", req).then(
              (response) => {
                this.$set(this, "item", response.data);
              }
            );
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
            APIService.delete("/DeleteRegisterUser", req).then((response) => {
              this.$set(this, "item", response.data);
            });
          }
        },
      });
    },
    // downloadsample() {
    //   APIService.post("/GetUserSampleFile").then((response) => {
    //     this.samplefileurl =
    //       this.$store.state.apiURL + "/usersample/" + response.data.filename;
    //     setTimeout(function () {
    //       document.getElementById("downloadsample").click();
    //     }, 200);
    //   });
    // },
    onFileChange(filename, e) {
      e.stopPropagation();
      e.preventDefault();
      var thisObj = this;
      var files = e.target.files,
        i,
        f;
      for (i = 0, f = files[i]; i != files.length; ++i) {
        var reader = new FileReader();

        reader.onload = function (e) {
          var results,
            data = e.target.result;
          var fixedData = fixdata(data);
          var workbook = XLSX.read(btoa(fixedData), { type: "base64" });
          var firstSheetName = workbook.SheetNames[0];
          var worksheet = workbook.Sheets[firstSheetName];

          results = XLSX.utils.sheet_to_json(worksheet);
          thisObj.importdata = results;
          if (
            thisObj.importdata != null &&
            thisObj.importdata != undefined &&
            thisObj.importdata.length > 0
          ) {
            for (
              var dataCount = 0;
              dataCount < thisObj.importdata.length;
              dataCount++
            ) {
              var userdata = thisObj.importdata[dataCount];
              if (
                userdata.firstName != undefined &&
                userdata.firstName.toString() != "" &&
                userdata.lastName != undefined &&
                userdata.lastName.toString() != "" &&
                userdata.email != undefined &&
                userdata.email.toString() != ""
              ) {
                userdata.byRegistration = false;
                thisObj.listofData.push(userdata);
              } else {
                thisObj.listofData = null;
                break;
              }
            }
            e.target.files = null;
            thisObj.uploadData();
          }
        };
        reader.readAsArrayBuffer(f);
      }
    },
    uploadData() {
      if (
        this.listofData != null &&
        this.listofData != [] &&
        this.listofData.length > 0
      ) {
        APIService.post("/AddMultipleUser", this.listofData).then(
          (response) => {
            if (response.data == "Email Already Exist") {
              this.$dangerAlert(response.data);
            } else {
              this.$successAlert("Data imported successfully!");
            }
            document.getElementById("importdatafile").value = null;
            this.getRegisterUserListData();
          }
        );
      } else {
        document.getElementById("importdatafile").value = null;
        this.$dangerAlert("Please fill all fields in CSV before upload");
      }
    },
  },
};

function fixdata(data) {
  var o = "",
    l = 0,
    w = 10240;
  for (; l < data.byteLength / w; ++l)
    o += String.fromCharCode.apply(
      null,
      new Uint8Array(data.slice(l * w, l * w + w))
    );
  o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
  return o;
}
</script>
