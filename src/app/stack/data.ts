interface Stack {
  title: string,
  desc?: string;
  children: Array<{
    title: string;
    desc: string;
    icon?: string;
    url: string;
  }>
}

const stacks: Stack[] = [
  {
    title: 'Design',
    children: [
      { title: '', desc: '', icon: '', url: '' },
    ]
  },

];

export default stacks;