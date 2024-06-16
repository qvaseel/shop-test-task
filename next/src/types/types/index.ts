export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  roles: number[];
}

export interface Product {
  id: number;
  name: string;
  quantity: number;
  price: string;
  image: any;
  manufacturerId: number;
}

export interface Manufacturer {
  id: number;
  name: string;
}

export interface AuthStoreState {
  user: User| null;
  token: string | null;
  productsCounter: number;
  setUser: (user: User) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
  incrementCounter: () => void;
  decrementCounter: () => void;
}

export interface ManufacturerStoreState {
  manufacturers: Manufacturer[];
  setManufacturers: (manufacturers: Manufacturer[] | undefined) => void;
}

export interface IMenuButton {
  isActive: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export type Breadcrumb = {
  id: number;
  parent: number | null;
  name_ru: string;
};