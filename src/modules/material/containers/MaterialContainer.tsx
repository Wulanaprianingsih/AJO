"use client";

import React, { useState } from "react";
import MaterialComponent from "../components/MaterialComponent";
// import { useCourseStore } from "store/courseStore";
import { useRouter, useParams } from "next/navigation";
import { IDetailCourse } from "types/course";
import { useMaterialState } from "store/materialStore";

export default function MaterialContainer() {
  const material = useMaterialState((s) => s.materials);
  const router = useRouter();
  const params = useParams()
  const [selectedOption, setSelectedOption] = useState<string>("");

  const materiId = params.id

  const detailMaterial = material.find((x) => x.id.toString() == materiId?.toString())
  const handleNavigate = () => {
    router.push(`/exercises/${materiId}`);
  };

  console.log('detailMaterial', detailMaterial)

  const dummyCourse: IDetailCourse = {
    id: Number(detailMaterial?.id),
    title: detailMaterial?.title ?? '',
    description: detailMaterial?.description ?? '',
    media_url: detailMaterial?.media_url, 
    media_type: detailMaterial?.media_type, 
    content_text: detailMaterial?.content_text ?? '',
    quiz: {
      question: detailMaterial?.sample_quiz.question ?? '',
      options: detailMaterial?.sample_quiz.options ?? [''],
      correctAnswer: detailMaterial?.sample_quiz.answer ?? ''
    },
  };

  return (
    <MaterialComponent
      course={dummyCourse}
      handleNavigate={handleNavigate}
      selectedOption={selectedOption}
      setSelectedOption={setSelectedOption}
    />
  );
}
