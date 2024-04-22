import { CloseIcon } from '@chakra-ui/icons'
import { Box } from '@chakra-ui/react'
import React from 'react'

function UserBadgeItem({handleFunction,user}) {
  return (
    <Box
    px={2}
    py={1}
    borderRadius={"lg"}
    m={1}
    mb={2}
    variant="solid"
    fontSize={12}
    bg="purple"
    color={'white'}
    cursor={"pointer"}
    onClick={handleFunction}
    >
        {user.name}
        <CloseIcon marginLeft={"5px"}/>
    </Box>
    
  )
}

export default UserBadgeItem