<template>
  <div v-if="resources != null">
    <CCol>
      <CCard>
        <CForm @submit.prevent="handleSubmit">
          <CCardHeader>
            <strong>Resources</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="6">
                <span>Select Language</span>
                <v-select
                  v-model="language"
                  style="margin-top: 8px"
                  :options="optionResource"
                  placeholder="Select Language"
                  @input="getLanguage(language)"
                  :clearable="false"
                />
              </CCol>
            </CRow>
            <div v-if="language != ''" style="margin-top:30px;">
              <CCard class="mb-0">
                <CButton
                  block
                  color="link"
                  class="text-left shadow-none card-header"
                  @click="accordion = accordion === 0 ? false : 0"
                >
                  <h5 class="m-0">Header</h5>
                </CButton>
                <div v-if="resources != null">
                  <CCollapse :show="accordion === 0">
                    <CCardBody>
                      <CRow>
                        <CCol sm="6">
                          <label>Selfstorage</label>
                          <CInput v-model="resources.header.selfstorage" />
                        </CCol>
                        <CCol sm="6">
                          <label>Boxstorage</label>
                          <CInput v-model="resources.header.boxstorage" />
                        </CCol>
                        <CCol sm="6">
                          <label>About us</label>
                          <CInput v-model="resources.header.aboutus" />
                        </CCol>
                        <CCol sm="6">
                          <label>Promotion</label>
                          <CInput v-model="resources.header.promotion" />
                        </CCol>
                        <CCol sm="6">
                          <label>News and activities</label>
                          <CInput
                            v-model="resources.header.newsandactivities"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Faq</label>
                          <CInput v-model="resources.header.faq" />
                        </CCol>
                        <CCol sm="6">
                          <label>Contact us</label>
                          <CInput v-model="resources.header.contactus" />
                        </CCol>
                        <CCol sm="6">
                          <label>Login</label>
                          <CInput v-model="resources.header.login" />
                        </CCol>
                        <CCol sm="6">
                          <label>My Account</label>
                          <CInput v-model="resources.header.myaccount" />
                        </CCol>
                        <CCol sm="6">
                          <label>Header btn EN</label>
                          <CInput v-model="resources.header.headerbtnen" />
                        </CCol>
                        <CCol sm="6">
                          <label>Header btn CH</label>
                          <CInput v-model="resources.header.headerbtnch" />
                        </CCol>
                        <CCol sm="6">
                          <label>Number</label>
                          <CInput v-model="resources.header.number" />
                        </CCol>
                        <CCol sm="6">
                          <label>Book now</label>
                          <CInput v-model="resources.header.booknow" />
                        </CCol>
                      </CRow>
                    </CCardBody>
                  </CCollapse>
                </div>
              </CCard>
              <CCard class="mb-0">
                <CButton
                  block
                  color="link"
                  class="text-left shadow-none card-header"
                  @click="accordion = accordion === 1 ? false : 1"
                >
                  <h5 class="m-0">Footer</h5>
                </CButton>
                <div v-if="resources != null">
                  <CCollapse :show="accordion === 1">
                    <CCardBody>
                      <CRow>
                        <CCol sm="6">
                          <label>Whatsapp Number</label>
                          <CInput v-model="resources.footer.whatsappnumber" />
                        </CCol>
                        <CCol sm="6">
                          <label>Email</label>
                          <CInput v-model="resources.footer.email" />
                        </CCol>
                        <CCol sm="6">
                          <label>Live chat</label>
                          <CInput v-model="resources.footer.livechat" />
                        </CCol>
                        <CCol sm="6">
                          <label>eng</label>
                          <CInput v-model="resources.footer.eng" />
                        </CCol>
                        <CCol sm="6">
                          <label>Our Service</label>
                          <CInput v-model="resources.footer.ourservices" />
                        </CCol>
                        <CCol sm="6">
                          <label>Support</label>
                          <CInput v-model="resources.footer.support" />
                        </CCol>
                        <CCol sm="6">
                          <label>Privacy-Terms</label>
                          <CInput v-model="resources.footer.privacyterms" />
                        </CCol>
                      </CRow>
                    </CCardBody>
                  </CCollapse>
                </div>
              </CCard>
              <CCard class="mb-0">
                <CButton
                  block
                  color="link"
                  class="text-left shadow-none card-header"
                  @click="accordion = accordion === 2 ? false : 2"
                >
                  <h5 class="m-0">The Container</h5>
                </CButton>
                <div v-if="resources != null">
                  <CCollapse :show="accordion === 2">
                    <CCardBody>
                      <CRow>
                        <CCol sm="6">
                          <label>Register modal title</label>
                          <CInput
                            v-model="resources.container.registermodaltitle"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Login modal title</label>
                          <CInput
                            v-model="resources.container.loginmodaltitle"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>ForgotPassword modal title</label>
                          <CInput
                            v-model="
                              resources.container.forgotpasswordmodaltitle
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>ChangePassword modal title</label>
                          <CInput
                            v-model="
                              resources.container.changepasswordmodaltitle
                            "
                          />
                        </CCol>
                      </CRow>
                    </CCardBody>
                  </CCollapse>
                </div>
              </CCard>
              <CCard class="mb-0">
                <CButton
                  block
                  color="link"
                  class="text-left shadow-none card-header"
                  @click="accordion = accordion === 3 ? false : 3"
                >
                  <h5 class="m-0">Home</h5>
                </CButton>
                <div v-if="resources != null">
                  <CCollapse :show="accordion === 3">
                    <CCardBody>
                      <CRow>
                        <CCol sm="6">
                          <label>Selfstorage title</label>
                          <CInput v-model="resources.home.selfstoragetitle" />
                        </CCol>
                        <CCol sm="6">
                          <label>Selfstorage text</label>
                          <CInput v-model="resources.home.selfstoragetext" />
                        </CCol>
                        <CCol sm="6">
                          <label>Boxstorage title</label>
                          <CInput v-model="resources.home.boxstoragetitle" />
                        </CCol>
                        <CCol sm="6">
                          <label>Boxstorage text</label>
                          <CInput v-model="resources.home.boxstoragetext" />
                        </CCol>
                        <CCol sm="6">
                          <label>Boxstorage byitem</label>
                          <CInput v-model="resources.home.boxstoragebyitem" />
                        </CCol>
                        <CCol sm="6">
                          <label>Boxstorage byitem text</label>
                          <CInput
                            v-model="resources.home.boxstoragebyitemtext"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Boxstorage bysquarefeet</label>
                          <CInput v-model="resources.home.boxstoragebysqft" />
                        </CCol>
                        <CCol sm="6">
                          <label>Boxstorage bysquarefeet text</label>
                          <CInput
                            v-model="resources.home.boxstoragebysqfttext"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Our feature title</label>
                          <CInput v-model="resources.home.ourfeaturetitle" />
                        </CCol>
                        <CCol sm="6">
                          <label>Our feature text</label>
                          <CInput v-model="resources.home.ourfeaturetext" />
                        </CCol>
                        <CCol sm="6">
                          <label>Our feature selfstorage</label>
                          <CInput
                            v-model="resources.home.ourfeaturesselfstorage"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Our feature selfstorage text</label>
                          <CInput
                            v-model="resources.home.ourfeaturesselfstoragetext"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Our feature selfstorage btn booknow</label>
                          <CInput
                            v-model="
                              resources.home.ourfeaturesselfstoragebtnbooknow
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Our feature selfstorage btn looking</label>
                          <CInput
                            v-model="
                              resources.home.ourfeaturesselfstoragebtnlooking
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Our feature storagebox</label>
                          <CInput
                            v-model="resources.home.ourfeaturesstoragebox"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Our feature storagebox text</label>
                          <CInput
                            v-model="resources.home.ourfeaturesstorageboxtext"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Our feature storagebox btn booknow</label>
                          <CInput
                            v-model="
                              resources.home.ourfeaturesstorageboxbtnbooknow
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Our feature storagebox btn looking</label>
                          <CInput
                            v-model="
                              resources.home.ourfeaturesstorageboxbtnlooking
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Our feature movingservice</label>
                          <CInput
                            v-model="resources.home.ourfeaturesmovingservice"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Our feature movingservice text</label>
                          <CInput
                            v-model="
                              resources.home.ourfeaturesmovingservicetext
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Our feature movingservice btn booknow</label>
                          <CInput
                            v-model="
                              resources.home.ourfeaturesmovingservicebtnbooknow
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Our feature movingservice btn looking</label>
                          <CInput
                            v-model="
                              resources.home.ourfeaturesmovingservicebtnlooking
                            "
                          />
                        </CCol>
                      </CRow>
                    </CCardBody>
                  </CCollapse>
                </div>
              </CCard>
              <CCard class="mb-0">
                <CButton
                  block
                  color="link"
                  class="text-left shadow-none card-header"
                  @click="accordion = accordion === 4 ? false : 4"
                >
                  <h5 class="m-0">Self Storage</h5>
                </CButton>
                <div v-if="resources != null">
                  <CCollapse :show="accordion === 4">
                    <CCardBody>
                      <CRow>
                        <CCol sm="6">
                          <label>Our location</label>
                          <CInput v-model="resources.selfstorage.ourlocation" />
                        </CCol>
                        <CCol sm="6">
                          <label>Address</label>
                          <CInput v-model="resources.selfstorage.address" />
                        </CCol>
                        <CCol sm="6">
                          <label>Tel</label>
                          <CInput v-model="resources.selfstorage.tel" />
                        </CCol>
                        <CCol sm="6">
                          <label>Directline</label>
                          <CInput v-model="resources.selfstorage.directline" />
                        </CCol>
                        <CCol sm="6">
                          <label>Whatsapp</label>
                          <CInput v-model="resources.selfstorage.whatsapp" />
                        </CCol>
                        <CCol sm="6">
                          <label>Email</label>
                          <CInput v-model="resources.selfstorage.email" />
                        </CCol>
                        <CCol sm="6">
                          <label>Day Monday</label>
                          <CInput
                            v-model="resources.selfstorage.daynamemonday"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Day Tuesday</label>
                          <CInput
                            v-model="resources.selfstorage.daynametuesday"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Day Wednesday</label>
                          <CInput
                            v-model="resources.selfstorage.daynamewednesday"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Day Thursday</label>
                          <CInput
                            v-model="resources.selfstorage.daynamethursday"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>day Friday</label>
                          <CInput
                            v-model="resources.selfstorage.daynamefriday"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Day Saturday</label>
                          <CInput
                            v-model="resources.selfstorage.daynamesaturday"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Day sunday</label>
                          <CInput
                            v-model="resources.selfstorage.daynamesunday"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Btn booknow</label>
                          <CInput
                            v-model="resources.selfstorage.storebtnbooknow"
                          />
                        </CCol>
                      </CRow>
                    </CCardBody>
                  </CCollapse>
                </div>
              </CCard>
              <CCard class="mb-0">
                <CButton
                  block
                  color="link"
                  class="text-left shadow-none card-header"
                  @click="accordion = accordion === 5 ? false : 5"
                >
                  <h5 class="m-0">Box Storage</h5>
                </CButton>
                <div v-if="resources != null">
                  <CCollapse :show="accordion === 5">
                    <CCardBody>
                      <CRow>
                        <CCol sm="6">
                          <label>By boxstorage</label>
                          <CInput v-model="resources.boxstorage.byboxstorage" />
                        </CCol>
                        <CCol sm="6">
                          <label>By boxstoragetext</label>
                          <CInput
                            v-model="resources.boxstorage.byboxstoragetext"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>By boxstorage box/month</label>
                          <CInput
                            v-model="resources.boxstorage.byboxstorageboxmonth"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Packing</label>
                          <CInput v-model="resources.boxstorage.packing" />
                        </CCol>
                        <CCol sm="6">
                          <label>Packing text</label>
                          <CInput v-model="resources.boxstorage.packingtext" />
                        </CCol>
                        <CCol sm="6">
                          <label>Pick up</label>
                          <CInput v-model="resources.boxstorage.pickup" />
                        </CCol>
                        <CCol sm="6">
                          <label>Pick up text</label>
                          <CInput v-model="resources.boxstorage.pickuptext" />
                        </CCol>
                        <CCol sm="6">
                          <label>Store</label>
                          <CInput v-model="resources.boxstorage.store" />
                        </CCol>
                        <CCol sm="6">
                          <label>Storetext</label>
                          <CInput v-model="resources.boxstorage.storetext" />
                        </CCol>
                        <CCol sm="6">
                          <label>Return</label>
                          <CInput v-model="resources.boxstorage.return" />
                        </CCol>
                        <CCol sm="6">
                          <label>Returntext</label>
                          <CInput v-model="resources.boxstorage.returntext" />
                        </CCol>
                        <CCol sm="6">
                          <label>Btn booknow</label>
                          <CInput v-model="resources.boxstorage.btnbooknow" />
                        </CCol>
                      </CRow>
                    </CCardBody>
                  </CCollapse>
                </div>
              </CCard>
              <CCard class="mb-0">
                <CButton
                  block
                  color="link"
                  class="text-left shadow-none card-header"
                  @click="accordion = accordion === 6 ? false : 6"
                >
                  <h5 class="m-0">About Us</h5>
                </CButton>
                <div v-if="resources != null">
                  <CCollapse :show="accordion === 6">
                    <CCardBody>
                      <CRow>
                        <CCol sm="6">
                          <label>About Us Heading</label>
                          <CInput v-model="resources.aboutus.aboutusheading" />
                        </CCol>
                      </CRow>
                    </CCardBody>
                  </CCollapse>
                </div>
              </CCard>
              <CCard class="mb-0">
                <CButton
                  block
                  color="link"
                  class="text-left shadow-none card-header"
                  @click="accordion = accordion === 7 ? false : 7"
                >
                  <h5 class="m-0">Promotion</h5>
                </CButton>
                <div v-if="resources != null">
                  <CCollapse :show="accordion === 7">
                    <CCardBody>
                      <CRow>
                        <CCol sm="6">
                          <label>Promotion Heading</label>
                          <CInput v-model="resources.promotion.promotion" />
                        </CCol>
                        <CCol sm="6">
                          <label>Btn viewmore</label>
                          <CInput v-model="resources.promotion.btnviewmore" />
                        </CCol>
                        <CCol sm="6">
                          <label>Btn loadmore</label>
                          <CInput v-model="resources.promotion.btnloadmore" />
                        </CCol>
                        <CCol sm="6">
                          <label>Modal title</label>
                          <CInput v-model="resources.promotion.modaltitle" />
                        </CCol>
                      </CRow>
                    </CCardBody>
                  </CCollapse>
                </div>
              </CCard>
              <CCard class="mb-0">
                <CButton
                  block
                  color="link"
                  class="text-left shadow-none card-header"
                  @click="accordion = accordion === 8 ? false : 8"
                >
                  <h5 class="m-0">News and Activities</h5>
                </CButton>
                <div v-if="resources != null">
                  <CCollapse :show="accordion === 8">
                    <CCardBody>
                      <CRow>
                        <CCol sm="6">
                          <label>News and Activites Heading</label>
                          <CInput
                            v-model="
                              resources.newsandactivities.newsandactivities
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Btn viewmore</label>
                          <CInput
                            v-model="resources.newsandactivities.btnviewmore"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Btn loadmore</label>
                          <CInput
                            v-model="resources.newsandactivities.btnloadmore"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Modal title</label>
                          <CInput
                            v-model="resources.newsandactivities.modaltitle"
                          />
                        </CCol>
                      </CRow>
                    </CCardBody>
                  </CCollapse>
                </div>
              </CCard>
              <CCard class="mb-0">
                <CButton
                  block
                  color="link"
                  class="text-left shadow-none card-header"
                  @click="accordion = accordion === 9 ? false : 9"
                >
                  <h5 class="m-0">FAQ</h5>
                </CButton>
                <div v-if="resources != null">
                  <CCollapse :show="accordion === 9">
                    <CCardBody>
                      <CRow>
                        <CCol sm="6">
                          <label>FAQ Heading</label>
                          <CInput v-model="resources.faq.faqheading" />
                        </CCol>
                      </CRow>
                    </CCardBody>
                  </CCollapse>
                </div>
              </CCard>
              <CCard class="mb-0">
                <CButton
                  block
                  color="link"
                  class="text-left shadow-none card-header"
                  @click="accordion = accordion === 10 ? false : 10"
                >
                  <h5 class="m-0">Contact Us</h5>
                </CButton>
                <div v-if="resources != null">
                  <CCollapse :show="accordion === 10">
                    <CCardBody>
                      <CRow>
                        <CCol sm="6">
                          <label>Contact us heading</label>
                          <CInput v-model="resources.contactus.contactus" />
                        </CCol>
                        <CCol sm="6">
                          <label>Service enquiry</label>
                          <CInput
                            v-model="resources.contactus.serviceenquiry"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>If you have any enquiries</label>
                          <CInput
                            v-model="resources.contactus.ifyouhaveanyenquiries"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Call hotline</label>
                          <CInput v-model="resources.contactus.call" />
                        </CCol>
                        <CCol sm="6">
                          <label>Send email</label>
                          <CInput v-model="resources.contactus.sendmail" />
                        </CCol>
                        <CCol sm="6">
                          <label>Online message</label>
                          <CInput v-model="resources.contactus.onlinemessage" />
                        </CCol>
                        <CCol sm="6">
                          <label>Placeholder firstname</label>
                          <CInput
                            v-model="resources.contactus.placeholderfirstname"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Placeholder lastname</label>
                          <CInput
                            v-model="resources.contactus.placeholderlastname"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Placeholder phonenumber</label>
                          <CInput
                            v-model="resources.contactus.placeholderphonenumber"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Placeholder email</label>
                          <CInput
                            v-model="resources.contactus.placeholderemail"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Placeholder content</label>
                          <CInput
                            v-model="resources.contactus.placeholdercontent"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Btn sendreq</label>
                          <CInput v-model="resources.contactus.sendreqbtn" />
                        </CCol>
                      </CRow>
                    </CCardBody>
                  </CCollapse>
                </div>
              </CCard>
              <CCard class="mb-0">
                <CButton
                  block
                  color="link"
                  class="text-left shadow-none card-header"
                  @click="accordion = accordion === 11 ? false : 11"
                >
                  <h5 class="m-0">Service</h5>
                </CButton>
                <div v-if="resources != null">
                  <CCollapse :show="accordion === 11">
                    <CCardBody>
                      <CRow>
                        <CCol sm="6">
                          <label>Select service</label>
                          <CInput v-model="resources.service.selectservice" />
                        </CCol>
                        <CCol sm="6">
                          <label>Select service text</label>
                          <CInput
                            v-model="resources.service.selectservicetext"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Selfstorage</label>
                          <CInput v-model="resources.service.selfstorage" />
                        </CCol>
                        <CCol sm="6">
                          <label>Selfstorage text</label>
                          <CInput v-model="resources.service.selfstoragetext" />
                        </CCol>
                        <CCol sm="6">
                          <label>Selfstorage btn booknow</label>
                          <CInput
                            v-model="resources.service.selfstoragebtnbooknow"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Selfstorage btn looking</label>
                          <CInput
                            v-model="resources.service.selfstoragebtnlooking"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Boxstorage</label>
                          <CInput v-model="resources.service.boxstorage" />
                        </CCol>
                        <CCol sm="6">
                          <label>Boxstorage text</label>
                          <CInput v-model="resources.service.boxstoragetext" />
                        </CCol>
                        <CCol sm="6">
                          <label>Boxstorage btn booknow</label>
                          <CInput
                            v-model="resources.service.boxstoragebtnbooknow"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Boxstorage btn looking</label>
                          <CInput
                            v-model="resources.service.boxstoragebtnlooking"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Movingservice</label>
                          <CInput v-model="resources.service.movingservice" />
                        </CCol>
                        <CCol sm="6">
                          <label>Movingservice text</label>
                          <CInput
                            v-model="resources.service.movingservicetext"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Movingservice btn booknow</label>
                          <CInput
                            v-model="resources.service.movingservicebtnbooknow"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Movingservice btn looking</label>
                          <CInput
                            v-model="resources.service.movingservicebtnlooking"
                          />
                        </CCol>
                      </CRow>
                    </CCardBody>
                  </CCollapse>
                </div>
              </CCard>
              <CCard class="mb-0">
                <CButton
                  block
                  color="link"
                  class="text-left shadow-none card-header"
                  @click="accordion = accordion === 12 ? false : 12"
                >
                  <h5 class="m-0">Self Storage step2</h5>
                </CButton>
                <div v-if="resources != null">
                  <CCollapse :show="accordion === 12">
                    <CCardBody>
                      <CRow>
                        <CCol sm="6">
                          <label>Self storage heading</label>
                          <CInput
                            v-model="resources.selfstoragestep2.selfstorage"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Address</label>
                          <CInput
                            v-model="resources.selfstoragestep2.address"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Tel</label>
                          <CInput v-model="resources.selfstoragestep2.tel" />
                        </CCol>
                        <CCol sm="6">
                          <label>Directline</label>
                          <CInput
                            v-model="resources.selfstoragestep2.directline"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Whatsapp</label>
                          <CInput
                            v-model="resources.selfstoragestep2.whatsapp"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Email</label>
                          <CInput v-model="resources.selfstoragestep2.email" />
                        </CCol>
                        <CCol sm="6">
                          <label>Day Monday</label>
                          <CInput
                            v-model="resources.selfstoragestep2.daymonday"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Day Tuesday</label>
                          <CInput
                            v-model="resources.selfstoragestep2.daytuesday"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Day Wednesday</label>
                          <CInput
                            v-model="resources.selfstoragestep2.daywednesday"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Day Thursday</label>
                          <CInput
                            v-model="resources.selfstoragestep2.daythursday"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>day Friday</label>
                          <CInput
                            v-model="resources.selfstoragestep2.dayfriday"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Day Saturday</label>
                          <CInput
                            v-model="resources.selfstoragestep2.daysaturday"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Day sunday</label>
                          <CInput
                            v-model="resources.selfstoragestep2.daysunday"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Btn select</label>
                          <CInput
                            v-model="resources.selfstoragestep2.btnselect"
                          />
                        </CCol>
                      </CRow>
                    </CCardBody>
                  </CCollapse>
                </div>
              </CCard>
              <CCard class="mb-0">
                <CButton
                  block
                  color="link"
                  class="text-left shadow-none card-header"
                  @click="accordion = accordion === 13 ? false : 13"
                >
                  <h5 class="m-0">Self Storage step2 Storedetail</h5>
                </CButton>
                <div v-if="resources != null">
                  <CCollapse :show="accordion === 13">
                    <CCardBody>
                      <CRow>
                        <CCol sm="6">
                          <label>Self storage heading</label>
                          <CInput
                            v-model="
                              resources.selfstoragestep2storedetail.selfstorage
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Address</label>
                          <CInput
                            v-model="
                              resources.selfstoragestep2storedetail.address
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Tel</label>
                          <CInput
                            v-model="resources.selfstoragestep2storedetail.tel"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Directline</label>
                          <CInput
                            v-model="
                              resources.selfstoragestep2storedetail.directline
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Whatspp</label>
                          <CInput
                            v-model="
                              resources.selfstoragestep2storedetail.whatspp
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Email</label>
                          <CInput
                            v-model="
                              resources.selfstoragestep2storedetail.email
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Store Office hours</label>
                          <CInput
                            v-model="
                              resources.selfstoragestep2storedetail
                                .storeofficehours
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Store Office hours value</label>
                          <CInput
                            v-model="
                              resources.selfstoragestep2storedetail
                                .storeofficehoursvalue
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Usable area</label>
                          <CInput
                            v-model="
                              resources.selfstoragestep2storedetail.usablearea
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Width depth</label>
                          <CInput
                            v-model="
                              resources.selfstoragestep2storedetail.widthdepth
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Standard rate</label>
                          <CInput
                            v-model="
                              resources.selfstoragestep2storedetail.standardrate
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Months</label>
                          <CInput
                            v-model="
                              resources.selfstoragestep2storedetail.months
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Off</label>
                          <CInput
                            v-model="resources.selfstoragestep2storedetail.off"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Remark</label>
                          <CInput
                            v-model="
                              resources.selfstoragestep2storedetail.remark
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Opening hours</label>
                          <CInput
                            v-model="
                              resources.selfstoragestep2storedetail.openinghours
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Opening hours text</label>
                          <CInput
                            v-model="
                              resources.selfstoragestep2storedetail
                                .openinghourstext
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Office hours</label>
                          <CInput
                            v-model="
                              resources.selfstoragestep2storedetail.officehours
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Office hours mon to fri</label>
                          <CInput
                            v-model="
                              resources.selfstoragestep2storedetail
                                .officehoursmontofri
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Office hours sat</label>
                          <CInput
                            v-model="
                              resources.selfstoragestep2storedetail
                                .officehourssat
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Office hours sun</label>
                          <CInput
                            v-model="
                              resources.selfstoragestep2storedetail
                                .officehourssun
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Btn sqft</label>
                          <CInput
                            v-model="
                              resources.selfstoragestep2storedetail.btnsqft
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Btn month</label>
                          <CInput
                            v-model="
                              resources.selfstoragestep2storedetail.btnmonth
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Price</label>
                          <CInput
                            v-model="
                              resources.selfstoragestep2storedetail.price
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Btn booknow</label>
                          <CInput
                            v-model="
                              resources.selfstoragestep2storedetail.btnbooknow
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Register Online</label>
                          <CInput
                            v-model="
                              resources.selfstoragestep2storedetail.registeronline
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>We shall contact you shortly</label>
                          <CInput
                            v-model="
                              resources.selfstoragestep2storedetail.weshallcontactyoushortly
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Label region</label>
                          <CInput
                            v-model="
                              resources.selfstoragestep2storedetail.labelregion
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Region placeholder</label>
                          <CInput
                            v-model="
                              resources.selfstoragestep2storedetail.regionplaceholder
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Label your name</label>
                          <CInput
                            v-model="
                              resources.selfstoragestep2storedetail.labelyourname
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Your name placeholder</label>
                          <CInput
                            v-model="
                              resources.selfstoragestep2storedetail.yournameplaceholder
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Label contact phone</label>
                          <CInput
                            v-model="
                              resources.selfstoragestep2storedetail.labelcontactphone
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Contact phone placeholder</label>
                          <CInput
                            v-model="
                              resources.selfstoragestep2storedetail.contactphoneplaceholder
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Label email</label>
                          <CInput
                            v-model="
                              resources.selfstoragestep2storedetail.labelemail
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Email placeholder</label>
                          <CInput
                            v-model="
                              resources.selfstoragestep2storedetail.emailplaceholder
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Label verification code</label>
                          <CInput
                            v-model="
                              resources.selfstoragestep2storedetail.labelverificationcode
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Verification code placeholder</label>
                          <CInput
                            v-model="
                              resources.selfstoragestep2storedetail.verificationcodeplaceholder
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Label content</label>
                          <CInput
                            v-model="
                              resources.selfstoragestep2storedetail.labelcontent
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Content placeholder</label>
                          <CInput
                            v-model="
                              resources.selfstoragestep2storedetail.contentplaceholder
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Btn send</label>
                          <CInput
                            v-model="
                              resources.selfstoragestep2storedetail.btnsend
                            "
                          />
                        </CCol>
                      </CRow>
                    </CCardBody>
                  </CCollapse>
                </div>
              </CCard>
              <CCard class="mb-0">
                <CButton
                  block
                  color="link"
                  class="text-left shadow-none card-header"
                  @click="accordion = accordion === 14 ? false : 14"
                >
                  <h5 class="m-0">Self Storage step2 Booking</h5>
                </CButton>
                <div v-if="resources != null">
                  <CCollapse :show="accordion === 14">
                    <CCardBody>
                      <CRow>
                        <CCol sm="6">
                          <label>Booking schedule heading</label>
                          <CInput
                            v-model="
                              resources.selfstoragestep2booking.bookingschedule
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Create/Login</label>
                          <CInput
                            v-model="
                              resources.selfstoragestep2booking.createlogin
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Email placeholder</label>
                          <CInput
                            v-model="
                              resources.selfstoragestep2booking.emailplaceholder
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Personal detail</label>
                          <CInput
                            v-model="
                              resources.selfstoragestep2booking.personaldetail
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Firstname placeholder</label>
                          <CInput
                            v-model="
                              resources.selfstoragestep2booking
                                .firstnameplaceholder
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Lastname placeholder</label>
                          <CInput
                            v-model="
                              resources.selfstoragestep2booking
                                .lastnameplaceholder
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Phonenumber placeholder</label>
                          <CInput
                            v-model="
                              resources.selfstoragestep2booking
                                .phonenumberplaceholder
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Appoinment</label>
                          <CInput
                            v-model="
                              resources.selfstoragestep2booking.appoinment
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Label start time</label>
                          <CInput
                            v-model="
                              resources.selfstoragestep2booking.labelstarttime
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Label end time</label>
                          <CInput
                            v-model="
                              resources.selfstoragestep2booking.labelendtime
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Order</label>
                          <CInput
                            v-model="resources.selfstoragestep2booking.order"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Order edit</label>
                          <CInput
                            v-model="
                              resources.selfstoragestep2booking.orderedit
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Btn sqft</label>
                          <CInput
                            v-model="resources.selfstoragestep2booking.btnsqft"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Btn months</label>
                          <CInput
                            v-model="
                              resources.selfstoragestep2booking.btnmonths
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Btn total</label>
                          <CInput
                            v-model="resources.selfstoragestep2booking.btntotal"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Btn confirm</label>
                          <CInput
                            v-model="
                              resources.selfstoragestep2booking.btnconfirm
                            "
                          />
                        </CCol>
                      </CRow>
                    </CCardBody>
                  </CCollapse>
                </div>
              </CCard>
              <CCard class="mb-0">
                <CButton
                  block
                  color="link"
                  class="text-left shadow-none card-header"
                  @click="accordion = accordion === 15 ? false : 15"
                >
                  <h5 class="m-0">Self Storage step3 Payment</h5>
                </CButton>
                <div v-if="resources != null">
                  <CCollapse :show="accordion === 15">
                    <CCardBody>
                      <CRow>
                        <CCol sm="6">
                          <label>Payment heading</label>
                          <CInput
                            v-model="
                              resources.selfstoragestep3payment.paymentheading
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Billing info</label>
                          <CInput
                            v-model="
                              resources.selfstoragestep3payment.billinginfo
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Firstname placeholder</label>
                          <CInput
                            v-model="
                              resources.selfstoragestep3payment
                                .firstnameplaceholder
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Lastname placeholder</label>
                          <CInput
                            v-model="
                              resources.selfstoragestep3payment
                                .lastnameplaceholder
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Number placeholder</label>
                          <CInput
                            v-model="
                              resources.selfstoragestep3payment
                                .numberplaceholder
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Card number</label>
                          <CInput
                            v-model="
                              resources.selfstoragestep3payment.billingaddress
                            "
                            v-show="false"
                          /><CInput
                            v-model="
                              resources.selfstoragestep3payment.carddetail
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Address placeholder</label>
                          <CInput
                            v-model="
                              resources.selfstoragestep3payment
                                .addressplaceholder
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Region placeholder</label>
                          <CInput
                            v-model="
                              resources.selfstoragestep3payment
                                .regionplaceholder
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Order</label>
                          <CInput
                            v-model="resources.selfstoragestep3payment.order"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Order edit</label>
                          <CInput
                            v-model="
                              resources.selfstoragestep3payment.orderedit
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Btn sqft</label>
                          <CInput
                            v-model="resources.selfstoragestep3payment.btnsqft"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Btn months</label>
                          <CInput
                            v-model="
                              resources.selfstoragestep3payment.btnmonths
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Btn total</label>
                          <CInput
                            v-model="resources.selfstoragestep3payment.btntotal"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Appoinment</label>
                          <CInput
                            v-model="
                              resources.selfstoragestep3payment.appoinment
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Appoinment edit</label>
                          <CInput
                            v-model="
                              resources.selfstoragestep3payment.appoinmentedit
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Appoinment date</label>
                          <CInput
                            v-model="
                              resources.selfstoragestep3payment.appoinmentdate
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Appoinment address</label>
                          <CInput
                            v-model="
                              resources.selfstoragestep3payment
                                .appoinmentaddress
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Btn confirm</label>
                          <CInput
                            v-model="
                              resources.selfstoragestep3payment.btnconfirm
                            "
                          />
                        </CCol>
                      </CRow>
                    </CCardBody>
                  </CCollapse>
                </div>
              </CCard>
              <CCard class="mb-0">
                <CButton
                  block
                  color="link"
                  class="text-left shadow-none card-header"
                  @click="accordion = accordion === 16 ? false : 16"
                >
                  <h5 class="m-0">Thank You</h5>
                </CButton>
                <div v-if="resources != null">
                  <CCollapse :show="accordion === 16">
                    <CCardBody>
                      <CRow>
                        <CCol sm="6">
                          <label>Thankyou heading</label>
                          <CInput
                            v-model="resources.thankyou.thankyouheading"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Your order</label>
                          <CInput v-model="resources.thankyou.yourorder" />
                        </CCol>
                        <CCol sm="6">
                          <label>Has been received</label>
                          <CInput
                            v-model="resources.thankyou.hasbeenreceived"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Btn back to home</label>
                          <CInput v-model="resources.thankyou.btnbacktohome" />
                        </CCol>
                      </CRow>
                    </CCardBody>
                  </CCollapse>
                </div>
              </CCard>
              <CCard class="mb-0">
                <CButton
                  block
                  color="link"
                  class="text-left shadow-none card-header"
                  @click="accordion = accordion === 17 ? false : 17"
                >
                  <h5 class="m-0">Box Storage step2</h5>
                </CButton>
                <div v-if="resources != null">
                  <CCollapse :show="accordion === 17">
                    <CCardBody>
                      <CRow>
                        <CCol sm="6">
                          <label>Storage Box heading</label>
                          <CInput v-model="resources.boxstoragestep2.heading" />
                        </CCol>
                        <CCol sm="6">
                          <label>Viewmore</label>
                          <CInput
                            v-model="resources.boxstoragestep2.viewmore"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Box/month</label>
                          <CInput
                            v-model="resources.boxstoragestep2.boxmonth"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Btn total</label>
                          <CInput
                            v-model="resources.boxstoragestep2.btntotal"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Btn confirm</label>
                          <CInput
                            v-model="resources.boxstoragestep2.btnconfirm"
                          />
                        </CCol>
                      </CRow>
                    </CCardBody>
                  </CCollapse>
                </div>
              </CCard>
              <CCard class="mb-0">
                <CButton
                  block
                  color="link"
                  class="text-left shadow-none card-header"
                  @click="accordion = accordion === 18 ? false : 18"
                >
                  <h5 class="m-0">Box Storage step2 Booking</h5>
                </CButton>
                <div v-if="resources != null">
                  <CCollapse :show="accordion === 18">
                    <CCardBody>
                      <CRow>
                        <CCol sm="6">
                          <label>Booking schedule heading</label>
                          <CInput
                            v-model="
                              resources.boxstoragestep2booking.bookingschedule
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Create/Login</label>
                          <CInput
                            v-model="
                              resources.boxstoragestep2booking.createlogin
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Email placeholder</label>
                          <CInput
                            v-model="
                              resources.boxstoragestep2booking.emailplaceholder
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Personal detail</label>
                          <CInput
                            v-model="
                              resources.boxstoragestep2booking.personaldetail
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Firstname placeholder</label>
                          <CInput
                            v-model="
                              resources.boxstoragestep2booking
                                .firstnameplaceholder
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Lastname placeholder</label>
                          <CInput
                            v-model="
                              resources.boxstoragestep2booking
                                .lastnameplaceholder
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Phonenumber placeholder</label>
                          <CInput
                            v-model="
                              resources.boxstoragestep2booking
                                .phonenumberplaceholder
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Appoinment address</label>
                          <CInput
                            v-model="
                              resources.boxstoragestep2booking.appoinmentaddress
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Address placeholder</label>
                          <CInput
                            v-model="
                              resources.boxstoragestep2booking
                                .addressplaceholder
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Region placeholder</label>
                          <CInput
                            v-model="
                              resources.boxstoragestep2booking.regionplaceholder
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Walkup placeholder</label>
                          <CInput
                            v-model="
                              resources.boxstoragestep2booking.walkupplaceholder
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Remark placeholder</label>
                          <CInput
                            v-model="
                              resources.boxstoragestep2booking.remarkplaceholder
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Walkup btn yes</label>
                          <CInput
                            v-model="
                              resources.boxstoragestep2booking.walkupbtnyes
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Walkup btn no</label>
                          <CInput
                            v-model="
                              resources.boxstoragestep2booking.walkupbtnno
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Delivery appoinment</label>
                          <CInput
                            v-model="
                              resources.boxstoragestep2booking
                                .deliveryappoinment
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Start time label</label>
                          <CInput
                            v-model="
                              resources.boxstoragestep2booking.starttimelabel
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>End time label</label>
                          <CInput
                            v-model="
                              resources.boxstoragestep2booking.endtimelabel
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Order</label>
                          <CInput
                            v-model="resources.boxstoragestep2booking.order"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Order edit</label>
                          <CInput
                            v-model="resources.boxstoragestep2booking.orderedit"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Btn total</label>
                          <CInput
                            v-model="resources.boxstoragestep2booking.btntotal"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Btn confirm</label>
                          <CInput
                            v-model="
                              resources.boxstoragestep2booking.btnconfirm
                            "
                          />
                        </CCol>
                      </CRow>
                    </CCardBody>
                  </CCollapse>
                </div>
              </CCard>
              <CCard class="mb-0">
                <CButton
                  block
                  color="link"
                  class="text-left shadow-none card-header"
                  @click="accordion = accordion === 19 ? false : 19"
                >
                  <h5 class="m-0">Box Storage step3 Payment</h5>
                </CButton>
                <div v-if="resources != null">
                  <CCollapse :show="accordion === 19">
                    <CCardBody>
                      <CRow>
                        <CCol sm="6">
                          <label>Payment heading</label>
                          <CInput
                            v-model="
                              resources.boxstoragestep3payment.paymentheading
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Biiling info</label>
                          <CInput
                            v-model="
                              resources.boxstoragestep3payment.biilinginfo
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Firstname placeholder</label>
                          <CInput
                            v-model="
                              resources.boxstoragestep3payment
                                .firstnameplaceholder
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Lastname placeholder</label>
                          <CInput
                            v-model="
                              resources.boxstoragestep3payment
                                .lastnameplaceholder
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Phonenumber placeholder</label>
                          <CInput
                            v-model="
                              resources.boxstoragestep3payment
                                .phonenumberplaceholder
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Card number</label>
                          <CInput
                            v-model="
                              resources.boxstoragestep3payment.biilingaddress
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Address placeholder</label>
                          <CInput
                            v-model="
                              resources.boxstoragestep3payment
                                .addressplaceholder
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Region placeholder</label>
                          <CInput
                            v-model="
                              resources.boxstoragestep3payment.regionplaceholder
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Order</label>
                          <CInput
                            v-model="resources.boxstoragestep3payment.order"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Order edit</label>
                          <CInput
                            v-model="resources.boxstoragestep3payment.orderedit"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Btn total</label>
                          <CInput
                            v-model="resources.boxstoragestep3payment.btntotal"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Appoinment</label>
                          <CInput
                            v-model="
                              resources.boxstoragestep3payment.appoinment
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Appoinment edit</label>
                          <CInput
                            v-model="
                              resources.boxstoragestep3payment.appoinmentedit
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Appoinment date</label>
                          <CInput
                            v-model="
                              resources.boxstoragestep3payment.appoinmentdate
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Appoinment address</label>
                          <CInput
                            v-model="
                              resources.boxstoragestep3payment.appoinmentaddress
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Btn confirm</label>
                          <CInput
                            v-model="
                              resources.boxstoragestep3payment.btnconfirm
                            "
                          />
                        </CCol>
                      </CRow>
                    </CCardBody>
                  </CCollapse>
                </div>
              </CCard>
              <CCard class="mb-0">
                <CButton
                  block
                  color="link"
                  class="text-left shadow-none card-header"
                  @click="accordion = accordion === 20 ? false : 20"
                >
                  <h5 class="m-0">User Info</h5>
                </CButton>
                <div v-if="resources != null">
                  <CCollapse :show="accordion === 20">
                    <CCardBody>
                      <CRow>
                        <CCol sm="6">
                          <label>Userinfo</label>
                          <CInput v-model="resources.userinfo.userinfo" />
                        </CCol>
                        <CCol sm="6">
                          <label>My box</label>
                          <CInput v-model="resources.userinfo.mybox" />
                        </CCol>
                        <CCol sm="6">
                          <label>My storage</label>
                          <CInput v-model="resources.userinfo.mystorage" />
                        </CCol>
                        <CCol sm="6">
                          <label>Order record</label>
                          <CInput v-model="resources.userinfo.orderrecord" />
                        </CCol>
                        <CCol sm="6">
                          <label>Logout</label>
                          <CInput v-model="resources.userinfo.logout" />
                        </CCol>
                      </CRow>
                    </CCardBody>
                  </CCollapse>
                </div>
              </CCard>
              <CCard class="mb-0">
                <CButton
                  block
                  color="link"
                  class="text-left shadow-none card-header"
                  @click="accordion = accordion === 21 ? false : 21"
                >
                  <h5 class="m-0">Update Info</h5>
                </CButton>
                <div v-if="resources != null">
                  <CCollapse :show="accordion === 21">
                    <CCardBody>
                      <CRow>
                        <CCol sm="6">
                          <label>Info</label>
                          <CInput v-model="resources.updateinfo.info" />
                        </CCol>
                        <CCol sm="6">
                          <label>Email placeholder</label>
                          <CInput
                            v-model="resources.updateinfo.emailplaceholder"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Firstname placeholder</label>
                          <CInput
                            v-model="resources.updateinfo.firstnameplaceholder"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Lastname placeholder</label>
                          <CInput
                            v-model="resources.updateinfo.lastnameplaceholder"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Address placeholder</label>
                          <CInput
                            v-model="resources.updateinfo.addressplaceholder"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Region placeholder</label>
                          <CInput
                            v-model="resources.updateinfo.regionplaceholder"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Btn update</label>
                          <CInput v-model="resources.updateinfo.btnupdate" />
                        </CCol>
                         <CCol sm="6">
                          <label>Billing address</label>
                          <CInput v-model="resources.updateinfo.billingaddress" />
                        </CCol>
                      </CRow>
                    </CCardBody>
                  </CCollapse>
                </div>
              </CCard>
              <CCard class="mb-0">
                <CButton
                  block
                  color="link"
                  class="text-left shadow-none card-header"
                  @click="accordion = accordion === 22 ? false : 22"
                >
                  <h5 class="m-0">Update Password</h5>
                </CButton>
                <div v-if="resources != null">
                  <CCollapse :show="accordion === 22">
                    <CCardBody>
                      <CRow>
                        <CCol sm="6">
                          <label>Update password</label>
                          <CInput
                            v-model="resources.updatepassword.updatepassword"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Old password placeholder</label>
                          <CInput
                            v-model="
                              resources.updatepassword.oldpasswordplaceholder
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>New password placeholder</label>
                          <CInput
                            v-model="
                              resources.updatepassword.newpasswordplaceholder
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Confirm new password placeholder</label>
                          <CInput
                            v-model="
                              resources.updatepassword
                                .confirmnewpasswordplaceholder
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Btn submit</label>
                          <CInput
                            v-model="resources.updatepassword.btnsubmit"
                          />
                        </CCol>
                      </CRow>
                    </CCardBody>
                  </CCollapse>
                </div>
              </CCard>
              <CCard class="mb-0">
                <CButton
                  block
                  color="link"
                  class="text-left shadow-none card-header"
                  @click="accordion = accordion === 23 ? false : 23"
                >
                  <h5 class="m-0">Box</h5>
                </CButton>
                <div v-if="resources != null">
                  <CCollapse :show="accordion === 23">
                    <CCardBody>
                      <CRow>
                        <CCol sm="6">
                          <label>My box</label>
                          <CInput v-model="resources.box.mybox" />
                        </CCol>
                        <CCol sm="6">
                          <label>Need more</label>
                          <CInput v-model="resources.box.needmore" />
                        </CCol>
                        <CCol sm="6">
                          <label>Payment date</label>
                          <CInput v-model="resources.box.paymentdate" />
                        </CCol>
                        <CCol sm="6">
                          <label>Payment id</label>
                          <CInput v-model="resources.box.paymentid" />
                        </CCol>
                        <CCol sm="6">
                          <label>Total boxes</label>
                          <CInput v-model="resources.box.totalboxes" />
                        </CCol>
                        <CCol sm="6">
                          <label>Total charges</label>
                          <CInput v-model="resources.box.totalcharges" />
                        </CCol>
                        <CCol sm="6">
                          <label>Appointment date</label>
                          <CInput v-model="resources.box.appointmentdate" />
                        </CCol>
                        <CCol sm="6">
                          <label>Appointment time</label>
                          <CInput v-model="resources.box.appointmenttime" />
                        </CCol>
                        <CCol sm="6">
                          <label>Action</label>
                          <CInput v-model="resources.box.action" />
                        </CCol>
                        <CCol sm="6">
                          <label>Show details</label>
                          <CInput v-model="resources.box.showdetails" />
                        </CCol>
                        <CCol sm="6">
                          <label>Change photo</label>
                          <CInput v-model="resources.box.changephoto" />
                        </CCol>
                        <CCol sm="6">
                          <label>Detail box type</label>
                          <CInput v-model="resources.box.detailboxtype" />
                        </CCol>
                        <CCol sm="6">
                          <label>Detail no of boxes</label>
                          <CInput v-model="resources.box.detailnoofboxes" />
                        </CCol>
                        <CCol sm="6">
                          <label>Detail charges</label>
                          <CInput v-model="resources.box.detailcharges" />
                        </CCol>
                        <CCol sm="6">
                          <label>Detail box numbers</label>
                          <CInput v-model="resources.box.detailboxnumber" />
                        </CCol>
                        <CCol sm="6">
                          <label>Modal change photo</label>
                          <CInput v-model="resources.box.modalchangephoto" />
                        </CCol>
                        <CCol sm="6">
                          <label>Modal drag images</label>
                          <CInput v-model="resources.box.modaldragimages" />
                        </CCol>
                        <CCol sm="6">
                          <label>Modal select</label>
                          <CInput v-model="resources.box.modalselect" />
                        </CCol>
                        <CCol sm="6">
                          <label>Modal btn upload</label>
                          <CInput v-model="resources.box.modalbtnupload" />
                        </CCol>
                      </CRow>
                    </CCardBody>
                  </CCollapse>
                </div>
              </CCard>
              <CCard class="mb-0">
                <CButton
                  block
                  color="link"
                  class="text-left shadow-none card-header"
                  @click="accordion = accordion === 24 ? false : 24"
                >
                  <h5 class="m-0">Storage</h5>
                </CButton>
                <div v-if="resources != null">
                  <CCollapse :show="accordion === 24">
                    <CCardBody>
                      <CRow>
                        <CCol sm="6">
                          <label>My Storage</label>
                          <CInput v-model="resources.storage.mystorage" />
                        </CCol>
                        <CCol sm="6">
                          <label>Need more</label>
                          <CInput v-model="resources.storage.needmore" />
                        </CCol>
                        <CCol sm="6">
                          <label>Store name</label>
                          <CInput v-model="resources.storage.storename" />
                        </CCol>
                        <CCol sm="6">
                          <label>Location</label>
                          <CInput v-model="resources.storage.location" />
                        </CCol>
                        <CCol sm="6">
                          <label>Area</label>
                          <CInput v-model="resources.storage.area" />
                        </CCol>
                        <CCol sm="6">
                          <label>Duration</label>
                          <CInput v-model="resources.storage.duration" />
                        </CCol>
                        <CCol sm="6">
                          <label>Payment id</label>
                          <CInput v-model="resources.storage.paymentid" />
                        </CCol>
                        <CCol sm="6">
                          <label>Payment date</label>
                          <CInput v-model="resources.storage.paymentdate" />
                        </CCol>
                        <CCol sm="6">
                          <label>Charges</label>
                          <CInput v-model="resources.storage.charges" />
                        </CCol>
                        <CCol sm="6">
                          <label>Action</label>
                          <CInput v-model="resources.storage.action" />
                        </CCol>
                        <CCol sm="6">
                          <label>Renew</label>
                          <CInput v-model="resources.storage.renew" />
                        </CCol>
                        <CCol sm="6">
                          <label>Change photo</label>
                          <CInput v-model="resources.storage.changephoto" />
                        </CCol>
                        <CCol sm="6">
                          <label>Modal change photo</label>
                          <CInput
                            v-model="resources.storage.modalchangephoto"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Modal drag images</label>
                          <CInput v-model="resources.storage.modaldragimages" />
                        </CCol>
                        <CCol sm="6">
                          <label>Modal select</label>
                          <CInput v-model="resources.storage.modalselect" />
                        </CCol>
                        <CCol sm="6">
                          <label>Modal btn upload</label>
                          <CInput v-model="resources.storage.modalbtnupload" />
                        </CCol>
                      </CRow>
                    </CCardBody>
                  </CCollapse>
                </div>
              </CCard>
              <CCard class="mb-0">
                <CButton
                  block
                  color="link"
                  class="text-left shadow-none card-header"
                  @click="accordion = accordion === 25 ? false : 25"
                >
                  <h5 class="m-0">Order Record</h5>
                </CButton>
                <div v-if="resources != null">
                  <CCollapse :show="accordion === 25">
                    <CCardBody>
                      <CRow>
                        <CCol sm="6">
                          <label>Order record</label>
                          <CInput v-model="resources.orderrecord.orderrecord" />
                        </CCol>
                        <CCol sm="6">
                          <label>Type</label>
                          <CInput v-model="resources.orderrecord.type" />
                        </CCol>
                        <CCol sm="6">
                          <label>Item</label>
                          <CInput v-model="resources.orderrecord.item" />
                        </CCol>
                        <CCol sm="6">
                          <label>Order id</label>
                          <CInput v-model="resources.orderrecord.orderid" />
                        </CCol>
                        <CCol sm="6">
                          <label>Date</label>
                          <CInput v-model="resources.orderrecord.date" />
                        </CCol>
                        <CCol sm="6">
                          <label>Price</label>
                          <CInput v-model="resources.orderrecord.price" />
                        </CCol>
                        <CCol sm="6">
                          <label>Selfstorage sqft</label>
                          <CInput
                            v-model="resources.orderrecord.selfstoragesqft"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Selfstorage month</label>
                          <CInput
                            v-model="resources.orderrecord.selfstoragemonth"
                          />
                        </CCol>
                      </CRow>
                    </CCardBody>
                  </CCollapse>
                </div>
              </CCard>
              <CCard class="mb-0">
                <CButton
                  block
                  color="link"
                  class="text-left shadow-none card-header"
                  @click="accordion = accordion === 26 ? false : 26"
                >
                  <h5 class="m-0">Login</h5>
                </CButton>
                <div v-if="resources != null">
                  <CCollapse :show="accordion === 26">
                    <CCardBody>
                      <CRow>
                        <CCol sm="6">
                          <label>Label email</label>
                          <CInput v-model="resources.loginmodal.labelemail" />
                        </CCol>
                        <CCol sm="6">
                          <label>Label email placeholder</label>
                          <CInput
                            v-model="resources.loginmodal.labelemailplaceholder"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Label password</label>
                          <CInput
                            v-model="resources.loginmodal.labelpassword"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Label password placeholder</label>
                          <CInput
                            v-model="
                              resources.loginmodal.labelpasswordplaceholder
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Forgot password</label>
                          <CInput
                            v-model="resources.loginmodal.forgotpassword"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Not member yet register one</label>
                          <CInput
                            v-model="
                              resources.loginmodal.notmemberyetregisterone
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Btn login</label>
                          <CInput v-model="resources.loginmodal.loginbtn" />
                        </CCol>
                      </CRow>
                    </CCardBody>
                  </CCollapse>
                </div>
              </CCard>
              <CCard class="mb-0">
                <CButton
                  block
                  color="link"
                  class="text-left shadow-none card-header"
                  @click="accordion = accordion === 27 ? false : 27"
                >
                  <h5 class="m-0">Register</h5>
                </CButton>
                <div v-if="resources != null">
                  <CCollapse :show="accordion === 27">
                    <CCardBody>
                      <CRow>
                        <CCol sm="6">
                          <label>Label email</label>
                          <CInput
                            v-model="resources.registermodal.labelemail"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Label email placeholder</label>
                          <CInput
                            v-model="
                              resources.registermodal.labelemailplaceholder
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Label firstname</label>
                          <CInput
                            v-model="resources.registermodal.labelfirstname"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Label firstname placeholder</label>
                          <CInput
                            v-model="
                              resources.registermodal.labelfirstnameplaceholder
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Label lastname</label>
                          <CInput
                            v-model="resources.registermodal.labellastname"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>label lastname placeholder</label>
                          <CInput
                            v-model="
                              resources.registermodal.labellastnameplaceholder
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Label password</label>
                          <CInput
                            v-model="resources.registermodal.labelpassword"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Label password placeholder</label>
                          <CInput
                            v-model="
                              resources.registermodal.labelpasswordplaceholder
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Label confirm password</label>
                          <CInput
                            v-model="
                              resources.registermodal.labelconfirmpassword
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Label confirm password placeholder</label>
                          <CInput
                            v-model="
                              resources.registermodal
                                .labelconfirmpasswordplaceholder
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Btn register</label>
                          <CInput
                            v-model="resources.registermodal.registerbtn"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Already member login here</label>
                          <CInput
                            v-model="
                              resources.registermodal.alreadymemberloginhere
                            "
                          />
                        </CCol>
                      </CRow>
                    </CCardBody>
                  </CCollapse>
                </div>
              </CCard>
              <CCard class="mb-0">
                <CButton
                  block
                  color="link"
                  class="text-left shadow-none card-header"
                  @click="accordion = accordion === 28 ? false : 28"
                >
                  <h5 class="m-0">Forgot Password</h5>
                </CButton>
                <div v-if="resources != null">
                  <CCollapse :show="accordion === 28">
                    <CCardBody>
                      <CRow>
                        <CCol sm="6">
                          <label>Label email</label>
                          <CInput
                            v-model="resources.forgotpasswordmodal.labelemail"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Label email placeholder</label>
                          <CInput
                            v-model="
                              resources.forgotpasswordmodal
                                .labelemailplaceholder
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Btn submit</label>
                          <CInput
                            v-model="resources.forgotpasswordmodal.btnsubmit"
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Back to login</label>
                          <CInput
                            v-model="resources.forgotpasswordmodal.backtologin"
                          />
                        </CCol>
                      </CRow>
                    </CCardBody>
                  </CCollapse>
                </div>
              </CCard>
              <CCard class="mb-0">
                <CButton
                  block
                  color="link"
                  class="text-left shadow-none card-header"
                  @click="accordion = accordion === 29 ? false : 29"
                >
                  <h5 class="m-0">Change Password</h5>
                </CButton>
                <div v-if="resources != null">
                  <CCollapse :show="accordion === 29">
                    <CCardBody>
                      <CRow>
                        <CCol sm="6">
                          <label>Label verification code</label>
                          <CInput
                            v-model="
                              resources.changepasswordmodal
                                .labelverificationcode
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>label verification code placeholder</label>
                          <CInput
                            v-model="
                              resources.changepasswordmodal
                                .labelverificationcodeplaceholder
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Label new password</label>
                          <CInput
                            v-model="
                              resources.changepasswordmodal.labelnewpassword
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Label new password placeholder</label>
                          <CInput
                            v-model="
                              resources.changepasswordmodal
                                .labelnewpasswordplaceholder
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Label confirm password</label>
                          <CInput
                            v-model="
                              resources.changepasswordmodal.labelconfirmpassword
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Label confirm password placeholder</label>
                          <CInput
                            v-model="
                              resources.changepasswordmodal
                                .labelconfirmpasswordplaceholder
                            "
                          />
                        </CCol>
                        <CCol sm="6">
                          <label>Btn submit</label>
                          <CInput
                            v-model="resources.changepasswordmodal.btnsubmit"
                          />
                        </CCol>
                      </CRow>
                    </CCardBody>
                  </CCollapse>
                </div>
              </CCard>
            </div>
          </CCardBody>
          <CCardFooter>
            <CRow class="col-12">
              <CButton
                type="submit"
                class="float-right mr-1"
                style="margin-bottom:20px;"
                color="primary"
                >Save</CButton
              >
            </CRow>
          </CCardFooter>
        </CForm>
      </CCard>
    </CCol>
  </div>
</template>

<script>
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import APIService from "@/services/api.service.js";

export default {
  components: {
    vSelect,
  },
  created() {
    this.getLanguage("chinese");
    document.title = this.$store.state.projecttitle + " - Resources";
  },
  data() {
    return {
      accordion: 0,
      language: "chinese",
      optionResource: ["chinese", "english"],
      resources: null,
    };
  },
  methods: {
    handleSubmit() {
      var modeldata = {
        language: this.language,
        resourcedata: this.resources,
      };
      APIService.post("/SubmitResource", modeldata).then(() => {
        this.$successAlert("Resources Updated Successfully!!!.");
        this.getLanguage(this.language);
      });
    },
    getLanguage(lang) {
      APIService.post("/GetLanguage", null, lang, false).then(
        ((response) => {
          this.resources = response.data;
        }).bind(this)
      );
    },
  },
};
</script>
