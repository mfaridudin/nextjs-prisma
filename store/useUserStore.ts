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
            school: null,
            role: null,

            setUser: (user) =>
                set({
                    user,
                    school: user.school ?? null,
                    role: user.role ?? null,
                }),

            clearUser: () =>
                set({
                    user: null,
                    school: null,
                    role: null,
                }),
        }),
        {
            name: "user-storage",
        }
    )
)
