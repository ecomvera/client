export interface IAttribute {
  id?: string;
  key: string;
  value: string[];
  productTypeId: string;
}

export interface ISize {
  id: string;
  type: string;
  value: string[];
}

export interface IColor {
  id: string;
  name: string;
  hex: string;
}

export interface IAddress {
  id?: string;
  name: string;
  phone: string;
  email: string;
  line1: string;
  line2: string;
  landmark: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  residenceType?: string;
}

export interface ICategory {
  id: string;
  name: string;
  slug: string;
  banner?: string;
  wearType?: string;
  parentId?: string | null;
  children?: ICategory[];
  products?: IProduct[];
  parent?: ICategory;
}

export interface ICollection {
  id: string;
  name: string;
  slug: string;
  isGallery: boolean;
  icon: string;
  image: string;
  banner: string;
  isActive: boolean;
  products: IProduct[];
}

export interface IGroupCategory {
  id: string;
  name: string;
  slug: string;
  image: string;
  banner: string;
  isActive: boolean;
  parentId?: string | null;
  parent?: ICategory;
  products: IProduct[];
}

export interface IProduct {
  id?: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  mrp: number;
  material: string;
  quantity: number;
  weight: number;
  hasDeliveryFee: boolean;
  inStock: boolean;
  isNewArrival: boolean;
  isBestSeller?: boolean;

  productType: IProductType;

  sizeCategory: string;
  colors: IColor[];
  sizes: IProductSize[];
  images: IImageFile[];
  video: string;
  attributes: IProductAttribute[];
  warehouses: IWarehouseProduct[];
  ProductReviews: any;
  genders: string[];

  category?: ICategory;
  categoryId: string;

  subCategory?: { id: string; name: string; slug?: string } | string;
  PruductReviews?: any;
}

export interface IProductType {
  id: string;
  name: string;
  attributes: IAttribute[];
}

export interface IWarehouse {
  id: string;
  name: string;
  pincode: string;
}

export interface IWarehouseProduct {
  id: string;
  quantity: number;
  productId: string;
  product: IProduct;
  warehouseId: string;
  warehouse: IWarehouse;
}

export interface IImageFile {
  id?: string;
  key: string;
  color: string;
  blob?: string;
  url: string;
  publicId: string;
  productId?: string;
}

export interface IProductSize {
  id?: string;
  key: string;
  value: string;
  quantity: number;
  productColor: string;
  productId?: string;
}

export interface IProductAttribute {
  id?: string;
  key: string;
  value: string;
  productId?: string;
}

export interface ICartItem {
  id: string;
  quantity: number;
  color: string;
  size?: string;
  productId: string;
  product: IProduct;
}

export interface IOrder {
  id: string;
  orderNumber: string;
  userId: string;
  paymetId: string;
  addressId: string;
  status: "created" | "dispatched" | "delivered" | "cancelled";
  items: IOrderItem[];
  timeline: any[];

  subTotal: number;
  deliveryCharge: number;
  giftWrapCharge: number;
  totalAmount: number;

  payment: any;
  shippingAddress: IAddress;

  createdAt: string;
  updatedAt: string;
}

export interface IOrderItem {
  id: string;
  orderId: string;
  productId: string;
  product: IProduct;
  color: string;
  size: string;
  quantity: number;
  price: number;
  totalPrice: number;
}

export interface IUser {
  id?: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  onBoarded: boolean;

  addresses: IAddress[];
  orders: IOrder[];

  createdAt: string;
  updatedAt: string;
}

export interface IPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
