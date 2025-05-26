export default {
  name: 'portfolio',
  title: 'Portfolio',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Traditional', value: 'traditional' },
          { title: 'Neo Traditional', value: 'neo-traditional' },
          { title: 'Japanese', value: 'japanese' },
          { title: 'Black Work', value: 'black-work' },
          { title: 'Color Work', value: 'color-work' },
          { title: 'Custom', value: 'custom' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'healing',
      title: 'Healing Stage',
      type: 'string',
      options: {
        list: [
          { title: 'Fresh', value: 'fresh' },
          { title: 'Healed', value: 'healed' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    },
  ],
}
