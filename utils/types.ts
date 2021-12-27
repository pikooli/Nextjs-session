export interface User {
  id: number;
  firstname: string | null;
  lastname: string | null;
  email: string;
  password: string;
  // createAt: Date;
  // updateAt: Date;
}

export interface Obj {
  [key: string]: any;
}
