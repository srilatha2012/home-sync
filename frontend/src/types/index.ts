export type User ={
    id: string,
    username: string,
    email: string,
    password: string,
    role: "parent" | "spouse" | "teen" | "child",
    family?: string
}