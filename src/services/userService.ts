import { supabase } from "lib/supabaseClient"
import { useUserStore } from "store/userDataStore"
import { userBadgeProps } from "types/userData"

export const fetchAllUser = async () => {
    const setAllUser = useUserStore.getState().setAllUser
    const { data: users, error } = await supabase
        .from("users")
        .select("*")
        .eq('role', 'user')
        .order('points', {ascending: false});

    if (error) {
        console.error("error fetch materials:", error)
        return []
    } else {
        setAllUser(users)
    }
}

interface IUpdateUserPayload {
    points: number
    level?: number
    email?: string
}
export const updateUserPoint = async (props: IUpdateUserPayload) => {
    const {points, email, level} = props
    console.log('props', props)

    const payload: IUpdateUserPayload = {points: points}
    if(level && level > 0) payload.level = level 
    
    const { error } = await supabase
        .from("users")
        .update(payload)
        .eq('email', email)
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