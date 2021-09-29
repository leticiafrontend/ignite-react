import { Icon, Link as LinkLib, LinkProps, Text } from '@chakra-ui/react'
import { ElementType } from 'react'
import { ActiveLink } from '../ActiveLink'

interface NavLinkProps extends LinkProps {
  icon: ElementType;
  children: string;
  href: string;
}

export const NavLink = ({ icon, children, href, ...rest }: NavLinkProps) => {
  return (
    <ActiveLink href={href} passHref>
      <LinkLib display="flex" align="center" {...rest}>
        <Icon as={icon} fontSize="22" />
        <Text ml="4" fontWeight="medium">{children}</Text>
      </LinkLib>
    </ActiveLink>
  )
}
