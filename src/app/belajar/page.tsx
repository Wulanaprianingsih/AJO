"use client";
import MaterialListAdminContainer from "modules/material/containers/MaterialListAdminContainer";
import MaterialListContainer from "modules/material/containers/MaterialListContainer";
import { useUserStore } from "store/userDataStore";

export default function MaterialListPage() {
  const userData = useUserStore((s) => s.userProfile);
  const role = userData?.role;
  if (role === "admin") {
    return <MaterialListAdminContainer />;
  } else {
    return <MaterialListContainer />;
  }
}
