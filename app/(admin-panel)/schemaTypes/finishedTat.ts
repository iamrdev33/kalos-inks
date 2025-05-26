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
            subtitle: 'client.name',
            media: 'photo',
        },
        prepare({ title, subtitle, media }) {
            return {
                title,
                subtitle,
                media: media || FaOtter,
            }
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
            name: 'client',
            title: 'Client',
            type: 'reference',
            to: [{ type: 'client' }],
        } as any),
        defineField({
            name: 'story',
            title: 'Story behind the tattoo',
            description: 'If you know about it..',
            type: 'string',
        }),
        defineField({
            name: 'price',
            title: 'Price',
            type: 'number',
        }),
        defineField({
            name: 'time',
            title: 'Time Taken',
            description: 'How much time did it take you? (Breaks not included) e.g. 2:30 or 0:45',
            type: 'string',
        }),
        defineField({
            name: 'isOriginalDesign',
            title: 'Original Design?',
            type: 'boolean',
        }),
        defineField({
            name: 'tattooStyle',
            title: 'Tattoo Style',
            type: 'string',
            // type: 'array',
            // of: [{ type: 'string' }],
            options: {
                list: [
                    { title: 'Fine Line', value: 'fine-line' },
                    { title: 'Single Needle', value: 'single-needle' },
                    { title: 'Dot Work', value: 'dot-work' },
                    { title: 'Lettering', value: 'lettering' },
                    { title: 'Ornamental', value: 'ornamental' },
                    { title: 'Realistic', value: 'realistic' },
                    { title: 'Microrealistic', value: 'microrealistic' },
                    { title: 'Coloured', value: 'coloured' },
                    { title: 'Minimalistic', value: 'minimalistic' },
                    { title: 'Geometric', value: 'geometric' },
                    { title: 'Abstract', value: 'abstract' },
                    { title: 'Negative space', value: 'negative-space' },
                    { title: 'Black & Grey', value: 'black-grey' },
                    { title: 'Other', value: 'other' },
                ],
            },
        }),
        defineField({
            name: 'customStyle',
            title: 'Custom Style',
            type: 'string',
            hidden: ({ parent }) => parent?.tattooStyle !== 'other',
        }),
    ],
})