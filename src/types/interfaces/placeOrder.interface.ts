import { IProductPicture, IProductSizes } from "./product.interface";

interface IOrderAddress {
  _id: string;
  pinCode: number;
  locality: string;
  address: string;
  cityDistrictTown: string;
  state: string;
}

interface IOrderItem {
  _id: string;
  size: keyof IProductSizes;
  price: number;
  qty: number;
  product: {
    _id: string;
    productName: string;
    productPictures: IProductPicture[];
  };
}

export type TOrderStatus =
  | "pending"
  | "order confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "failed";

export interface IPlaceOrder {
  _id: string;
  orderId: string;
  customer: string;
  address: IOrderAddress;
  items: IOrderItem[];
  totalPrice: number;
  orderStatus: TOrderStatus;
  orderDate: string;
  deliveredDate: string | null;
  paymentMethod: "cod" | "card";
  paymentStatus: string;
}

export interface IOpenTrackModal {
  show: boolean;
  data: {
    status?: TOrderStatus;
    orderId?: string;
  };
}

export interface ICurrentOrder {
  addressId: string;
  paymentMethod: IPlaceOrder["paymentMethod"];
  process: "direct" | "checkout";
  items: { product: string; qty: number; size: keyof IProductSizes }[];
}
