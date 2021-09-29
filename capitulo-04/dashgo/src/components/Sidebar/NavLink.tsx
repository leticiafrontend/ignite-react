import { Icon, Link, LinkProps, Text } from '@chakra-ui/react'
import React, { ElementType } from 'react'

interface NavLinkProps extends LinkProps {
  icon: ElementType;
  children: string;
}

export const NavLink = ({ icon, children, ...rest }: NavLinkProps) => {
  return (
    <Link display="flex" align="center" {...rest}>
      <Icon as={icon} fontSize="22" />
      <Text ml="4" fontWeight="medium">{children}</Text>
    </Link>
  )
}
