"use client";

import React from "react";
import DashboardUserComponent from "../components/DashboardUserComponent";
import { useUserStore } from "store/userDataStore";

export default function DashboardUserContainer() {
  const userData = useUserStore((s) => s.userProfile);
  const role = userData?.role;
  return <DashboardUserComponent role={role} />;
}
