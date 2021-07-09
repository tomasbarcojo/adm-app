import Purchases from '../views/Purchases/Purchases'
import AddIcon from '@material-ui/icons/Add';
import Language from "@material-ui/icons/Language";

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
    name: "Articulos2",
    icon: Language,
    component: Purchases,
    layout: "/admin"
  },
  {
    path: "/prueba",
    name: "Articulos3",
    icon: Language,
    component: Purchases,
    layout: "/admin"
  },
  {
    path: "/prueba/asd",
    name: "Articulos4",
    icon: Language,
    component: Purchases,
    layout: "/admin"
  }
];

export default nestedDataTest;