import { FlashTat } from "@/lib/definitions";
import Image from "next/image";

export default function FlashCard(data: FlashTat) {
    return (
        <div className="text-center rounded-xl transition-transform transform hover:scale-105 hover:shadow-xl hover:border-indigo-500">
            <div className="relative overflow-hidden group">
                <Image
                    src={data.image}
                    width={600}
                    height={600}
                    className="w-full object-cover rounded-md mb-4"
                    alt="Screenshots of the dashboard project showing desktop version"
                />
                <p>{data.name}</p>
            </div>
        </div>
    );
}