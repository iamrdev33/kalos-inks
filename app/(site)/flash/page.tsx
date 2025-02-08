import FlashCard from "@/app/(site)/components/flash-card";
import { FlashTat } from "@/lib/definitions";

const flashList: FlashTat[] = [
    { id: '1', name: 'tat1', image: 'https://picsum.photos/600/600/', isTaken: false },
    { id: '2', name: 'tat2', image: 'https://picsum.photos/600/600/', isTaken: false },
    { id: '3', name: 'tat3', image: 'https://picsum.photos/600/600/', isTaken: true },
];

export default function FlashPage() {
    return (
        <div className="py-8 px-4">
            <p className="text-3xl font-bold">Tattoo Flash</p>
            <p className="text-lg font-light mb-4">Here you can browse available designs and see what's already taken!</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {flashList.map((tat: FlashTat) => (
                    <li
                        key={tat.id}
                        className="p-4"
                    >
                        <FlashCard {...tat} />
                    </li>
                ))
                }
            </ul>
        </div>
    );
}
