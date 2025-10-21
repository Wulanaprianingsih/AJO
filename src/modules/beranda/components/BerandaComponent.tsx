"use client";
import React from "react";
import MainLayout from "assets/components/layouts/MainLayout";
import Image from "next/image";
import { Card, Button, Row, Col } from "antd";

import bgBatik from "assets/images/bg_batik.png";
import dashboardIllust from "assets/images/dashboard_illust.png";
import rewardIcon from "assets/icons/reward.png";
import historyIcon from "assets/icons/history.png";
import aksaraIcon from "assets/images/aksara-jawa.png";
import levelIcon from "assets/icons/level_up.png";
import pointIcon from "assets/icons/point.png";
import badgeIcon from "assets/images/badge_aksara.png";

export default function BerandaComponent() {
  return (
    <MainLayout>
      <div className="space-y-6 px-4 md:px-6 lg:px-8">
        <div
          className="rounded-2xl shadow relative overflow-hidden flex flex-col md:flex-row justify-between items-center px-6 py-3 text-white"
          style={{
            backgroundImage: `url(${bgBatik.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="z-10 md:w-2/3 space-y-2 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-semibold italic">
              Sugeng rawuh!
            </h2>
            <p className="text-base md:text-lg leading-snug font-medium max-w-lg mx-auto md:mx-0">
              Ayo sinau basa Jawa, ben dadi generasi penerus budaya!
            </p>
          </div>

          <div className="z-10 md:w-1/3 mt-4 md:mt-0 flex justify-center">
            <Image
              src={dashboardIllust}
              alt="Ilustrasi Dashboard"
              width={140}
              height={140}
              className="object-contain drop-shadow-md"
            />
          </div>

          <div className="absolute inset-0 bg-[#5E331E]/40 rounded-2xl" />
        </div>

        <Card
          title={
            <div className="flex items-center gap-2">
              <Image src={rewardIcon} alt="Pencapaian" width={24} height={24} />
              <span className="font-semibold text-[#5E331E] text-base md:text-lg">
                Pencapaian
              </span>
            </div>
          }
          className="rounded-2xl border-0 shadow-sm"
          style={{ backgroundColor: "#FCF8E7" }}
        >
          <Row gutter={[16, 16]} justify="space-around">
            <Col xs={24} sm={8}>
              <Card
                className="text-center border rounded-xl h-full flex flex-col justify-center"
                style={{
                  backgroundColor: "#FCF8E7",
                  borderColor: "#A3D977",
                  minHeight: 150,
                  padding: "16px",
                }}
              >
                <div className="flex flex-col items-center justify-center">
                  <Image
                    src={levelIcon}
                    alt="Level"
                    width={28}
                    height={28}
                    className="mb-1"
                  />
                  <h2 className="text-2xl font-bold text-green-800">2</h2>
                  <p className="text-sm text-[#5E331E] font-medium">
                    Bocah Wicara
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Level</p>
                </div>
              </Card>
            </Col>

            <Col xs={24} sm={8}>
              <Card
                className="text-center border rounded-xl h-full flex flex-col justify-center"
                style={{
                  backgroundColor: "#FCF8E7",
                  borderColor: "#FFD166",
                  minHeight: 150,
                  padding: "16px",
                }}
              >
                <div className="flex flex-col items-center justify-center">
                  <Image
                    src={pointIcon}
                    alt="Poin"
                    width={28}
                    height={28}
                    className="mb-1"
                  />
                  <h2 className="text-2xl font-bold text-yellow-700">180</h2>
                  <p className="text-sm text-[#5E331E] font-medium">
                    Total Poin
                  </p>
                </div>
              </Card>
            </Col>

            <Col xs={24} sm={8}>
              <Card
                className="text-center border rounded-xl h-full flex flex-col justify-center"
                style={{
                  backgroundColor: "#FCF8E7",
                  borderColor: "#4CB274",
                  minHeight: 150,
                  padding: "16px",
                }}
              >
                <div className="flex flex-col items-center justify-center">
                  <Image
                    src={badgeIcon}
                    alt="Badge"
                    width={40}
                    height={40}
                    className="mb-1"
                  />
                  <h2 className="text-base font-semibold text-orange-700">
                    Aksara Sakti
                  </h2>
                  <p className="text-sm text-[#5E331E] font-medium">Badge</p>
                </div>
              </Card>
            </Col>
          </Row>
        </Card>

        <Card
          title={
            <div className="flex items-center gap-2">
              <Image
                src={historyIcon}
                alt="Materi Saat Ini"
                width={24}
                height={24}
              />
              <span className="font-semibold text-[#5E331E] text-base md:text-lg">
                Materi Saat Ini
              </span>
            </div>
          }
          className="rounded-2xl border-0 shadow-sm ]"
          style={{ backgroundColor: "#FCF8E7", marginTop: 24 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-center md:text-left">
              <Image
                src={aksaraIcon}
                alt="Aksara Jawa"
                width={64}
                height={64}
                className="object-contain"
              />
              <div>
                <h3 className="text-lg font-semibold text-[#5E331E]">
                  Aksara Jawa
                </h3>
                <p className="text-sm text-[#5E331E] max-w-[250px] md:max-w-none">
                  Belajar huruf - huruf dasar, sandhangan, dan pasangan.
                </p>
              </div>
            </div>
            <Button type="primary" className="!rounded-full px-6">
              Lanjut
            </Button>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
