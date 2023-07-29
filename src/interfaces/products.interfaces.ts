export interface IProducts {
  id: string;
  name: string;
  price: number;
  description: string;
  stock: number;
  image: string;
  categoryId: string;
}

export interface IProductReq {
  name: string;
  price: number;
  description: string;
  stock: number;
  image?: string;
  categoryId: string;
  [key: string]: any;
}

export interface IProductBuyReq {
  character?: string;
  count?: number;
  [key: string]: any;
}

export interface IProductCart {
  id: number;
  name: string;
  count: number;
  price: number;
  character?: string;
  image: string;
}
