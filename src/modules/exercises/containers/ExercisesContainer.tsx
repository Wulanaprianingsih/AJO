"use client";
import React from "react";
import ExercisesComponent from "../components/ExercisesComponent";
import { useParams } from "next/navigation";
import {
  getUserExampHistory,
  insertExcercisesHistory,
  insertUserBadge,
} from "services/excerciseService";
import { fetchUserData, updateUserPoint } from "services/userService";
import { useUserStore } from "store/userDataStore";

export default function ExercisesContainer() {
  const KKM = 70;
  const userProfile = useUserStore((state) => state.userProfile);
  const params = useParams();
  const materiId = params.id;

  const calculatePoint = async (point: number, attemptCount: number) => {
    console.log("attemptCount", attemptCount);
    const deduction = [0, 15, 30];
    const percent = deduction[attemptCount] ?? 0;
    console.log("percent", percent);
    return Math.max(0, point - point * (percent / 100));
  };

  const user_id = userProfile?.id ?? "";

  const handleSubmit = async (point: number) => {
    const badges = [];
    const userAttemptCount = await getUserExampHistory(Number(materiId));
    const calculatedPoint = await calculatePoint(point, userAttemptCount);
    const _payload = {
      point: calculatedPoint,
      user_id: user_id,
      material_id: Number(materiId),
    };
    console.log("_payload", _payload);

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
          badges.push({ name: "Ahli Materi" }, { name: "Penyelesai Materi" });
        } else if (calculatedPoint >= KKM) {
          badges.push({ name: "Penyelesai Materi" });
        }
      }

      if (calculatedPoint >= KKM) {
        const currentPoint = userProfile?.points ?? 0;
        const newPoint = currentPoint + calculatedPoint;
        await updateUserPoint(newPoint, user_id);
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

  return <ExercisesComponent onSubmit={handleSubmit} />;
}
