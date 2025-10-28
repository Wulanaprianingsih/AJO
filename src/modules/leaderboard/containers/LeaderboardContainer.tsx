"use client";
import React, { useEffect } from "react";
import LeaderboardComponent from "../components/LeaderboardComponent";
import { fetchAllUser } from "services/userService";

export default function LeaderboardContainer() {
  // const today = new Date();
  // const dayOfWeek = today.getDay();
  // const fetchMondayBoard = async () => {
  //   const hours = today.getHours();
  // const minutes = today.getMinutes();
  // if (dayOfWeek === 3 && hours === 0 && minutes === 0) {
  // }
  // };

  useEffect(() => {
    fetchAllUser();
  }, []);

  return <LeaderboardComponent />;
}
