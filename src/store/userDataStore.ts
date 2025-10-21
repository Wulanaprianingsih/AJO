import { UserProps } from "types/userData";
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface UserProfileState {
    userProfile: UserProps | null
    setUserProfile: (user: UserProps) => void;
}

export const useUserStore = create<UserProfileState>()(
    persist(
        (set) => ({
            userProfile: null,
            setUserProfile: (user) => set({ userProfile: user }),
        }),
        {
            name: "userProfile",
        }
    )
)