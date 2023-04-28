// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof NavLink> = (args) => {
//   return <NavLink {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import NavLink from './NavLink'

export const generated = () => {
  return <NavLink />
}

export default {
  title: 'Components/NavLink',
  component: NavLink,
} as ComponentMeta<typeof NavLink>
