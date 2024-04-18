import { Text, Flex, Avatar, SimpleGrid, VStack, Box } from "@chakra-ui/react";
import { CardItem } from "../CardItem";
import { IconDeer, Trans } from '@/components';
import { IconCurrentLocation, IconBrandWechat, IconMail, IconBrandWhatsapp } from '@tabler/icons-react';


const info = {
  address: { icon: IconCurrentLocation, text: 'Hangzhou, China' },
  wechat: { icon: IconBrandWechat, text: 'lomo_hao' },
  whatsapp: { icon: IconBrandWhatsapp, text: 'whatsapp' },
  email: { icon: IconMail, text: 'lemmoo.lu@gmail.com' },
}

export default function Person({

}: {

  }) {
  return (
    <CardItem colSpan={3} asBox>
      <Flex
        justifyContent="center"
        h="100%"
        direction={{
          base: 'column',
          md: 'row',
        }}
        align={'center'}
      >
        <Box m={10}>
          <Avatar bg={'dark'} size='2xl' icon={<IconDeer boxSize={20} color='white' />} ></Avatar>
        </Box>

        <SimpleGrid flexWrap={'wrap'} columns={{ base: 1, md: 4 }}>
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
        </SimpleGrid>
      </Flex>
    </CardItem>
  );
}