export interface IAttribute {
  id?: string;
  key: string;
  value: string[];
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
  inStock: boolean;
  isNewArrival: boolean;
  isBestSeller?: boolean;

  sizeCategory: string;
  colors: IColor[];
  sizes: IProductSize[];
  images: IImageFile[];
  attributes: IProductAttribute[];

  category?: ICategory;
  categoryId: string;

  subCategory?: { id: string; name: string; slug?: string } | string;
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
  userId: string;
  paymetId: string;
  addressId: string;
  status: "created" | "dispatched" | "delivered" | "cancelled";
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
