export default [
  {
    _name: "CSidebarNav",
    _children: [
      {
        _name: "CSidebarNavDropdown",
        name: "Store Management",
        icon: "cil-cursor",
        items: [
          {
            _name: "CSidebarNavItem",
            name: "Branch",
            to: { name: "Branch" },
          },
          {
            _name: "CSidebarNavItem",
            name: "Store",
            to: { name: "Store" },
          },
          {
            _name: "CSidebarNavItem",
            name: "Self Store Charges",
            to: { name: "SelfStoreCharges" },
          },
          {
            _name: "CSidebarNavItem",
            name: "Box Store ",
            to: { name: "BoxstoreList" },
          },
        ],
      },
      {
        _name: "CSidebarNavDropdown",
        name: "CMS",
        icon: "cil-star",
        items: [
          {
            _name: "CSidebarNavItem",
            name: "About Us",
            to: { name: "About Us" },
          },
          {
            _name: "CSidebarNavItem",
            name: "FAQs",
            to: { name: "FAQs" },
          },
          {
            _name: "CSidebarNavItem",
            name: "Promotion",
            to: { name: "PromotionList" },
          },
          {
            _name: "CSidebarNavItem",
            name: "News and Activities",
            to: { name: "NewsandActivitiesList" },
          },
        ],
      },
      {
        _name: "CSidebarNavDropdown",
        name: "Master",
        icon: "cil-star",
        items: [
          {
            _name: "CSidebarNavItem",
            name: "Country",
            to: { name: "Country" },
          },
          {
            _name: "CSidebarNavItem",
            name: "District",
            to: { name: "District" },
          },
        ],
      },
      {
        _name: "CSidebarNavItem",
        name: "Register Users",
        to: "/admin/registerusers",
        icon: "cil-user",
      },
      {
        _name: "CSidebarNavItem",
        name: "Appointments",
        to: "/admin/bookappointmentList",
        icon: "cil-user",
      },
      {
        _name: "CSidebarNavItem",
        name: "Contact Us List",
        to: "/admin/contactuslist",
        icon: "cil-cursor",
      },
      {
        _name: "CSidebarNavItem",
        name: "Shipping Order",
        to: "/admin/shippingorder",
        icon: "cil-cursor",
      },
      {
        _name: "CSidebarNavItem",
        name: "Order Management List",
        to: "/admin/paymentdetaillist",
        icon: "cil-cursor",
      },
      {
        _name: "CSidebarNavItem",
        name: "Online Register User List",
        to: "/admin/onlineregisteruser",
        icon: "cil-cursor",
      },
      {
        _name: "CSidebarNavItem",
        name: "Resources",
        to: "/admin/resources",
        icon: "cil-cursor",
      },
      {
        _name: "CSidebarNavDropdown",
        name: "Settings",
        icon: "cilSettings",
        _children: [
          {
            _name: "CSidebarNavDropdown",
            name: "Email Template",
            icon: "cil-mail",
            items: [
              {
                name: "Change Password",
                to: { name: "Change Password Html" },
              },
              {
                name: "SelfStorage Order Confirmation",
                to: { name: "SelfStorage Order Confirmation" },
              },
              {
                name: "BoxStorage Order Confirmation",
                to: { name: "BoxStorage Order Confirmation" },
              },
              {
                name: "SelfStorage Order Received",
                to: { name: "SelfStorage Order Received" },
              },
              {
                name: "BoxStorage Order Received",
                to: { name: "BoxStorage Order Received" },
              },
              {
                name: "SelfStorage Refund",
                to: { name: "SelfStorage Refund" },
              },
              {
                name: "BoxStorage Refund",
                to: { name: "BoxStorage Refund" },
              },
              {
                name: "SelfStorage Online Register",
                to: { name: "SelfStorage Online Register" },
              },
            ],
          },
          {
            _name: "CSidebarNavDropdown",
            name: "Banners",
            icon: "cil-mail",
            items: [
              {
                name: "List Banner",
                to: { name: "BannerList" },
              },
            ],
          },
          {
            _name: "CSidebarNavDropdown",
            name: "Video",
            icon: "cil-mail",
            items: [
              {
                name: "Add Video",
                to: { name: "AddVideoLink" },
              },
            ],
          },
          {
            _name: "CSidebarNavItem",
            name: "Global Settings",
            to: { name: "GlobalSettings" },
          },
          {
            _name: "CSidebarNavItem",
            name: "Images",
            to: { name: "ImageList" },
          },
        ],
      },
    ],
  },
];
