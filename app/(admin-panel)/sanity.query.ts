import { groq } from "next-sanity";
import client from "./sanity.client";

export async function getFinishedTat() {
    return client.fetch(
        groq`*[_type == "finishedTat"]{
        _id,
        name,
        photo {alt, "image": asset->url},
        healedPhoto,
        clientName,
        clientBrief,
        price,
        time,
        isOriginalDesign        
        }`
    );
}
