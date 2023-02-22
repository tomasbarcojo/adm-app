import { Product } from "src/modules/product/product.entity";

export class PurchasedProductList {
  productId: number;
  quantity: number;
  price: number;
  discount: string;
  name: string;
}

export class GetDetailsByPurchaseId {
  products: PurchasedProductList[]
  total: number;
}