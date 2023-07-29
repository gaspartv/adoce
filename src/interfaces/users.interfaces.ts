export interface IUserRes {
  id: string;
  name: string;
  email: string;
  registered_at: Date;
  isAdmin: boolean;
  soft_delete: boolean;
}

export interface IUserEdit {
  name: string;
  email: string;
  password: string;
  [key: string]: any;
}

export interface IUserRecovery {
  email: string;
}
