import { UserProps } from "types/userData";
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface UserProfileState {
    userProfile: UserProps | null
    setUserProfile: (user: UserProps) => void;
    allUser: UserProps[]
    setAllUser: (user: UserProps[]) => void;
}

export const useUserStore = create<UserProfileState>()(
    persist(
        (set) => ({
            userProfile: null,
            allUser: [],
            setUserProfile: (user) => set({ userProfile: user }),
            setAllUser: (users) => set({allUser: users})
        }),
        {
            name: "userProfile",
        }
    )
)