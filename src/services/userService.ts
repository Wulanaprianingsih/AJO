import { supabase } from "lib/supabaseClient"
import { useUserStore } from "store/userDataStore"

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