import { create } from "zustand"
import { persist } from "zustand/middleware"

type User = {
    id: number
    roleId: number
    fullName: string
    username: string
    email: string
    address: string | null
    schoolId: number | null

    role?: {
        name: string
    }

    school?: {
        name: string
        slug: string
        address: string
    }
}

type UserStore = {
    school: any
    role: any
    user: User | null

    setUser: (user: User) => void
    clearUser: () => void
}

export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            user: null,

            setUser: (user) =>
                set({
                    user,
                }),

            clearUser: () =>
                set({
                    user: null,
                }),
        }),
        {
            name: "user-storage",
        }
    )
)
