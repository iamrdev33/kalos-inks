import { FaUser } from "react-icons/fa6";
import { defineType, defineField } from "sanity";

export default defineType({
  name: 'client',
  title: 'Client',
  type: 'document',
  icon: FaUser,
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
