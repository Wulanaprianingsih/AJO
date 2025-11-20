import { IMaterialData } from "types/material";
import { create } from "zustand";

interface MaterialState {
  materials: IMaterialData[];
  isNeedToFetch: boolean;
  defaultMaterialValue: IMaterialData | null;
  setMaterials: (date: IMaterialData[]) => void;
  addMaterial: (material: IMaterialData) => void;
  setDefaultValue: (value: IMaterialData | null) => void;
  setNeedToFetch: (value: boolean) => void;
}

export const useMaterialState = create<MaterialState>()((set) => ({
  materials: [],
  isNeedToFetch: true,
  defaultMaterialValue: null,
  setNeedToFetch: (value: boolean) => set({ isNeedToFetch: value }),
  setMaterials: (data) => set({ materials: data }),
  addMaterial: (material) =>
    set((state) => ({
      materials: [...state.materials, material],
    })),
  setDefaultValue: (value) => set({ defaultMaterialValue: value }),
}));
