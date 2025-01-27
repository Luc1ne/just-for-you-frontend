import Image from 'next/image';
import Logo from '@/public/images/logo.png';
import styles from '@/styles/frontend/_Navbar.module.scss';
import { FiMessageSquare, FiMusic } from 'react-icons/fi';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { Avatar, Button, Flex, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList } from '@chakra-ui/react';
import { useAuthContext } from '@/context/authContext';

export default function Navbar() {
  const { 'data': session, status } = useSession();
  const { authorization } = useAuthContext();

  const handleGoogleLogOut = async () => {
    signOut({ 'callbackUrl': 'http://localhost:3000' });
    localStorage.clear();
  };

  return (
    <nav className={styles.container}>
      <Link href={'/'}>
        <Image src={Logo} alt="logo" className={styles.logo} height={60} width={60} />
      </Link>
      {status === 'authenticated' &&
        <section className={styles.menu}>
          <Link href={'/story'}>
            <FiMessageSquare className={styles.icon} />
          </Link>
          <Link href={'/recommend'}>
            <FiMusic className={styles.icon} />
          </Link>
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'sm'}
                  src={session?.user?.image || undefined}
                />
              </MenuButton>
              <MenuList>
                <MenuGroup title={`${session?.user?.name} ${authorization}`}>
                  <Link href={'/profile'}><MenuItem>我的帳戶</MenuItem></Link>
                  <MenuDivider />
                  <MenuItem onClick={handleGoogleLogOut}>登出</MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          </Flex>
        </section>
      }
    </nav>
  );
}