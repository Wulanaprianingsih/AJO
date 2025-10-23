"use client";

import React, { useState } from "react";
import MaterialComponent from "../components/MaterialComponent";
// import { useCourseStore } from "store/courseStore";
import { useRouter } from "next/navigation";
import { IDetailCourse } from "types/course";

export default function MaterialContainer() {
  // const course = useCourseStore((s) => s.selectedCourse);
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<string>("");
  const id = "tembungKriya";

  const handleNavigate = () => {
    router.push(`/exercises/${id}`);
  };

  const dummyCourse: IDetailCourse = {
    id: 1,
    title: "Tembung Kriya (Kata Kerja)",
    description:
      "Pada materi ini, kamu akan belajar tentang tembung kriya, yaitu kata yang menunjukkan suatu tindakan atau pekerjaan.",
    media_url: "https://res.cloudinary.com/demo/image/upload/sample.jpg", //kalo video bisa link yt
    media_type: "image", // bisa video
    content_text: `
  Tembung kriya yaiku tembung sing nuduhake tumindak utawa pakaryan.
  Conto:
  - Mangan (makan)
  - Mlaku (berjalan)
  - Nulis (menulis)
  `,
    quiz: {
      question: "Ngendi sing kalebu tembung kriya?",
      options: ["Gedhe", "Mlaku", "Ijo", "Endah"],
      correctAnswer: "Mlaku",
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
