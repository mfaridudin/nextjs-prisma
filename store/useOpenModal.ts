import { create } from "zustand"

type FormMode = "add" | "edit" | "delete" | null

type openModalStore = {
    open: boolean
    selectedId: string | number | null
    mode: FormMode

    openAddModal: () => void
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
    closeModal: () =>
        set({
            open: false,
            selectedId: null,
        }),
}))
