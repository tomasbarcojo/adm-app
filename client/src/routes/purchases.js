import Purchases from '../views/Purchases/Purchases'
import Suppliers from "../views/Suppliers/Suppliers.js";
import SupplierList from "../views/Suppliers/SuppliersList"
import PurchasesList from "../views/Purchases/PurchasesList"

import AddIcon from '@material-ui/icons/Add';
import ListIcon from '@material-ui/icons/List';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import TableList from "../views/Clients/Clients.js";
import ClientList from '../views/Clients/ClientsList';

export const purchases = [
  {
    path: "/prueba",
    name: "Añadir proveedor",
    icon: AddIcon,
    component: Suppliers,
    layout: "/admin"
  },
  {
    path: "/pepe/prueba",
    name: "Proveedores",
    icon: ListIcon,
    component: SupplierList,
    layout: "/admin"
  },
  {
    path: "/purchases",
    name: "Nueva compra",
    icon: AddShoppingCartIcon,
    component: Purchases,
    layout: "/admin"
  },
  {
    path: "/prueba/asd",
    name: "Compras",
    icon: ListIcon,
    component: PurchasesList,
    layout: "/admin"
  }
];

export const clients = [
  {
    path: "/addclient",
    name: "Añadir cliente",
    icon: AddIcon,
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/clientslist",
    name: "Clientes",
    icon: ListIcon,
    component: ClientList,
    layout: "/admin"
  },
//   {
//     path: "/purchases",
//     name: "Nueva compra",
//     icon: AddShoppingCartIcon,
//     component: Purchases,
//     layout: "/admin"
//   },
//   {
//     path: "/prueba/asd",
//     name: "Compras",
//     icon: ListIcon,
//     component: PurchasesList,
//     layout: "/admin"
//   }
];