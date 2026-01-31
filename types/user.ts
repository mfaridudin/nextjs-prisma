export interface UserDetail {
    id: string
    fullName: string
    username: string
    email: string
    address?: string
    age?: number
    dateOfBirth?: string
    avatar?: string
    emailVerified?: boolean
    createdAt: string
    role: {
        name: string
    }
}
