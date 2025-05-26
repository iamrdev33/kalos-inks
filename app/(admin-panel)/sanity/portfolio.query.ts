import { groq } from "next-sanity";

export const getPortfolioItems = groq`*[_type == "portfolio"] {
  _id,
  title,
  "image": image.asset->url,
  category,
  healing,
  tags
} | order(_createdAt desc)`;
