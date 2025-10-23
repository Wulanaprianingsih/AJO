import { IMaterialData } from "types/material";
import { create } from "zustand";

interface MaterialState {
    materials: IMaterialData[];
    defaultMaterialValue: IMaterialData | null;
    setMaterials: (date: IMaterialData[]) => void;
    addMaterial: (material: IMaterialData) => void;
    setDefaultValue:(value: IMaterialData | null) => void
}

export const useMaterialState = create<MaterialState>()(
    (set) => ({
        materials: [],
        defaultMaterialValue: null,
        setMaterials: (data) => set({ materials: data }),
        addMaterial: (material) => set((state) => ({
            materials: [...state.materials, material]
        })),
        setDefaultValue: (value) => set({defaultMaterialValue: value})
    })

);
