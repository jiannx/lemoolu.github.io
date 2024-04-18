import { IconDeer, DarkSwitch, LngSwitch, Trans, Container } from '@/components';
import { AvatarBadge, Box, Center, Heading, IconButton, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, VStack } from '@chakra-ui/react';
import { HStack, Flex, Divider } from '@chakra-ui/react';
import { IconMenu2 } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import Avatar from './Avatar';
import Link from '../Link';


export default function Header() {
  return (
    <Box w='100%' my={12} position={'sticky'} top={0} zIndex={100} overflow={'hidden'} py={1}>
      <Box
        w={'100%'} h={'100%'} left={0} top={0}
        position={'absolute'} zIndex={-1}
        backdropFilter='auto' backdropBlur='8px'
      ></Box>
      <Container>
        <Flex justifyContent={"space-between"}>
          <HStack gap={3}>
            <Link href="/">
              <Avatar />
            </Link>
            <VStack align="flex-start" justifyContent="space-around" gap={1}>
              <Heading size='sm'>Lemoo 鹿</Heading>
              <Text fontSize='sm'>独立开发者 & 数字游民 & 户外爱好者</Text>
            </VStack>
          </HStack>

          <HStack spacing={6} align={"center"} display={{ base: 'none', md: 'flex' }} >
            <HStack spacing={10} fontWeight={500}>
              <Link href="/blog" >Blog</Link>
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