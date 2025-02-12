import { defineType, defineField } from "sanity";

export default defineType({
  name: 'client',
  title: 'Client',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'brief',
      title: 'Client Brief',
      placeholder: "Brief reminder of the client",
      type: 'text',
    }),
    defineField({
      name: 'contact',
      title: 'Contact info',
      type: 'string',
    }),
  ],
})
