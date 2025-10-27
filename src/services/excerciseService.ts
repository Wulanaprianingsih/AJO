import { supabase } from "lib/supabaseClient";
import { useExcerciseState } from "store/excerciseStore";
import { IExcercisePayload, ISubmitExcercise } from "types/course";

export const fetchExcercises = async () => {
  const setExcercise = useExcerciseState.getState().setExcercise;
  const { data: excercises, error } = await supabase
    .from("excercises")
    .select("*, materials (title, level)");

  if (error) {
    return [];
  } else {
    const excerciseList = excercises.map((ex) => ({
      ...ex,
      materials_title: ex.materials.title,
      level: ex.materials.level,
    }));
    setExcercise(excerciseList);
  }
};

export const insertExcercises = async (payload: IExcercisePayload[]) => {
  try {
    const { data, error } = await supabase
      .from("excercises")
      .insert(payload)
      .select();
    if (error) console.log("error", error);
    else {
      console.log(data);
    }
  } catch (e) {
    console.log("error", e);
  }
};

export const updateExcercises = async (
  id: number | string,
  payload: IExcercisePayload[]
) => {
  try {
    const { data, error } = await supabase
      .from("excercises")
      .update(payload)
      .eq("id", id)
      .select();
    if (error) console.log("error", error);
    else {
      console.log(data);
      fetchExcercises();
    }
  } catch (e) {
    console.log("error", e);
  }
};

export const deleteExcercise = async (id: number) => {
  const { setExcercise, excercise } = useExcerciseState.getState();
  try {
    const { error } = await supabase.from("excercises").delete().eq("id", id);
    if (error) console.log("error", error);
    else {
      console.log("success delete");
      const filteredExcercise = excercise.filter((ex) => ex.id !== id);
      setExcercise(filteredExcercise);
      fetchExcercises();
    }
  } catch (e) {
    console.log("error", e);
  }
};

export const getUserExampHistory = async (materiId: number) => {
  const { data, error } = await supabase
    .from("user_excercise_history")
    .select()
    .eq("material_id", materiId);

  if (error) throw error;

  return data?.length ?? 0;
};

export const insertExcercisesHistory = async (payload: ISubmitExcercise) => {
  const { error } = await supabase
    .from("user_excercise_history")
    .insert([payload])
    .select();
  if (error) throw error;
};

interface IBagdePayload {
  name: string;
  user_id: string;
}

export const insertUserBadge = async (paylaod: IBagdePayload[]) => {
  console.log(paylaod);
  const { error } = await supabase.from("user_badges").insert(paylaod).select();
  if (error) throw error;
};

interface IUserAnswersPayload {
  user_id: string;
  answer: Record<number, string>;
  material_id: number;
}

export const insertUserAnswers = async (paylaod: IUserAnswersPayload) => {
  const { error } = await supabase
    .from("user_answers")
    .insert(paylaod)
    .select();
  if (error) throw error;
};
