"use client";
import ExercisesListAdminContainer from "modules/exercises/containers/ExcerciseListAdminContainer";
import ExerciseListContainer from "modules/exercises/containers/ExerciseListContainer";
import { useUserStore } from "store/userDataStore";
export default function ExerciseListPage() {
  const userData = useUserStore((s) => s.userProfile);
  const role = userData?.role;
  if (role === "admin") {
    return <ExercisesListAdminContainer />;
  } else {
    return <ExerciseListContainer />;
  }
}
