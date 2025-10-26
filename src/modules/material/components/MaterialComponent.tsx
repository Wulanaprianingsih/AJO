"use client";
import MainLayout from "assets/components/layouts/MainLayout";
import React, { Dispatch, SetStateAction, useState } from "react";
import { IDetailCourse } from "types/course";
import EmptyMaterial from "./EmptyMaterial";
import Image from "next/image";
import { Button, Radio, Card } from "antd";

interface IProps {
  course: IDetailCourse;
  handleNavigate: () => void;
  selectedOption: string;
  setSelectedOption: Dispatch<SetStateAction<string>>;
}

export default function MaterialComponent({
  course,
  handleNavigate,
  selectedOption,
  setSelectedOption,
}: IProps) {
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  if (!course) return <EmptyMaterial />;

  const handleOptionSelect = (value: string) => {
    setSelectedOption(value);
    setIsAnswered(true);
    setIsCorrect(value === course.quiz?.answer);
  };

  const getEmbedUrl = (url: string) => {
    if (url.includes("youtube.com/watch")) {
      return url.replace("watch?v=", "embed/");
    }
    if (url.includes("youtu.be/")) {
      const videoId = url.split("/").pop()?.split("?")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  };
  console.log("course", course);

  return (
    <MainLayout>
      <div className="min-h-[80vh] bg-[#F8F5EB] p-6 md:p-10 rounded-2xl shadow-sm flex flex-col gap-8">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-[#5E331E]">{course.title}</h1>
          <p className="text-[#5E331E] max-w-2xl mx-auto text-base md:text-lg">
            {course.description || "Deskripsi materi belum tersedia."}
          </p>
        </div>

        {course.media_url && (
          <div className="flex justify-center">
            {course.media_type === "video" ? (
              <div className="w-full max-w-3xl aspect-video rounded-2xl overflow-hidden shadow-md">
                <iframe
                  src={getEmbedUrl(course.media_url)}
                  title={course.title}
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            ) : (
              <div className="relative w-full max-w-3xl h-[350px] rounded-2xl overflow-hidden shadow-md">
                <Image
                  src={course.media_url}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
        )}

        <Card
          style={{
            backgroundColor: "#FCF8E7",
            borderColor: "#E3D5B8",
            borderRadius: 16,
            padding: "20px",
          }}
        >
          <h2 className="text-lg font-semibold mb-3 text-[#5C3B1E]">
            Penjelasan Materi
          </h2>
          <div
            className="card-content text-[#5C3B1E] leading-relaxed whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: course.content_text }}
          />
        </Card>

        <Card
          style={{
            backgroundColor: "#FCF8E7",
            borderColor: "#E3D5B8",
            borderRadius: 16,
            padding: "20px",
          }}
        >
          <h2 className="text-lg font-semibold text-[#5E331E] mb-3">
            Contoh Latihan Soal
          </h2>
          <p className="mb-4 text-[#5E331E]">
            1. {course.quiz?.question || "Pertanyaan latihan tidak tersedia."}
          </p>

          <Radio.Group
            onChange={(e) => handleOptionSelect(e.target.value)}
            value={selectedOption}
            className="flex flex-col gap-2"
          >
            {course.quiz?.options?.map((op, i) => (
              <Radio
                key={i}
                value={op}
                disabled={isAnswered}
                className={`px-3 py-2 rounded-lg text-[#5E331E] hover:bg-[#F0E8D8] ${
                  selectedOption === op ? "bg-[#EAD3B3]" : ""
                }`}
              >
                {op}
              </Radio>
            )) || <p>Belum ada opsi jawaban</p>}
          </Radio.Group>

          {isAnswered && (
            <p
              className={`mt-3 font-semibold ${
                isCorrect ? "text-green-600" : "text-red-600"
              }`}
            >
              {isCorrect
                ? "✅ Jawaban kamu benar!"
                : `❌ Jawaban kamu salah. Yang benar adalah "${course.quiz?.answer}".`}
            </p>
          )}
        </Card>

        <div className="flex justify-end">
          <Button
            type="primary"
            onClick={handleNavigate}
            style={{
              backgroundColor: "#DAB68A",
              borderColor: "#DAB68A",
              color: "#5E331E",
              fontWeight: 600,
              borderRadius: 20,
              padding: "0 28px",
              height: 42,
            }}
          >
            Latihan Soal
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}
