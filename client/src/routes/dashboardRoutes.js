import Dashboard from '@mui/icons-material/Dashboard';
import Person from '@mui/icons-material/Person';
import BubbleChart from '@mui/icons-material/BubbleChart';
import LocationOn from '@mui/icons-material/LocationOn';
import Notifications from '@mui/icons-material/Notifications';
import Unarchive from '@mui/icons-material/Unarchive';
import Language from '@mui/icons-material/Language';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import DashboardPage from '../views/Dashboard/Dashboard';
import PriceLists from '../views/PriceLists/PriceLists.js';
import Maps from '../views/Maps/Maps.js';
import NotificationsPage from '../views/Notifications/Notifications.js';
import UpgradeToPro from '../views/UpgradeToPro/UpgradeToPro.js';
// core components/views for RTL layout
import RTLPage from '../views/RTLPage/RTLPage.js';
import EditPricelist from '../views/PriceLists/EditPricelist';
import AddIcon from '@mui/icons-material/Add';

// import purchases from './purchases'
import { clients, purchases, artAndCat } from './nestedRoutes';
import ProductList from '../views/Products/ProductList';

const dashboardRoutes = [
  {
    path: '/dashboard',
    name: 'Panel',
    icon: Dashboard,
    component: DashboardPage,
    layout: '/admin',
  },
  // {
  //   path: '/dashboard2',
  //   name: 'Panel2',
  //   icon: Dashboard,
  //   component: ProductList,
  //   layout: '/admin',
  // },
  {
    // path: "/suppliers",
    name: 'Proveedores',
    icon: Language,
    // component: Suppliers,
    // layout: "/admin",
    notSideBar: true,
    nestedList: true,
    nestedData: purchases,
  },
  {
    // path: "/clients",
    name: 'Clientes',
    icon: Person,
    // component: TableList,
    // layout: "/admin",
    notSideBar: true,
    nestedList: true,
    nestedData: clients,
  },
  // {
  //   path: "/clientsbackup",
  //   name: "Clientes",
  //   icon: Person,
  //   component: TableList,
  //   layout: "/admin"
  // },
  {
    // path: "/articles",
    name: 'Productos/Categorias',
    icon: BubbleChart,
    // layout: "/admin",
    notSideBar: true,
    nestedList: true,
    nestedData: artAndCat,
  },
  {
    path: '/pricelist',
    name: 'Listado de precios',
    icon: 'content_paste',
    component: PriceLists,
    layout: '/admin',
  },
  {
    path: '/maps',
    name: 'Maps',
    icon: LocationOn,
    component: Maps,
    layout: '/admin',
  },
  {
    path: '/notifications',
    name: 'Notifications',
    icon: Notifications,
    component: NotificationsPage,
    layout: '/admin',
  },
  // {
  //   path: "/rtl-page",
  //   name: "RTL Support",
  //   icon: Language,
  //   component: RTLPage,
  //   layout: "/admin"
  // },
  {
    path: '/profile',
    name: 'Perfil',
    notSideBar: true,
    // icon: Language,
    component: RTLPage,
    layout: '/admin',
  },
  {
    path: '/settings',
    name: 'Ajustes',
    notSideBar: true,
    // icon: Language,
    // component: RTLPage,
    layout: '/admin',
  },
  {
    path: '/editpricelist/:id',
    name: 'Editar listado de precio',
    notSideBar: true,
    // icon: Language,
    component: EditPricelist,
    layout: '/admin',
  },
  // {
  //   // path: "/purchases",
  //   name: "Compras",
  //   icon: ShoppingCartIcon,
  //   // component: Purchases,
  //   layout: "/admin",
  // notSideBar: true,
  // nestedList: true,
  //   nestedData: purchases
  // },
  // {
  //   path: "/nestedlinktest",
  //   name: "Nested Link test",
  //   icon: Unarchive,
  //   component: UpgradeToPro,
  //   layout: "/admin",
  //   notSideBar: true,
  //   nestedList: true,
  //   nestedData: nestedDataTest,
  // },
  // {
  //   path: "/nestedlinktest",
  //   name: "Nested Link test",
  //   icon: Unarchive,
  //   component: UpgradeToPro,
  //   layout: "/asd",
  //   notSideBar: true,
  //   nestedList: true,
  //   nestedData: nestedDataTest,
  // }
];

export default dashboardRoutes;
