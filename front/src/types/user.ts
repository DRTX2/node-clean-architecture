export interface Role {
  id: string | number;
  role: string;
  userId: string | number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role[];
}

export interface UsersResponse {
  users: User[];
  token: User;
}