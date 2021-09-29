import { Box, Flex, Text, Avatar } from '@chakra-ui/react'

export const Profile = () => {
  return (
    <Flex align="center">
      <Box mr="4" textAlign="right">
        <Text>Letícia Silva</Text>
        <Text color="gray.300" fontSize="small">
          leticia.alesilva@outlook.com
            </Text>
      </Box>
      <Avatar
        size="md"
        name="Letícia Silva"
        src="https://avatars.githubusercontent.com/u/56488480?v=4"
      />
    </Flex>
  )
}
