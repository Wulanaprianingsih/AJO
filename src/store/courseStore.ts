import { ICourse } from "types/course";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface CourseState {
  selectedCourse: ICourse | null;
  setSelectedCourse: (course: ICourse) => void;
}

export const useCourseStore = create<CourseState>()(
  persist(
    (set) => ({
      selectedCourse: null,
      setSelectedCourse: (course) => set({ selectedCourse: course }),
    }),
    {
      name: "selected-course",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
