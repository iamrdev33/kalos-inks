'use client'

import { NextStudio } from "next-sanity/studio";
import config from "@/app/(admin-panel)/sanity.config";

export default function Studio() {
  return <NextStudio config={config} />;
}