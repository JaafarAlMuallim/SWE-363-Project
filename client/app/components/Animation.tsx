"use client";

import Lottie from "lottie-react";
import animationData from "../animation.json";

export default function Animation() {
  return <Lottie animationData={animationData} />;
}
