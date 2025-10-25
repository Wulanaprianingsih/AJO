"use client";
import React, { useEffect } from "react";
import ExercisesComponent from "../components/ExercisesComponent";
import { useParams } from "next/navigation";
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

export default function ExercisesContainer() {
  const KKM = 70;
  const params = useParams();
  const materiId = params.id;
  const userProfile = useUserStore((state) => state.userProfile);
  const material = useMaterialState((s) => s.materials);
  const detailMaterial = material.find(
    (x) => x.id.toString() == materiId?.toString()
  );

  console.log("detailMaterial", detailMaterial);

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

  const checkLevelUp = async () => {
    const getAllMateryByLevel = material.filter(
      (m) => m.level === detailMaterial?.level
    );
    if (getAllMateryByLevel.length === 1) return true;
    return getAllMateryByLevel.every(
      (x) => x.excercise_history?.[0]?.point >= 70
    );
  };

  const insertUserAnswer = async (answer: Record<number, string>) => {
    const payload = {
      material_id: Number(materiId),
      answer: answer,
      user_id,
    };

    await insertUserAnswers(payload);
    console.log("payload", payload);
  };

  const calculatePoint = async (point: number, attemptCount: number) => {
    console.log("attemptCount", attemptCount);
    const deduction = [0, 15, 30];
    const percent = deduction[attemptCount] ?? 0;
    console.log("percent", percent);
    return Math.max(0, point - point * (percent / 100));
  };

  const user_id = userProfile?.id ?? "";

  const handleSubmit = async (
    point: number,
    answer: Record<number, string>
  ) => {
    const badges = [];
    const userAttemptCount = await getUserExampHistory(Number(materiId));
    const calculatedPoint = await calculatePoint(point, userAttemptCount);
    const _payload = {
      point: calculatedPoint,
      user_id: user_id,
      material_id: Number(materiId),
    };

    try {
      await insertExcercisesHistory(_payload);

      if (userAttemptCount === 2) {
        if (calculatedPoint < KKM) {
          alert(
            "Kamu perlu mempelajari ulang materi ini sebelum mencoba lagi."
          );
        } else {
          badges.push({
            name: "Pejuang Remedial",
          });
        }
      } else {
        if (calculatedPoint === 100) {
          badges.push({ name: "Ahli Materi " + detailMaterial?.title });
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

        if (isLevelUp) {
          badges.push({ name: `Rajin Level ${detailMaterial?.level}` });
          alert(
            `🎉 Hebat! Kamu telah naik ke Level ${newLevel}! Materi baru sudah terbuka 🔓`
          );
        }
        await insertUserAnswer(answer);
      }

      const badgesPayload = badges.map((x) => ({
        ...x,
        user_id: user_id,
      }));
      await insertUserBadge(badgesPayload);

      await fetchUserData(user_id);
    } catch (e) {
      console.log("error", e);
    }
  };

  return (
    <ExercisesComponent
      onSubmit={handleSubmit}
      data={excercises}
      userAnswers={detailMaterial?.user_answers?.[0].answer}
    />
  );
}
