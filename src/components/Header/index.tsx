import Link from 'next/link'
import { IconDeer, DarkSwitch, LngSwitch, Trans, Container } from '@/components';
import { Box } from '@chakra-ui/react';
import { HStack, Flex, Avatar, Divider } from '@chakra-ui/react';

export default function Header({
  h
}: {
  h: string;
}) {

  return (
    <Box w='100%' h={h} >
      <Box
        className="w-full h-full bg-white/70 backdrop-blur"
        style={{ borderBottom: '1px solid var(--color-gray)' }}
      ></Box>
      <Container>
        <Flex justifyContent={"space-between"}>
          <Link href="/">
            <Avatar icon={<IconDeer />} />
          </Link>
          <HStack spacing='24px' align={"center"}>
            <HStack spacing='24px'>
              <Link href="/">
                <Trans i18nKey={'home'} />
              </Link>
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