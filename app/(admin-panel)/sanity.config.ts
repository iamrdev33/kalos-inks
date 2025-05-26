import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import Logo from './components/Logo';
import { schemaTypes } from './schemaTypes';

export default defineConfig({
  name: 'default',
  title: 'Kalos Inks',

  projectId: 'vgix5e2k',
  dataset: 'production',

  basePath: '/admin-panel',
  plugins: [structureTool(), visionTool()],

  icon: Logo,
  schema: {
    types: schemaTypes,
  },
})
