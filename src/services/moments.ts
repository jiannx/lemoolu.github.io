
export interface Moment {
  /** 唯一id标识 */
  hash: string;
  /** 内容 */
  content: string;
  /** 描述 */
  fromTitle: string;
  /** 文章内容 */
  fromLink: string;
  // 日期
  date: string;
}

export async function momentsGetList(): Promise<Moment[]> {
  return [
    {
      hash: '4',
      content: "不要陷入工具的陷阱，以最简的方式去组织个人知识库。知识库的目的不是收集，而是整理",
      fromTitle: '小心效率陷阱：為什麼你不需要"第二大腦"',
      fromLink: 'https://www.youtube.com/watch?v=5kNCcpM61eo',
      date: ''
    },
    {
      hash: '3',
      content: '互联网的本质是移动比特（信息）',
      fromTitle: '《数字化生存》',
      fromLink: '',
      date: ''
    }, 
    {
      hash: '1',
      content: '不要把职业（career）当成某一件具体的事情，这是人类发明的最危险、最令人窒息的概念之一，也是大多数梦想和直觉的敌人',
      fromTitle: '科技爱好者周刊（第 281 期）',
      fromLink: 'https://www.ruanyifeng.com/blog/2023/12/weekly-issue-281.html',
      date: ''
    }, 
    {
      hash: '2',
      content: '每周都是一年的2%',
      fromTitle: '科技爱好者周刊（第 293 期）',
      fromLink: 'https://www.ruanyifeng.com/blog/2024/03/weekly-issue-293.html',
      date: ''
    }, 
  ]
}