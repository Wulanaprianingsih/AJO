import { supabase } from "lib/supabaseClient"
import { useUserStore } from "store/userDataStore"
import { userBadgeProps } from "types/userData"

export const fetchAllUser = async () => {
    const setAllUser = useUserStore.getState().setAllUser
    const { data: users, error } = await supabase
        .from("users")
        .select("*")
    if (error) {
        console.error("error fetch materials:", error)
        return []
    } else {
        setAllUser(users)
    }
}

export const updateUserPoint = async (point: number, userId: string) => {
    const { error } = await supabase
        .from("users")
        .update({ points: point })
        .eq('id', userId)
    if (error) throw error
}

export const fetchUserData = async (id: string) => {
    const setUserProfile = useUserStore.getState().setUserProfile
    const { data: userData, error: userError } = await supabase
        .from("users")
        .select("*, user_badges ( * )")
        .eq("id", id)
        .maybeSingle();

    if (userError) throw new Error(userError.message);
    const _userData = {
        ...userData,
        user_badges: userData.user_badges.sort(
            (a: userBadgeProps, b: userBadgeProps) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
    }

    console.log('_userData', _userData)
    setUserProfile(_userData);
}