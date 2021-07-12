import Purchases from '../views/Purchases/Purchases'
import Suppliers from "../views/Suppliers/Suppliers.js";
import AddIcon from '@material-ui/icons/Add';
import Language from "@material-ui/icons/Language";
import ListIcon from '@material-ui/icons/List';

const nestedDataTest = [
  {
    path: "/purchases",
    name: "Nueva compra",
    icon: AddIcon,
    component: Purchases,
    layout: "/admin"
  },
  {
    path: "/pepe/prueba",
    name: "Proveedores",
    icon: ListIcon,
    component: Suppliers,
    layout: "/admin"
  },
  {
    path: "/prueba",
    name: "Añadir proveedor",
    icon: AddIcon,
    component: Suppliers,
    layout: "/admin"
  },
  {
    path: "/prueba/asd",
    name: "Articulos4",
    icon: Language,
    component: Suppliers,
    layout: "/admin"
  }
];

export default nestedDataTest;