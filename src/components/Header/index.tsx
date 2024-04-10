import Link from 'next/link'
import { IconDeer, DarkSwitch, LngSwitch, Trans, Container } from '@/components';
import { AvatarBadge, Box, Heading, Text, VStack } from '@chakra-ui/react';
import { HStack, Flex, Avatar, Divider } from '@chakra-ui/react';

export default function Header() {
  return (
    <Box w='100%' my={8}>
      <Box
        className="w-full h-full bg-white/70 backdrop-blur"
        style={{ borderBottom: '1px solid var(--color-gray)' }}
      ></Box>
      <Container>
        <Flex justifyContent={"space-between"}>
          <HStack gap={4}>
            <Link href="/">
              <Box border='1px' borderColor='gray.200' borderRadius={'100%'}>
                <Avatar bg='none' icon={<IconDeer boxSize={6} color='black' />} >
                  <AvatarBadge boxSize={'1em'} bg='green.500' />
                </Avatar>
              </Box>
            </Link>
            <VStack align="flex-start" justifyContent="space-around" gap={1}>
              <Heading size='sm'>Lemoo 鹿</Heading>
              <Text fontSize='sm'>独立开发者 & 数字游民 & 户外爱好者</Text>
            </VStack>
          </HStack>

          <HStack spacing='24px' align={"center"}>
            <HStack spacing='24px'>
              <Link href="/"><Trans i18nKey={'home'} /></Link>
              <Link href="/blog"><Trans i18nKey={'article'} /></Link>
              <Link href="/#contact"><Trans i18nKey={'contact'} /></Link>
            </HStack>
            <Divider orientation='vertical' h={2} />
            <HStack spacing={4}>
              <DarkSwitch />
              <LngSwitch />
            </HStack>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}