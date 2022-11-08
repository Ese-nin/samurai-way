import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Post from '../../../src/Components/Profile/MyPosts/Post/Post';

export default {
  title: 'Example/Post',
  component: Post,
  argTypes: {

  },
} as ComponentMeta<typeof Post>;

const Template: ComponentStory<typeof Post> = (args) => <Post {...args} />;

export const PostExample = Template.bind({});
PostExample.args = {
  message: 'Hello and good-bye',
  likesCount: 2
};
