export interface ICartItem {
  _id: string;
  productName: string;
  sellingPrice: number;
  productImage: string;
  size: keyof IProductSizes;
  qty: number;
}

export interface IUpdateCartItem {
  _id: string;
  qty: number;
  size: keyof IProductSizes;
}

export interface IProductPicture {
  img: string;
  _id: string;
  public_id: string;
}

export interface IProduct {
  _id: string;
  productName: string;
  sellingPrice: number;
  actualPrice: number;
  productPictures: IProductPicture[];
  totalSale?: number;
}

export interface IProductBanner {
  computerBanner: string[];
  mobileBanner: string[];
}

export interface ITrendingProduct {
  productId: string;
  totalCount: number;
  productPicture: IProductPicture;
}

export interface IAllTrendingProducts {
  targetAudience: 'Men' | 'Women';
  trendingProducts: ITrendingProduct[];
}

export interface ITopRatedProduct {
  productId: string;
  averageRating: number;
  productPicture: IProductPicture;
}

export interface ISearchProduct {
  _id: string;
  categoryName: string;
  slug: string;
}

export interface IAllProducts {
  next: string | null;
  items: IProduct[];
}


export interface IPreviewProduct {
  _id: string;
  productName: string;
  actualPrice: number;
  sellingPrice: number;
  description: string;
  productPictures: IProductPicture[];
  size: IProductSizes;
  slug: string;
  stocks: number;
  targetAudience: string;
  totalSales: number;
  reviews: IProductReviews[];
}

export interface IProductSizes {
  XS?: string;
  S?: string;
  M?: string;
  L?: string;
  XL?: string;
}

export interface IProductReviews {
  _id: string;
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
  };
  message: string;
  rating: number;
  create_date: string;
  update_date: string;
}


