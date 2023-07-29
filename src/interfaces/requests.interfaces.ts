import { IUserRes } from "./users.interfaces";

export interface IRequests {
  id: string;
  number: string;
  total: number;
  status: string;
  description?: string;
  createdAt: Date;
  clientId: string;
  client: IUserRes;
  itens: IRequestsItens[];
}

export interface IRequestsItens {
  id: string;
  name: string;
  count: number;
  price: number;
  character?: string;
  image: string;
  requestId: string;
}

export interface IRequestEdit {
  id?: string;
  number?: string;
  total?: number;
  status?: string;
  description?: string;
  createdAt?: Date;
  clientId?: string;
  itens?: IRequestsItens[];
  [key: string]: any;
}
