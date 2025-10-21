"use client";

import React from "react";
import DetailMateriComponent from "../components/DetailMateriComponent";
import { useCourseStore } from "store/courseStore";
import { useRouter } from "next/navigation";

export default function DetailMateriContainer() {
  const course = useCourseStore((s) => s.selectedCourse);
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/latihan");
  };

  return (
    <DetailMateriComponent course={course} handleNavigate={handleNavigate} />
  );
}
