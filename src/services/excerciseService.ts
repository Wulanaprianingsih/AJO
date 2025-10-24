import { supabase } from "lib/supabaseClient";
import { useExcerciseState } from "store/excerciseStore";
import { ISubmitExcercise } from "types/course";
import { IExcercisePayload } from "types/materi";


export const fetchExcercises = async () => {
    const setExcercise = useExcerciseState.getState().setExcercise
    const { data: excercises, error } = await supabase
        .from("excercises")
        .select("*, materials (title)")

    if (error) {
        console.error("error fetch materials:", error)
        return []
    } else {
        const excerciseList = excercises.map((ex) => ({
            ...ex,
            materials_title: ex.materials.title
        }))
        setExcercise(excerciseList)
    }

}

export const insertExcercises = async (payload: IExcercisePayload[]) => {
    try {
        const { data, error } = await supabase
            .from('excercises')
            .insert(payload)
            .select()
        if (error) console.log('error', error)
        else {
            console.log(data)
        }
    } catch (e) {
        console.log('error', e)
    }
}

export const updateExcercises = async (id: number | string, payload: IExcercisePayload[]) => {
    try {
        const { data, error } = await supabase
            .from('excercises')
            .update(payload)
            .eq('id', id)
            .select()
        if (error) console.log('error', error)
        else {
            console.log(data); fetchExcercises()
        }
    } catch (e) {
        console.log('error', e)
    }
}

export const deleteExcercise = async (id: number) => {
    const { setExcercise, excercise } = useExcerciseState.getState()
    try {
        const { error } = await supabase
            .from('excercises')
            .delete()
            .eq('id', id)
        if (error) console.log('error', error)
        else {
            console.log('success delete');
            const filteredExcercise = excercise.filter((ex) => ex.id !== id)
            setExcercise(filteredExcercise)
        }
    } catch (e) {
        console.log('error', e)
    }
}


//   user services

export const getUserExampHistory = async (materiId: number) => {
    const { data, error } = await supabase
        .from('user_excercise_history')
        .select()
        .eq('material_id', materiId)

    if (error) throw error

    return data?.length ?? 0

}

export const insertExcercisesHistory = async (payload: ISubmitExcercise) => {
    const { error } = await supabase
        .from('user_excercise_history')
        .insert([payload])
        .select()
    if (error) throw error
}

interface IBagdePayload {
    name: string,
    user_id: string
}

export const insertUserBadge = async (paylaod: IBagdePayload[]) => {
    console.log(paylaod)
    const { error } = await supabase
        .from('user_badges')
        .insert(paylaod)
        .select()
    if (error) throw error
}