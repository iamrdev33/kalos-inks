import { FaOtter } from "react-icons/fa6";
import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'finishedTat',
    title: 'Finished Tat',
    type: 'document',
    icon: FaOtter,
    preview: {
        select: {
            title: 'name',
            subtitle: 'clientName'
        }
    },
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
        }),
        defineField({
            name: 'photo',
            title: 'Tattoo Photo',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'healedPhoto',
            title: 'Healed Tattoo Photo',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'clientName',
            title: 'Client Name',
            type: 'string',
        }),
        defineField({
            name: 'clientBrief',
            title: 'Client Brief',
            placeholder: "Brief reminder (1-2 lines) of the client and their story",
            type: 'text',
        }),
        defineField({
            name: 'price',
            title: 'Price',
            type: 'number',
        }),
        defineField({
            name: 'time',
            title: 'Time Taken',
            placeholder: 'How much time did it take you? (Breaks not included) e.g. 2:30 or 0:45',
            type: 'string',
        }),
        defineField({
            name: 'isOriginalDesign',
            title: 'Original Design?',
            type: 'boolean',
        }),
    ],
})