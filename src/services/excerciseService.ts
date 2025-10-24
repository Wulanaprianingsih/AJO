import { supabase } from "lib/supabaseClient";
import { useExcerciseState } from "store/excerciseStore";
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
        console.log('excerciseList', excerciseList)
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
    const {setExcercise, excercise} = useExcerciseState.getState()
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