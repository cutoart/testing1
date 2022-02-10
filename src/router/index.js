import Vue from 'vue';
import Router from 'vue-router';
import store from '../store';

Vue.use(Router)
//const TheContainer = () => import("../admin/containers/TheContainer")
const Login = () =>
    import('@/admin/views/Login')
const BranchList = () =>
    import('@/admin/views/Branch/BranchList')
const Branch = () =>
    import('@/admin/views/Branch/Branch')
const About = () =>
    import('@/admin/views/AboutUs')
const ChangePasswordAdmin = () =>
    import('@/admin/views/ChangePassword')
const ChangePassword = () =>
    import('@/admin/views/EmailTemplates/ChangePasswordHtml')
const SelfStorageOrderConfirmationTemplate = () =>
    import('@/admin/views/EmailTemplates/SelfStorageOrderConfirmation')
const BoxStorageOrderConfirmationTemplate = () =>
    import('@/admin/views/EmailTemplates/BoxStorageOrderConfirmation')
const SelfStorageOrderreceivedTemplate = () =>
    import('@/admin/views/EmailTemplates/SelfStorageOrderReceived')
const BoxStorageOrderreceivedTemplate = () =>
    import('@/admin/views/EmailTemplates/BoxStorageOrderReceived')
const SelfStorageRefundTemplate = () =>
    import('@/admin/views/EmailTemplates/SelfStorageRefund')
const BoxStorageRefundTemplate = () =>
    import('@/admin/views/EmailTemplates/BoxStorageRefund')
const SelfStorageOnlineRegisterTemplate = () =>
    import('@/admin/views/EmailTemplates/SelfStorageOnlineRegister')
const Banner = () =>
    import('@/admin/views/Banner/AddBanner')
const BannerList = () =>
    import('@/admin/views/Banner/ListBanner')
const RegisterUserList = () =>
    import('@/admin/views/RegisterUser/RegisterUserList')
const RegisterUser = () =>
    import('@/admin/views/RegisterUser/RegisterUser')
const AddUser = () =>
    import('@/admin/views/RegisterUser/AddUser')
const ContractUsList = () =>
    import('@/admin/views/ContactUs')
const Storeview = () =>
    import('@/admin/views/Store/Storeview')
const StoreviewList = () =>
    import('@/admin/views/Store/StoreviewList')
const AdminFAQ = () =>
    import('@/admin/views/FAQ/FAQ')
const AdminFAQList = () =>
    import('@/admin/views/FAQ/FAQList')
const AdminPromotion = () =>
    import('@/admin/views/Promotion/Promotion')
const AdminPromotionList = () =>
    import('@/admin/views/Promotion/PromotionList')
const AdminNewsandActivities = () =>
    import('@/admin/views/NewsandActivities/NewsandActivities')
const AdminNewsandActivitiesList = () =>
    import('@/admin/views/NewsandActivities/NewsandActivitiesList')
const SelfStorageChangesView = () =>
    import('@/admin/views/SelfStorageCharges/SelfStorageCharges')
const SelfStorageChangesListView = () =>
    import('@/admin/views/SelfStorageCharges/SelfStorageChargesList')
const Paymentlist = () =>
    import('@/admin/views/OrderDetail/OrderManagementList')
const GetPaymentDetails = () =>
    import('@/admin/views/OrderDetail/OrderDetails')
const Boxstore = () =>
    import('@/admin/views/BoxStore/Boxstore')
const BoxstoreList = () =>
    import('@/admin/views/BoxStore/BoxstoreList')
const CountryList = () =>
    import('@/admin/views/Country/CountryList')
const Country = () =>
    import('@/admin/views/Country/Country')
const DistrictList = () =>
    import('@/admin/views/District/DistrictList')
const District = () =>
    import('@/admin/views/District/District')
const OnlineRegisterUser = () =>
    import('@/admin/views/OnlineRegisterUser')
const BookAppointmentList = () =>
    import('@/admin/views/BookAppointment/BookAppointmentList')
const BookAppointment = () =>
    import('@/admin/views/BookAppointment/BookAppointment')
const SelfStoragePayment = () =>
    import('@/admin/views/SelfStoragePayment')
const Resources = () =>
    import('@/admin/views/Resources')
const ShippingOrderList = () =>
    import('@/admin/views/ShippingOrder/ShippingOrderList')
const ShippingOrderDetails = () =>
    import('@/admin/views/ShippingOrder/ShippingOrder')
const AdminAddVideoLink = () =>
    import('@/admin/views/Video/AddVideoLink')
const AdminGlobalSettings = () =>
    import('@/admin/views/Settings/GlobalSettings')
const ImageList = () =>
    import('@/admin/views/Image/ImageList')
const AddUpdateImage = () =>
    import('@/admin/views/Image/Image')

const TheUserContainer = () =>
    import("@/users/containers/TheContainer")
const Home = () =>
    import("@/users/views/Home")
const AboutUs = () =>
    import('@/users/views/AboutUs')
const FAQ = () =>
    import('@/users/views/FAQ')
const ContactUs = () =>
    import('@/users/views/ContactUs')
const Promotion = () =>
    import('@/users/views/Promotion')
const NewsandActivities = () =>
    import('@/users/views/NewsandActivities')
const Userinfo = () =>
    import('@/users/views/Usersinformation/Userinfo')
const BoxStorage = () =>
    import('@/users/views/BoxStorage')
const Service = () =>
    import('@/users/views/Service/Service')
const SelfStorage = () =>
    import('@/users/views/SelfStorage')
const SelfStorageStoredetail = () =>
    import("@/users/views/SelfStorageStoredetail")
const SelfStorageStores = () =>
    import("@/users/views/SelfStorageStores")

function configRoutes() {
    return [{
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/admin',
        redirect: '/admin/branchList',
        meta: {
            requiresAuth: true,
        },
        component: () =>
            import("../admin/containers/TheContainer.vue"),
        children: [
            {
                path: '/admin/branchList',
                name: 'Branch',
                component: BranchList,
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: '/admin/changepassword',
                name: 'ChangePassword',
                component: ChangePasswordAdmin,
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: '/admin/addbranch',
                name: 'AddBranch',
                component: Branch,
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: '/admin/editbranch/:id',
                name: 'EditBranch',
                component: Branch,
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: '/admin/about',
                name: 'About Us',
                component: About,
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: '/admin/changepasswordhtml',
                name: 'Change Password Html',
                component: ChangePassword,
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: '/admin/selfstorageorderconfirmation',
                name: 'SelfStorage Order Confirmation',
                component: SelfStorageOrderConfirmationTemplate,
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: '/admin/boxstorageorderconfirmation',
                name: 'BoxStorage Order Confirmation',
                component: BoxStorageOrderConfirmationTemplate,
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: '/admin/selfstorageorderreceived',
                name: 'SelfStorage Order Received',
                component: SelfStorageOrderreceivedTemplate,
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: '/admin/boxstorageorderreceived',
                name: 'BoxStorage Order Received',
                component: BoxStorageOrderreceivedTemplate,
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: '/admin/selfstoragerefund',
                name: 'SelfStorage Refund',
                component: SelfStorageRefundTemplate,
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: '/admin/boxstoragerefund',
                name: 'BoxStorage Refund',
                component: BoxStorageRefundTemplate,
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: '/admin/selfstorageonlineregister',
                name: 'SelfStorage Online Register',
                component: SelfStorageOnlineRegisterTemplate,
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: '/admin/addbanner',
                name: 'AddBanner',
                component: Banner,
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: '/admin/editbanner/:id',
                name: 'EditBanner',
                component: Banner,
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: '/admin/bannerlist',
                name: 'BannerList',
                component: BannerList,
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: '/admin/faqlist',
                name: 'FAQs',
                component: AdminFAQList,
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: '/admin/addVideo',
                name: 'AddVideoLink',
                component: AdminAddVideoLink,
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: '/admin/addfaqlist',
                name: 'AddFAQs',
                component: AdminFAQ,
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: '/admin/editfaqlist/:id',
                name: 'EditFAQs',
                component: AdminFAQ,
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: '/admin/promotionlist',
                name: 'PromotionList',
                component: AdminPromotionList,
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: '/admin/addpromotionlist',
                name: 'AddPromotion',
                component: AdminPromotion,
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: '/admin/editpromotionlist/:id',
                name: 'EditPromotion',
                component: AdminPromotion,
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: '/admin/addstore',
                name: 'AddStore',
                component: Storeview,
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: '/admin/storeList',
                name: 'Store',
                component: StoreviewList,
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: '/admin/editstore/:id',
                name: 'EditStore',
                component: Storeview,
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: '/admin/registerUsers',
                name: 'ListofRegisterUser',
                component: RegisterUserList,
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: '/admin/selfstoragepayment/:id?',
                name: 'SelfStoragePayment',
                component: SelfStoragePayment,
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: '/admin/addUsers',
                name: 'addUser',
                component: AddUser,
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: '/admin/editregisteruser/:id',
                name: 'EditRegisterUser',
                component: RegisterUser,
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: '/admin/contactuslist',
                name: 'ContactUsList',
                component: ContractUsList,
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: '/admin/newsandactivitieslist',
                name: 'NewsandActivitiesList',
                component: AdminNewsandActivitiesList,
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: '/admin/addnewsandactivitieslist',
                name: 'AddNewsandActivities',
                component: AdminNewsandActivities,
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: '/admin/editnewsandactivitieslist/:id',
                name: 'EditNewsandActivities',
                component: AdminNewsandActivities,
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: '/admin/selfstorechargeslist',
                name: 'SelfStoreCharges',
                component: SelfStorageChangesListView,
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: '/admin/addselfstorecharges',
                name: 'AddSelfStoreCharges',
                component: SelfStorageChangesView,
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: '/admin/editselfstorecharges/:id',
                name: 'EditSelfStoreCharges',
                component: SelfStorageChangesView,
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: '/admin/paymentdetaillist',
                name: 'OrderManagementList',
                component: Paymentlist,
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: '/admin/orderdetails/:id',
                name: 'OrderDetails',
                component: GetPaymentDetails,
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: '/admin/boxstorelist',
                name: 'BoxstoreList',
                component: BoxstoreList,
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: '/admin/addboxstore',
                name: 'AddBoxstore',
                component: Boxstore,
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: '/admin/editboxstore/:id',
                name: 'EditBoxstore',
                component: Boxstore,
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: '/admin/countryList',
                name: 'Country',
                component: CountryList,
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: '/admin/addcountry',
                name: 'AddCountry',
                component: Country,
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: '/admin/editcountry/:id',
                name: 'EditCountry',
                component: Country,
                meta: {
                    requiresAuth: true
                },
            },

            {
                path: '/admin/districtList',
                name: 'District',
                component: DistrictList,
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: '/admin/adddistrict',
                name: 'AddDistrict',
                component: District,
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: '/admin/editdistrict/:id',
                name: 'EditDistrict',
                component: District,
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: '/admin/resources',
                name: 'Resources',
                component: Resources,
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: '/admin/onlineregisteruser',
                name: 'OnlineRegisterUserList',
                component: OnlineRegisterUser,
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: '/admin/bookstorage',
                name: 'BookStorage',
                component: BookAppointment,
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: '/admin/bookappointmentList',
                name: 'BookAppointmentList',
                component: BookAppointmentList,
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: '/admin/shippingorder',
                name: 'ShippingOrder',
                component: ShippingOrderList,
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: '/admin/shippingorderdetail/:id',
                name: 'ShippingOrderDetail',
                component: ShippingOrderDetails,
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: '/admin/globalsettings',
                name: 'GlobalSettings',
                component: AdminGlobalSettings,
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: '/admin/imageList',
                name: 'ImageList',
                component: ImageList,
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: '/admin/addimage',
                name: 'AddImage',
                component: AddUpdateImage,
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: '/admin/editimage/:id',
                name: 'EditImage',
                component: AddUpdateImage,
                meta: {
                    requiresAuth: true
                },
            },
        ]
    },
    {
        path: '/',
        redirect: { name: 'Home' },
        component: TheUserContainer,
        children: [{
            path: 'home',
            name: 'Home',
            component: Home,
        },
        {
            path: '/changepassword/:id?',
            name: 'Change Password',
            component: Home,
        },
        {
            path: '/aboutus',
            name: 'AboutUs',
            component: AboutUs,
        },
        {
            path: '/service/:id?',
            name: 'Service',
            component: Service,
        },
        {
            path: '/faq',
            name: 'FAQ',
            component: FAQ
        },
        {
            path: '/contactus',
            name: 'ContactUs',
            component: ContactUs
        },
        {
            path: '/promotion',
            name: 'Promotion',
            component: Promotion
        },
        {
            path: '/selfstorage',
            name: 'SelfStorage',
            component: SelfStorage
        },
        {
            path: "/selfstorage/:id?",
            name: "SelfStorageStoredetail",
            component: SelfStorageStoredetail,
        },
        {
            path: "/selfstoragestores",
            name: "SelfStorageStores",
            component: SelfStorageStores,
        },
        {
            path: '/userinfo',
            name: 'Userinfo',
            component: Userinfo,
            meta: {
                requiresUserAuth: true
            },
        },
        {
            path: '/boxstorage',
            name: 'BoxStorage',
            component: BoxStorage
        },
        {
            path: '/newsandactivities',
            name: 'NewsandActivities',
            component: NewsandActivities
        },
        ]

    },

    ]
}

const router = new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'active',
    scrollBehavior: () => ({ y: 0 }),
    routes: configRoutes(),
})

router.beforeEach((to, from, next) => {
    if (from.name == "Service") {
        window.location.href = to.path;
    } else {
        if (to.matched.some(record => record.meta.requiresAuth)) {
            if (store.getters.isLoggedIn) {
                next()
                return
            }
            next('/login')
        } else if (to.matched.some(record => record.meta.requiresUserAuth)) {
            if (store.getters.isRegLoggedIn) {
                next()
                return
            }
            next('/')
        } else {
            next()
        }
    }
})

export default router