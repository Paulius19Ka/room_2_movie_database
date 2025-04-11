export type User = {
    id: string,
    username: string,
    email: string,
    password: string,
    passwordText: string,
    dob: string,
    role: "admin" | "user"
}