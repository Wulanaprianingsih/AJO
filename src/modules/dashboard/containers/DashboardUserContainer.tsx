"use client";

import React from "react";
import DashboardUserComponent from "../components/DashboardUserComponent";
import { useUserStore } from "store/userDataStore";
import ahliMateri from "assets/badges/ahli_materi.png";
import pejuang_remedial from "assets/badges/pejuang_remedial.png";
import rajin_level1 from "assets/badges/rajin_level1.png";
import rajin_level2 from "assets/badges/rajin_level2.png";
import rajin_level3 from "assets/badges/rajin_level3.png";

export default function DashboardUserContainer() {
  const userData = useUserStore((s) => s.userProfile);
  const role = userData?.role;

  const dashboardData = {
    point: userData?.points ?? 0,
    badge: userData?.user_badges?.[0]?.name ?? "",
    level: userData?.level ?? 1,
  };

  const renderBadgeImg = () => {
    const badge = dashboardData.badge;
    if (badge.includes("Ahli Materi")) {
      return ahliMateri;
    } else if (badge === "Pejuang Remedial") {
      return pejuang_remedial;
    } else if (badge === "Rajin Level 1") {
      return rajin_level1;
    } else if (badge === "Rajin Level 2") {
      return rajin_level2;
    } else {
      return rajin_level3;
    }
  };

  return (
    <DashboardUserComponent
      role={role}
      dashboardData={dashboardData}
      badgeImg={renderBadgeImg()?.src}
    />
  );
}
