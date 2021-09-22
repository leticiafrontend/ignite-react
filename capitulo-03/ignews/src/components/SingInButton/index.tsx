import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

import styles from './styles.module.scss';

export const SingInButton = () => {
  const isUserLoggedIn = true;
  return isUserLoggedIn ? (
    <button type="button" className={styles.singInButton}>
      <FaGithub color="#84d361" />
      Sign in with Github
      <FiX color="#737380" className={styles.closeIcon} />
    </button>
  ) : (
    <button type="button" className={styles.singInButton}>
      <FaGithub color="#eba417" />
      Sign in with Github
    </button>
  );
};
