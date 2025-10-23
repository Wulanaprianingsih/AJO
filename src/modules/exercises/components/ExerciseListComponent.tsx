"use client";
import Image from "next/image";
import React from "react";
import { IAnswered, IOptions, IQuestion } from "types/course";
import { Button, Card, Progress } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import MainLayout from "assets/components/layouts/MainLayout";
import EmptyQuestion from "./EmptyQuestion";

interface IProps {
  activeQuestion: IQuestion | null;
  answer: IAnswered[];
  handleAnswer: (id: number, value: IOptions) => void;
  handleNavigate: (isNext: boolean) => Promise<void>;
  index: number;
  point: number;
}

export default function ExerciseListComponent(props: IProps) {
  const { activeQuestion, answer, handleAnswer, handleNavigate, index, point } =
    props;

  const activeAnswer = answer.find((an) => an.id === activeQuestion?.id);

  return (
    <MainLayout>
      {activeQuestion ? (
        <div className="mx-auto container px-4 md:px-10 py-10 bg-[#FCF8E7] min-h-screen">
          <Card
            className="max-w-2xl mx-auto rounded-2xl shadow-md"
            style={{
              backgroundColor: "#FCF8E7",
              border: "2px solid #FCF8E7",
              padding: "32px 28px",
            }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-[#5E331E]">
                Soal {index + 1}
              </h2>
              <p className="text-sm text-[#5E331E] font-medium">
                Poin kamu: <span className="text-[#D4AF37]">{point}</span>
              </p>
            </div>

            <Progress
              percent={((index + 1) / 10) * 100}
              showInfo={false}
              strokeColor="#DAB68A"
              className="mb-6"
            />

            <p className="text-base md:text-lg text-[#5E331E] leading-relaxed mb-4">
              {activeQuestion?.question}
            </p>

            {activeQuestion.image_url && (
              <div className="flex justify-center my-4">
                <Image
                  alt={activeQuestion?.id.toString()}
                  src={activeQuestion.image_url}
                  width={280}
                  height={280}
                  className="rounded-xl object-contain border border-[#E2D3B6] bg-white"
                />
              </div>
            )}

            <div className="space-y-3 mt-6">
              {activeQuestion.options.map((op) => {
                const isSelected = activeAnswer?.answer.label === op.label;

                return (
                  <div
                    key={op.label}
                    onClick={() => handleAnswer(activeQuestion.id, op)}
                    className={`cursor-pointer border-2 rounded-xl px-4 py-3 transition-all duration-200 ${
                      isSelected
                        ? "bg-[#623B0C] text-white border-[#623B0C] shadow-md scale-[1.02]"
                        : "bg-[#FFF9EE] hover:bg-[#F3EAD1] text-[#5E331E] border-[#EADFC7]"
                    }`}
                  >
                    <span className="font-semibold">{op.label}.</span> {op.text}
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between mt-10">
              {index > 0 ? (
                <Button
                  shape="round"
                  icon={<LeftOutlined />}
                  onClick={() => handleNavigate(false)}
                  style={{
                    backgroundColor: "#EADFC7",
                    borderColor: "#EADFC7",
                    color: "#5E331E",
                    fontWeight: 600,
                  }}
                >
                  Kembali
                </Button>
              ) : (
                <div></div>
              )}

              <Button
                shape="round"
                icon={<RightOutlined />}
                iconPosition="end"
                onClick={() => handleNavigate(true)}
                style={{
                  backgroundColor: "#DAB68A",
                  borderColor: "#DAB68A",
                  color: "#5E331E",
                  fontWeight: 600,
                }}
              >
                Selanjutnya
              </Button>
            </div>
          </Card>
        </div>
      ) : (
        <EmptyQuestion />
      )}
    </MainLayout>
  );
}
