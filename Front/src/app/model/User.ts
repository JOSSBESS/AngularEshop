export interface User {
    username?: string;
    password?: string;
    confirmpassword?: string;
    email?: string;
    role: string;
};

export interface Role {
    role: string;
}
