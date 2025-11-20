"use client";
import React, { useEffect, useState } from "react";
import ExercisesComponent from "../components/ExercisesComponent";
import { useParams, useRouter } from "next/navigation";
import {
  getUserExampHistory,
  insertExcercisesHistory,
  insertUserAnswers,
  insertUserBadge,
} from "services/excerciseService";
import { fetchUserData, updateUserPoint } from "services/userService";
import { useUserStore } from "store/userDataStore";
import { useMaterialState } from "store/materialStore";
import { fetchMaterials } from "services/materialService";
import { IMaterialData } from "types/material";

interface IBadge {
  name: string;
}
export default function ExercisesContainer() {
  const KKM = 70;
  const params = useParams();
  const route = useRouter();
  const materiId = params.id;
  const userProfile = useUserStore((state) => state.userProfile);
  const material = useMaterialState((s) => s.materials);
  const setNeedToFetch = useMaterialState((s) => s.setNeedToFetch);
  const [openBadgeModal, setOpenBagdeModal] = useState(false);
  const [badgeName, setBadgeName] = useState("");

  const detailMaterial = material.find(
    (x) => x.id.toString() == materiId?.toString()
  );

  const excercises = detailMaterial?.excercises.map((ex) => ({
    id: ex.id,
    type: ex.image_url ? "image" : "text",
    question: ex.question,
    options: ex.options as unknown as string[],
    answer: ex.answer,
    title: `Latihan ${detailMaterial.title}`,
    image_url: ex.image_url,
  }));

  useEffect(() => {
    if (!detailMaterial) {
      fetchMaterials(Number(materiId));
    }
  }, [detailMaterial, materiId]);

  const checkLevelUp = () => {
    const currentLevel = detailMaterial?.level;
    const list = material?.filter((m) => m.level === currentLevel) ?? [];

    if (list.length === 0) return false;
    const filteredHistory: IMaterialData[] = list.filter(
      (m) => m.id !== Number(materiId)
    );
    console.log("filteredHistory", filteredHistory);
    return filteredHistory.every((m) => {
      const history = m.excercise_history ?? [];
      if (history.length === 0) return false;

      const lastPoint = history[0].point;
      return lastPoint >= KKM;
    });
  };

  const insertUserAnswer = async (answer: Record<number, string>) => {
    const payload = {
      material_id: Number(materiId),
      answer: answer,
      user_id,
    };

    await insertUserAnswers(payload);
  };

  const calculatePoint = async (point: number, attemptCount: number) => {
    const deduction = [0, 15, 30];
    const percent = deduction[attemptCount] ?? 0;
    return Math.max(0, point - point * (percent / 100));
  };

  const user_id = userProfile?.id ?? "";

  const handleSubmit = async (
    point: number,
    answer: Record<number, string>
  ) => {
    setNeedToFetch(true);
    const badges: IBadge[] = [];
    const userAttemptCount = await getUserExampHistory(Number(materiId));
    const calculatedPoint = await calculatePoint(point, userAttemptCount);
    const _payload = {
      point: calculatedPoint,
      user_id: user_id,
      material_id: Number(materiId),
    };

    try {
      await insertExcercisesHistory(_payload);

      if (userAttemptCount > 0 && calculatedPoint >= KKM) {
        badges.push({ name: "Pejuang Remedial" });
        setBadgeName("Pejuang Remedial");
      } else if (userAttemptCount === 2 && calculatedPoint < KKM) {
        setBadgeName("sad");
      } else {
        if (calculatedPoint === 100) {
          badges.push({ name: "Ahli Materi " + detailMaterial?.title });
          setBadgeName("Ahli Materi " + detailMaterial?.title);
        }
      }

      if (calculatedPoint >= KKM) {
        const currentPoint = userProfile?.points ?? 0;
        const newPoint = currentPoint + calculatedPoint;

        const isLevelUp = await checkLevelUp();
        const newLevel = Number(userProfile?.level) + 1;
        const payloadUpdateUser = {
          points: newPoint,
          email: userProfile?.email,
          level: isLevelUp ? newLevel : 0,
        };
        await updateUserPoint(payloadUpdateUser);
        console.log("isLevelUp", isLevelUp);

        if (isLevelUp) {
          badges.push({ name: `Rajin Level ${detailMaterial?.level}` });
          setBadgeName(`Rajin Level ${detailMaterial?.level}`);
        }
        await insertUserAnswer(answer);
        console.log("payload insertUserAnswer", answer);
      }

      const badgesPayload = badges.map((x) => ({
        ...x,
        user_id: user_id,
      }));
      await insertUserBadge(badgesPayload);
      console.log("payload insertUserBadge", badgesPayload);

      await fetchUserData(user_id);
    } catch (e) {
      console.log("error", e);
    }
  };

  const handleCloseModal = () => {
    setOpenBagdeModal(false);
    route.push("/belajar");
  };

  useEffect(() => {
    if (badgeName.length > 0) {
      setOpenBagdeModal(true);
    }
  }, [badgeName]);

  return (
    <ExercisesComponent
      onSubmit={handleSubmit}
      data={excercises}
      userAnswers={detailMaterial?.user_answers?.[0]?.answer}
      handleCloseModal={handleCloseModal}
      openBagdeModal={openBadgeModal}
      badgeName={badgeName}
    />
  );
}
