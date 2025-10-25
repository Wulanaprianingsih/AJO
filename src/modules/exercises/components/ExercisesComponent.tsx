"use client";
import MainLayout from "assets/components/layouts/MainLayout";
import React, { useState } from "react";
import { Card, Radio, Button, Progress } from "antd";
import Image from "next/image";
import EmptyQuestion from "./EmptyQuestion";
import { useRouter } from "next/navigation";

interface IQuestion {
  id: number;
  type: "text" | "image" | string;
  question: string;
  options: string[];
  answer: string;
  image_url?: string;
  title: string;
}
interface IExcercise {
  onSubmit: (point: number, answer: Record<number, string>) => Promise<void>;
  data: IQuestion[] | undefined;
  userAnswers: Record<number, string> | undefined;
}

export default function ExercisesComponent(props: IExcercise) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const route = useRouter();

  const { onSubmit, data, userAnswers } = props;

  if (!data || data.length === 0) {
    return (
      <MainLayout>
        <EmptyQuestion />
      </MainLayout>
    );
  }

  const currentQuestion = data[currentIndex];
  const progressPercent = ((currentIndex + 1) / data.length) * 100;

  const handleSelect = (value: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: value });
  };

  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const correctCount = data.filter((q) => answers[q.id] === q.answer).length;

  const handleSubmit = () => {
    if (userAnswers) {
      route.push("/material");
    } else {
      setSubmitted(true);
      onSubmit(correctCount * 10, answers);
    }
  };

  const total = data.length;

  if (submitted) {
    return (
      <MainLayout>
        <div className="min-h-[80vh] bg-[#F8F5EB] p-6 md:p-10 rounded-2xl shadow-sm flex flex-col gap-6 max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-[#5E331E] mb-4">
            Hasil Latihanmu 🎉
          </h2>
          <p className="text-[#5E331E] text-lg mb-2">
            Skor kamu:{" "}
            <span className="font-bold">
              {correctCount}/{total}
            </span>{" "}
            benar
          </p>

          <Progress
            percent={(correctCount / total) * 100}
            strokeColor="#DAB68A"
            trailColor="#EDE3D2"
          />

          <div className="mt-6 !space-y-4 text-left">
            {data.map((q) => {
              const userAnswer = answers[q.id];
              const isCorrect = userAnswer === q.answer;
              return (
                <Card
                  key={q.id}
                  style={{
                    backgroundColor: "#FCF8E7",
                    borderColor: isCorrect ? "#B7E4C7" : "#F5C2C0",
                    borderRadius: 16,
                    padding: "20px",
                  }}
                >
                  <p className="font-semibold text-[#5E331E] mb-2">
                    {q.question}
                  </p>
                  {q.image_url && (
                    <div>
                      <Image
                        src={q.image_url ?? ""}
                        alt={`Soal ${q.id}`}
                        width={300}
                        height={180}
                        className="rounded-lg"
                      />
                    </div>
                  )}
                  <p>
                    Jawaban kamu:{" "}
                    <span
                      className={`font-semibold ${
                        isCorrect ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {userAnswer || "Belum dijawab"}
                    </span>
                  </p>
                  {!isCorrect && (
                    <p className="text-[#5E331E] mt-1">
                      Jawaban benar:{" "}
                      <span className="font-semibold text-green-700">
                        {q.answer}
                      </span>
                    </p>
                  )}
                </Card>
              );
            })}
          </div>

          <Button
            onClick={() => {
              if (correctCount >= 7) {
                route.push("/material");
              } else {
                setSubmitted(false);
                setCurrentIndex(0);
                setAnswers({});
              }
            }}
            style={{
              backgroundColor: "#DAB68A",
              borderColor: "#DAB68A",
              color: "#5E331E",
              fontWeight: 600,
              borderRadius: 20,
              padding: "0 28px",
              height: 42,
              marginTop: 20,
            }}
          >
            {correctCount >= 7 ? "Lanjut ke Materi" : "Ulangi Latihan"}
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-[80vh] bg-[#F8F5EB] p-6 md:p-10 rounded-2xl shadow-sm flex flex-col gap-6 max-w-3xl mx-auto">
        <Progress
          percent={progressPercent}
          showInfo={false}
          strokeColor="#DAB68A"
          trailColor="#EDE3D2"
        />

        <div className="flex justify-between items-center text-[#5E331E]">
          <h2 className="text-lg font-semibold">
            Soal {currentIndex + 1} dari {total}
          </h2>
          <p className="text-sm opacity-70">{currentQuestion.title}</p>
        </div>
        {/* <Button onClick={() => onSubmit(100, answers)}>Test Submit</Button> */}
        <Card
          style={{
            backgroundColor: "#FCF8E7",
            borderColor: "#E3D5B8",
            borderRadius: 16,
            padding: "24px",
          }}
        >
          {currentQuestion.type === "text" ? (
            <h3 className="text-[#5E331E] text-lg font-medium mb-4">
              {currentQuestion.question}
            </h3>
          ) : (
            <>
              <div className="relative w-full h-[250px] mb-4 rounded-xl overflow-hidden">
                <Image
                  src={currentQuestion.image_url ?? ""}
                  alt={`Soal ${currentQuestion.id}`}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-[#5E331E] text-lg font-medium mb-4">
                {currentQuestion.question}
              </h3>
            </>
          )}

          <Radio.Group
            onChange={(e) => handleSelect(e.target.value)}
            value={
              userAnswers
                ? userAnswers[currentQuestion.id]
                : answers[currentQuestion.id]
            }
            className="!flex flex-col gap-2"
            disabled
          >
            {currentQuestion.options.map((op, i) => (
              <Radio
                key={i}
                value={op}
                className={`px-3 py-2 rounded-lg text-[#5E331E] hover:bg-[#F0E8D8] ${
                  answers[currentQuestion.id] === op ? "bg-[#EAD3B3]" : ""
                }`}
              >
                {op}
              </Radio>
            ))}
          </Radio.Group>
        </Card>

        <div className="flex justify-between">
          {currentIndex !== 0 ? (
            <Button
              onClick={handlePrev}
              style={{
                backgroundColor: "#EDE3D2",
                borderColor: "#EDE3D2",
                color: "#5E331E",
                borderRadius: 20,
                fontWeight: 600,
                padding: "0 28px",
                height: 42,
              }}
            >
              Sebelumnya
            </Button>
          ) : (
            <div></div>
          )}
          {currentIndex < total - 1 ? (
            <Button
              onClick={handleNext}
              style={{
                backgroundColor: "#DAB68A",
                borderColor: "#DAB68A",
                color: "#5E331E",
                borderRadius: 20,
                fontWeight: 600,
                padding: "0 28px",
                height: 42,
              }}
            >
              Selanjutnya
            </Button>
          ) : (
            <Button
              type="primary"
              onClick={handleSubmit}
              style={{
                backgroundColor: "#5E331E",
                borderColor: "#5E331E",
                color: "#FCF8E7",
                borderRadius: 20,
                fontWeight: 600,
                padding: "0 28px",
                height: 42,
              }}
            >
              Selesai
            </Button>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
