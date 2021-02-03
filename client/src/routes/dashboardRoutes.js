import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";

import DashboardPage from "../views/Dashboard/Dashboard";
import UserProfile from "../views/UserProfile/UserProfile.js";
import TableList from "../views/TableList/TableList.js";
import Typography from "../views/Typography/Typography.js";
import Icons from "../views/Icons/Icons.js";
import Maps from "../views/Maps/Maps.js";
import NotificationsPage from "../views/Notifications/Notifications.js";
import UpgradeToPro from "../views/UpgradeToPro/UpgradeToPro.js";

const dashboardRoutes = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: Dashboard,
      component: DashboardPage,
      layout: "/admin"
    },
    {
      path: "/user",
      name: "User Profile",
      icon: Person,
      component: UserProfile,
      layout: "/admin"
    },
    {
      path: "/suppliers",
      name: "Table List",
      icon: "content_paste",
      component: TableList,
      layout: "/admin"
    },
    {
      path: "/typography",
      name: "Typography",
      icon: LibraryBooks,
      component: Typography,
      layout: "/admin"
    },
    {
      path: "/icons",
      name: "Icons",
      icon: BubbleChart,
      component: Icons,
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
    {
      path: "/rtl-page",
      name: "RTL Support",
      icon: Language,
      component: RTLPage,
      layout: "/rtl"
    },
    {
      path: "/upgrade-to-pro",
      name: "Upgrade To PRO",
      icon: Unarchive,
      component: UpgradeToPro,
      layout: "/admin"
    }
  ];
  
  export default dashboardRoutes;