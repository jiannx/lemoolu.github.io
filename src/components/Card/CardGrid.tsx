import { Grid, GridItem } from '@chakra-ui/react'

export function CardGrid({ children }) {
  return (
    <Grid
      // templateColumns={{ base: 'repeat(auto-fill, 320px)' }} // 动态列
      templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} // 动态列
      gap={6} // 间距
      autoFlow={"row dense"} // 默认将行填充满
      autoRows={'300px'} // 默认行高
      // justifyContent={'space-between'}
    >
      {children}
    </Grid>
  )
}