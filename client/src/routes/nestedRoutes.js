import Purchases from '../views/Purchases/Purchases';
import Suppliers from '../views/Suppliers/Suppliers.js';
import SupplierList from '../views/Suppliers/SuppliersList';
import PurchasesList from '../views/Purchases/PurchasesList';

import AddIcon from '@material-ui/icons/Add';
import ListIcon from '@material-ui/icons/List';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import TableList from '../views/Clients/Clients.js';
import ClientList from '../views/Clients/ClientsList';
import Articles from '../views/Articles/Articles.js';
import ProductList from '../views/Articles/ProductList.js';
import Categories from '../views/Category/Categories';

export const purchases = [
  {
    path: '/newsupplier',
    name: 'Añadir proveedor',
    icon: AddIcon,
    component: Suppliers,
    layout: '/admin',
  },
  {
    path: '/suppliers',
    name: 'Proveedores',
    icon: ListIcon,
    component: SupplierList,
    layout: '/admin',
  },
  {
    path: '/newpurchase',
    name: 'Nueva compra',
    icon: AddShoppingCartIcon,
    component: Purchases,
    layout: '/admin',
  },
  {
    path: '/purchases',
    name: 'Compras',
    icon: ListIcon,
    component: PurchasesList,
    layout: '/admin',
  },
];

export const clients = [
  {
    path: '/newclient',
    name: 'Añadir cliente',
    icon: AddIcon,
    component: TableList,
    layout: '/admin',
  },
  {
    path: '/clients',
    name: 'Clientes',
    icon: ListIcon,
    component: ClientList,
    layout: '/admin',
  },
];

export const artAndCat = [
  {
    path: '/newproduct',
    name: 'Añadir producto',
    icon: AddIcon,
    component: Articles,
    layout: '/admin',
  },
  {
    path: '/products',
    name: 'Productos',
    icon: ListIcon,
    component: ProductList,
    layout: '/admin',
  },
  {
    path: '/newcategory',
    name: 'Añadir categoria',
    icon: AddIcon,
    component: Categories,
    layout: '/admin',
  },
  {
    path: '/categories',
    name: 'Categorias',
    icon: ListIcon,
    component: ClientList,
    layout: '/admin',
  },
];
