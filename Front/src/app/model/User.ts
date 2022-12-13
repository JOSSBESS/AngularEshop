export interface User {
    id: number;
    username: string;
    password: string;
    email: string;
    isAdmin: boolean;
}

export enum UserRole {
    ADMIN = 1,
    USER = 0,
}


export interface UserResponse {
    user: User;
    token: string;
}