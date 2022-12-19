export interface User {
    username: string;
    password: string;
    confirmpassword: string;
    email: string;
    role: string;
}


export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  ROLE_ADMIN = "ROLE_ADMIN"
}


export interface UserResponse {
    user: User;
    token: string;
}