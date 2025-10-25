"use client";

import React, { useEffect, useState } from "react";
import MaterialComponent from "../components/MaterialComponent";
import { useRouter, useParams } from "next/navigation";
import { IDetailCourse } from "types/course";
import { useMaterialState } from "store/materialStore";
import { fetchMaterials } from "services/materialService";

export default function MaterialContainer() {
  const material = useMaterialState((s) => s.materials);
  const router = useRouter();
  const params = useParams();
  const [selectedOption, setSelectedOption] = useState<string>("");

  const materiId = params.id;

  const detailMaterial = material.find(
    (x) => x.id.toString() == materiId?.toString()
  );
  const handleNavigate = () => {
    router.push(`/latihan/${materiId}`);
  };

  useEffect(() => {
    const loadMaterial = async () => {
      if (!detailMaterial) {
        await fetchMaterials(Number(materiId));
      }
    };

    loadMaterial();
  }, [detailMaterial, materiId]);

  const course: IDetailCourse = {
    id: Number(detailMaterial?.id),
    title: detailMaterial?.title ?? "",
    description: detailMaterial?.description ?? "",
    media_url: detailMaterial?.media_url,
    media_type: detailMaterial?.media_type,
    content_text: detailMaterial?.content_text ?? "",
    quiz: {
      question: detailMaterial?.sample_quiz.question ?? "",
      options: detailMaterial?.sample_quiz.options ?? [""],
      answer: detailMaterial?.sample_quiz.answer ?? "",
    },
  };

  return (
    <MaterialComponent
      course={course}
      handleNavigate={handleNavigate}
      selectedOption={selectedOption}
      setSelectedOption={setSelectedOption}
    />
  );
}
