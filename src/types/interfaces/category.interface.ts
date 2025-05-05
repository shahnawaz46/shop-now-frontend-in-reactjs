export interface ICategory {
    _id: string;
    categoryName: string;
    parentCategoryId: string;
    slug: string;
    children: ICategory[];
  }

  export interface IAllCategories {
    _id: string;
    categoryName: string;
    slug: string;
    children: ICategory[];
  }