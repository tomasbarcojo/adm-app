import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";

import DashboardPage from "../views/Dashboard/Dashboard";
import Suppliers from "../views/Suppliers/Suppliers.js";
import TableList from "../views/Clients/Clients.js";
import Articles from "../views/Articles/Articles.js";
import Icons from "../views/Icons/Icons.js";
import PriceLists from "../views/PriceLists/PriceLists.js"
import Maps from "../views/Maps/Maps.js";
import NotificationsPage from "../views/Notifications/Notifications.js";
import UpgradeToPro from "../views/UpgradeToPro/UpgradeToPro.js";
// core components/views for RTL layout
import RTLPage from "../views/RTLPage/RTLPage.js";

const dashboardRoutes = [
    {
      path: "/dashboard",
      name: "Panel",
      icon: Dashboard,
      component: DashboardPage,
      layout: "/admin"
    },
    {
      path: "/suppliers",
      name: "Proveedores",
      icon: Language,
      component: Suppliers,
      layout: "/admin"
    },
    {
      path: "/clients",
      name: "Clientes",
      icon: Person,
      component: TableList,
      layout: "/admin"
    },
    // {
    //   path: "/clientsbackup",
    //   name: "Clientes",
    //   icon: Person,
    //   component: TableList,
    //   layout: "/admin"
    // },
    {
      path: "/articles",
      name: "Articulos",
      icon: BubbleChart,
      component: Articles,
      layout: "/admin"
    },
    {
      path: "/pricelist",
      name: "Listado de precios",
      icon: "content_paste",
      component: PriceLists,
      layout: "/admin"
    },
    {
      path: "/maps",
      name: "Maps",
      icon: LocationOn,
      component: Maps,
      layout: "/admin"
    },
    {
      path: "/notifications",
      name: "Notifications",
      icon: Notifications,
      component: NotificationsPage,
      layout: "/admin"
    },
    // {
    //   path: "/rtl-page",
    //   name: "RTL Support",
    //   icon: Language,
    //   component: RTLPage,
    //   layout: "/admin"
    // },
    {
      path: "/profile",
      name: "Perfil",
      notSideBar: true,
      // icon: Language,
      component: RTLPage,
      layout: "/admin"
    },
    {
      path: "/settings",
      name: "Ajustes",
      notSideBar: true,
      // icon: Language,
      // component: RTLPage,
      layout: "/admin"
    },
    {
      path: '/editpricelist',
      name: "Editar listado de precio",
      notSideBar: true,
      // icon: Language,
      // component: RTLPage,
      layout: "/admin"
    },
    // {
    //   path: "/upgrade-to-pro",
    //   name: "Upgrade To PRO",
    //   icon: Unarchive,
    //   component: UpgradeToPro,
    //   layout: "/admin"
    // }
  ];
  
  export default dashboardRoutes;