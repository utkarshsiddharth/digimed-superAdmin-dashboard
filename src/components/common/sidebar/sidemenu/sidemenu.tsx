/* eslint-disable linebreak-style */
export const MENUITEMS = [
  {
    menutitle: "DASHBOARD ADMIN",
    Items: [
      // {
      //   icon: <i className="bi bi-grid side-menu__icon fs-16 mb-2"></i>,
      //   type: "link",
      //   Name: "",
      //   active: false,
      //   selected: false,
      //   title: "Dashboard",
      //   badge: "",
      //   class: "badge bg-warning-transparent ms-2 ",
      //   path: `${import.meta.env.BASE_URL}superAdmin/dashboard`,
      // },
      {
        icon: <i className="side-menu__icon bx bx-user"></i>,
        type: "link",
        Name: "",
        active: false,
        selected: false,
        title: "Users",
        badge: "",
        class: "badge bg-warning-transparent ms-2",
        path: `${import.meta.env.BASE_URL}superAdmin/user`,
        // path: `${
        //   import.meta.env.BASE_URL
        // }koisedashboards/koiskdashboard/findpatient/textcenter`,
      },
      {
        icon: <i className="side-menu__icon bx bx-calendar"></i>,
        type: "link",
        Name: "",
        active: false,
        selected: false,
        title: "Set Schedule",
        badge: "",
        class: "badge bg-warning-transparent ms-2",
        path: `${import.meta.env.BASE_URL}superAdmin/setschedule`,
      },
      {
        icon: <i className="side-menu__icon bi bi-file-earmark"></i>,
        type: "link",
        Name: "",
        active: false,
        selected: false,
        title: "Reports",
        badge: "",
        class: "badge bg-warning-transparent ms-2",
        path: `${import.meta.env.BASE_URL}superAdmin/reports`,
      },
      {
        icon: <i className=" side-menu__icon bi bi-person-circle"></i>,
        type: "link",
        Name: "",
        active: false,
        selected: false,
        title: "Profile",
        badge: "",
        class: "badge bg-warning-transparent ms-2",
        path: `${import.meta.env.BASE_URL}superAdmin/profile`,
      },
    ],
  },
];

export const MENUITEMSKOISE = [
  {
    menutitle: "ADMIN DASHBOARD",
    Items: [
      // {
      //   icon: <i className="side-menu__icon bx bx-home"></i>,
      //   type: "link",
      //   Name: "",
      //   active: false,
      //   selected: false,
      //   title: "Dashboards",
      //   badge: "",

      //   class: "badge bg-warning-transparent ms-2",
      //   path: `${import.meta.env.BASE_URL}superAdmin/dashboard`,
      // },
      {
        icon: <i className="side-menu__icon bx bx-user"></i>,
        type: "link",
        Name: "",
        active: false,
        selected: false,
        title: "Users",
        badge: "",
        class: "badge bg-warning-transparent ms-2",
        path: `${import.meta.env.BASE_URL}superAdmin/user`,
        // path: `${
        //   import.meta.env.BASE_URL
        // }koisedashboards/koiskdashboard/findpatient/textcenter`,
      },
      // {
      //   icon: <i className="side-menu__icon bx bx-calendar"></i>,
      //   type: "link",
      //   Name: "",
      //   active: false,
      //   selected: false,
      //   title: "Set Schedule",
      //   badge: "",

      //   class: "badge bg-warning-transparent ms-2",
      //   path: `${import.meta.env.BASE_URL}superAdmin/setschedule`,
      // },
      {
        icon:<i className=" side-menu__icon bi bi-file-earmark-text mb-2"></i>,
        type: "link",
        Name: "",
        active: false,
        selected: false,
        title: "Reports",
        badge: "",
        class: "badge bg-warning-transparent ms-2",
        path: `${import.meta.env.BASE_URL}superAdmin/reports`,
      },
      // {
      //   icon: <i className=" side-menu__icon bi bi-person-circle mb-2"></i>,
      //   type: "link",
      //   Name: "",
      //   active: false,
      //   selected: false,
      //   title: "Profile",
      //   badge: "",
      //   class: "badge bg-warning-transparent ms-2",
      //   path: `${import.meta.env.BASE_URL}superAdmin/profile`,
      // },
    ],
  },
];
