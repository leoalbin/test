// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof HamburgerButton> = (args) => {
//   return <HamburgerButton {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import HamburgerButton from './HamburgerButton'

export const generated = () => {
  return <HamburgerButton />
}

export default {
  title: 'Components/HamburgerButton',
  component: HamburgerButton,
} as ComponentMeta<typeof HamburgerButton>
