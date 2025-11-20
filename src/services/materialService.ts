import { supabase } from "lib/supabaseClient";
import { useMaterialState } from "store/materialStore";
import { IExcerciseHistory, IExcerciseData } from "types/material";

interface IOptionsQuiz {
  text: string;
}

export const fetchMaterials = async (id?: number) => {
  const setMaterial = useMaterialState.getState().setMaterials;
  const setNeedToFetch = useMaterialState.getState().setNeedToFetch;

  const fetchAll = async () => {
    const { data: materials, error } = await supabase
      .from("materials")
      .select("*")
      .order("sequence");

    if (error) {
      console.error("error fetch materials:", error);
      throw error;
    }

    console.log("materials", materials);

    const materialData = [];

    for (const m of materials) {
      console.log("material excercises", m.id);
      const excercises = await fetchAllExcercise(m.id);
      const userHistory = await fetchAllUserHistory(m.id);
      const userAnswers = await fetchAllUserAnswers(m.id);

      materialData.push({
        ...m,
        excercises,
        user_excercise_history: userHistory,
        user_answers: userAnswers,
      });
    }

    setNeedToFetch(false);

    return materialData;
  };

  const fetchAllExcercise = async (id: number) => {
    const { data: excercises, error } = await supabase
      .from("excercises")
      .select("*")
      .eq("material_id", id);

    if (error) {
      console.error("error fetch materials:", error);
      throw error;
    }

    return excercises;
  };
  const fetchAllUserHistory = async (id: number) => {
    const { data: user_excercise_history, error } = await supabase
      .from("user_excercise_history")
      .select("*")
      .eq("material_id", id);

    if (error) {
      console.error("error fetch materials:", error);
      throw error;
    }

    return user_excercise_history;
  };
  const fetchAllUserAnswers = async (id: number) => {
    const { data: user_answers, error } = await supabase
      .from("user_answers")
      .select("*")
      .eq("material_id", id);

    if (error) {
      console.error("error fetch materials:", error);
      throw error;
    }

    return user_answers;
  };

  const fetchById = async () => {
    const { data: materials, error } = await supabase
      .from("materials")
      .select("*, excercises ( * ), user_excercise_history ( * ) ")
      .eq("id", id);

    if (error) {
      console.error("error fetch materials:", error);
      throw error;
    }

    return materials;
  };

  const materials = id ? await fetchById() : await fetchAll();

  const getAnswerIndex = (answer: string) => {
    const answers = ["a", "b", "c", "d"];
    return answers.indexOf(answer.toLowerCase());
  };

  const modifiedMaterials = materials.map((m, i) => {
    const excercise_history = m.user_excercise_history?.sort(
      (a: IExcerciseHistory, b: IExcerciseHistory) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    const options = m.sample_quiz.options.map((x: IOptionsQuiz) => x.text);
    const indexOfAnswer = getAnswerIndex(m.sample_quiz.answer);

    return {
      ...m,
      key: i,
      excercise_history,
      sample_quiz: {
        question: m.sample_quiz.question,
        options,
        answer: options[indexOfAnswer],
      },
      excercises: m.excercises.map((ex: IExcerciseData) => {
        const exOptions = ex.options.map((x: { text: string }) => x.text);
        const exAnswerIndex = getAnswerIndex(ex.answer);

        return {
          ...ex,
          question: ex.question,
          options: exOptions,
          answer: exOptions[exAnswerIndex] ?? null,
        };
      }),
    };
  });

  setMaterial(modifiedMaterials);
};

export const uploadImage = async (
  path: string,
  filename: string,
  file: File
) => {
  try {
    const { error: uploadError } = await supabase.storage
      .from("materials")
      .upload(`${path}/${filename}`, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (uploadError) {
      console.log("error upload : ", uploadError);
      return;
    }

    const { data: imgUrl } = await supabase.storage
      .from("materials")
      .getPublicUrl(`${path}/${filename}`);

    return imgUrl;
  } catch (e) {
    console.log("error upload process", e);
  }
};

export const deleteMaterial = async (materialId: number) => {
  try {
    const { error } = await supabase
      .from("materials")
      .delete()
      .eq("id", materialId);
    if (error) console.log("error", error);
    else console.log("success delete");
    fetchMaterials();
  } catch (e) {
    console.log("error", e);
  }
};
