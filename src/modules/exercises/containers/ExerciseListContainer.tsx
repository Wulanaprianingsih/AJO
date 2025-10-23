"use client";

import React, { useEffect, useState } from "react";
import { IAnswered, IOptions, IQuestion } from "types/course";
import { useCourseStore } from "store/courseStore";
import { supabase } from "lib/supabaseClient";
import { useRouter } from "next/navigation";
import ExerciseListComponent from "../components/ExerciseListComponent";

export default function ExerciseListContainer() {
  const course = useCourseStore((s) => s.selectedCourse);
  const router = useRouter();

  const userLogin = "bangwijay11@gmail.com";
  const minimumScore = 70;

  const question = course?.question ?? null;

  const [activeQuestion, setActiveQuestion] = useState<IQuestion | null>(null);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState<IAnswered[]>([]);
  const [point, setPoint] = useState(0);

  const handleNavigate = async (isNext: boolean) => {
    if (!question) return;
    if (isNext) {
      if (index + 1 === question.length) {
        handleSubmit();
      } else {
        setIndex((prev) => prev + 1);
      }
    } else {
      setIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    const isCorrectAnswer = answer.filter((x) => x.answer.isCorrect);
    const result = isCorrectAnswer.length * 50;
    setPoint(result);

    if (result < minimumScore) {
      alert("yah blm kkm");
    } else {
      const { data: userData } = await supabase
        .from("userProfile")
        .select("point,level")
        .eq("email", userLogin)
        .single();
      const newPoint = userData?.point + result;
      const newLevel = userData?.level + 1;

      const { error } = await supabase
        .from("userProfile")
        .update({ point: newPoint, level: newLevel })
        .eq("email", userLogin);

      console.log("error", error);
      router.push("/materi");
    }
  };

  useEffect(() => {
    if (!question) return;
    setActiveQuestion(question[index]);
  }, [index, question]);

  const handleAnswer = (id: number, value: IOptions) => {
    setAnswer((prev) => {
      const arr = prev ?? [];

      const exists = arr.some((item) => item.id === id);

      if (exists) {
        return arr.map((item) =>
          item.id === id ? { ...item, answer: value } : item
        );
      }

      return [...arr, { id, answer: value }];
    });
  };

  return (
    <ExerciseListComponent
      activeQuestion={activeQuestion}
      answer={answer}
      handleAnswer={handleAnswer}
      handleNavigate={handleNavigate}
      index={index}
      point={point}
    />
  );
}
