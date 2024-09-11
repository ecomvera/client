export interface IAddress {
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
}

export interface ICategory {
  id: string;
  name: string;
  slug: string;
  wearType?: string;
  parentId?: string | null;
  children?: ICategory[];
  products?: IProduct[];
  parent?: ICategory;
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
  colors: string[];

  sizes: IKeyValue[];
  images: IImageFile[];
  attributes: IKeyValue[];

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

export interface IKeyValue {
  id?: string;
  key: string;
  value: string;
  productId?: string;
}

export interface ICartItem {
  itemId: string;
  quantity: number;
  color: string;
  size: string;
  product: IProduct;
}
