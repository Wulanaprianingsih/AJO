import { supabase } from "lib/supabaseClient"
import { useMaterialState } from "store/materialStore"

export const fetchMaterials = async () => {
    const setMaterial = useMaterialState.getState().setMaterials

    const { data: materials, error } = await supabase
        .from("materials")
        .select("*, excercises ( * )")

    if (error) {
        console.error("error fetch materials:", error)
        return
    }

    const modifiedMaterials = materials.map((m, i) => ({
        ...m,
        key: i,
    }))

    setMaterial(modifiedMaterials)
    console.log('modifiedMaterials', modifiedMaterials)
}

export const uploadImage = async (path: string, filename: string, file: File) => {
    try {
        // upload img
        const { error: uploadError } = await supabase.storage.from("materials").upload(`${path}/${filename}`, file, {
            cacheControl: "3600",
            upsert: true
        })

        if (uploadError) {
            console.log('error upload : ', uploadError)
            return
        }

        console.log('imgae uploaded')

        // get img url
        const { data: imgUrl } = await supabase.storage.from("materials").getPublicUrl(`${path}/${filename}`)

        return imgUrl
    } catch (e) {
        console.log('error upload process', e)

    }
}

export const deleteMaterial = async (materialId: number) => {
    try {
      const { error } = await supabase
        .from('materials')
        .delete()
        .eq('id', materialId)
      if (error) console.log('error', error)
      else console.log('success delete'); fetchMaterials()
    } catch (e) {
      console.log('error', e)
    }
}



