import { IExcerciseData } from "types/materi";
import { create } from "zustand";

interface ExcerciseState {
    excercise: IExcerciseData[];
    selectedExcercise: IExcerciseData | null;
    setExcercise: (date: IExcerciseData[]) => void;
    addExcercise: (material: IExcerciseData) => void;
    setDefaultValue:(value: IExcerciseData | null) => void
}

export const useExcerciseState = create<ExcerciseState>()(
    (set) => ({
        excercise: [],
        selectedExcercise: null,
        setExcercise: (data) => set({ excercise: data }),
        addExcercise: (material) => set((state) => ({
            excercise: [...state.excercise, material]
        })),
        setDefaultValue: (value) => set({selectedExcercise: value})
    })

);
