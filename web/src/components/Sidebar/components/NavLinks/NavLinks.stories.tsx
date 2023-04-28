// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof NavLinks> = (args) => {
//   return <NavLinks {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import NavLinks from './NavLinks'

export const generated = () => {
  return <NavLinks />
}

export default {
  title: 'Components/NavLinks',
  component: NavLinks,
} as ComponentMeta<typeof NavLinks>
