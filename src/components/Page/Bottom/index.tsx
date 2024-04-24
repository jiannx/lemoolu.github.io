import React from "react";
import Container from '../../Container';
import { Text, Flex, Avatar, SimpleGrid, VStack, Box, Center, Heading, HStack, } from "@chakra-ui/react";
import { IconDeer, Trans, Link, Copy } from '@/components';
import { IconCurrentLocation, IconBrandWechat, IconMail, IconBrandWhatsapp, IconBrandX } from '@tabler/icons-react';

export default function Bottom() {
  return (
    <Box mt={100} backgroundColor={'lightGray'}>
      <Container>
        <Flex
          direction={{
            base: 'column',
            md: 'row',
          }}
          align={'center'}
          py={20}
        >
          <Box m={10}>
            <Avatar bg={'dark'} size='xl' icon={<IconDeer boxSize={14} color='white' />} ></Avatar>
          </Box>
          <Box>
            <Heading size='md' mb={2}>Lemoo 鹿</Heading>
            <Text mb={2}>Indie Hacker & Digital Nomad & Outdoor</Text>
            <HStack gap={4}>
              <Copy copyTip="Copy Wechat" copyData="lomo_hao">
                <IconBrandWechat stroke={1} />
              </Copy>
              <Copy copyTip="Copy Email" copyData="lemoo.lu@gmail.com">
                <IconMail stroke={1} />
              </Copy>
              {/* <Link>
                <IconBrandWhatsapp stroke={1} />
              </Link> */}
              <Link href="https://twitter.com/LemooLu" target="_blank">
                <IconBrandX stroke={1} />
              </Link>
              <Copy copyTip="Hangzhou, China" copyData="Hangzhou, China">
                <IconCurrentLocation stroke={1} />
              </Copy>
            </HStack>
          </Box>

          {/* <SimpleGrid flexWrap={'wrap'} columns={{ base: 1, md: 4 }}>
            <VStack m={4}>
              <IconCurrentLocation stroke={1} />
              <Trans i18nKey='addressInfo' />
            </VStack>
            <VStack m={4}>
              <IconBrandWechat stroke={1} />
              <Text>lomo_hao</Text>
            </VStack>
            <VStack m={4}>
              <IconBrandWhatsapp stroke={1} />
              <Text>whatsapp</Text>
            </VStack>
            <VStack m={4}>
              <IconMail stroke={1} />
              <Text>lemmoo.lu@gmail.com</Text>
            </VStack>
          </SimpleGrid> */}
        </Flex>

        <Center h={8} fontSize={14}>
          © 2024 by LemoooLu
        </Center>
      </Container>
    </Box>
  )
}