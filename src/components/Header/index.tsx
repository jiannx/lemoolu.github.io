import Link from 'next/link'
import { IconDeer, DarkSwitch, LngSwitch, Trans, Container } from '@/components';
import { AvatarBadge, Box, Center, Heading, IconButton, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, VStack } from '@chakra-ui/react';
import { HStack, Flex, Avatar, Divider } from '@chakra-ui/react';
import { IconMenu2 } from '@tabler/icons-react';

export default function Header() {
  return (
    <Box w='100%' my={12}>
      <Box
        className="w-full h-full bg-white/70 backdrop-blur"
        style={{ borderBottom: '1px solid var(--color-gray)' }}
      ></Box>
      <Container>
        <Flex justifyContent={"space-between"}>
          <HStack gap={3}>
            <Link href="/">
              <Box border='1px' borderColor='gray' borderRadius={'100%'}>
                <Avatar bg='none' icon={<IconDeer boxSize={6} color='dark' />} >
                  {/* <AvatarBadge boxSize={'1em'} bg='green.500' /> */}
                </Avatar>
              </Box>
            </Link>
            <VStack align="flex-start" justifyContent="space-around" gap={1}>
              <Heading size='sm'>Lemoo 鹿</Heading>
              <Text fontSize='sm'>独立开发者 & 数字游民 & 户外爱好者</Text>
            </VStack>
          </HStack>

          <HStack spacing={6} align={"center"} display={{ base: 'none', md: 'flex' }}>
            <HStack spacing={10}>
              <Link href="/blog">Blog</Link>
              <Link href="/project">Project</Link>
            </HStack>

            <Divider orientation='vertical' h={2} />
            <DarkSwitch />
            <LngSwitch />
          </HStack>

          <Box display={{ base: 'block', md: 'none' }}>
            <Menu >
              <MenuButton
                as={IconButton}
                aria-label='Options'
                icon={<IconMenu2 />}
                variant='ghost'
              />
              <MenuList>
                <MenuItem as="a" href="/blog">
                  Blog
                </MenuItem>
                <MenuItem as="a" href="/project">
                  Project
                </MenuItem>
                <MenuDivider />
                <MenuItem>
                  <DarkSwitch />
                </MenuItem>
                <MenuItem>
                  <LngSwitch />
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>

        </Flex>
      </Container>
    </Box>
  );
}