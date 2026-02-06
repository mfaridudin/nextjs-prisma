import { create } from "zustand"

type FormMode = "add" | "edit" | "delete" | "logout" | null

type openModalStore = {
    open: boolean
    selectedId: string | number | null
    mode: FormMode

    openAddModal: () => void
    openLogoutModal: () => void
    openEditModal: (id: string | number) => void
    openDeleteModal: (id: string | number) => void
    closeModal: () => void
}

export const useOpenModal = create<openModalStore>((set) => ({
    open: false,
    mode: null,
    selectedId: null,

    openAddModal: () =>
        set({
            open: true,
            mode: "add",
            selectedId: null,
        }),

    openEditModal: (id) =>
        set({
            open: true,
            mode: "edit",
            selectedId: id
        }),
    openDeleteModal: (id) => set({
        open: true,
        mode: "delete",
        selectedId: id
    }),

    openLogoutModal: () =>
        set({
            open: true,
            mode: "logout",
            selectedId: null,
        }),
    closeModal: () =>
        set({
            open: false,
            selectedId: null,
        }),
}))
