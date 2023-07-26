import styles from './Header.module.css';
import Logo from '../../assets/logo.png';

export function Header() {
  return (
    <div className={styles.header}>
      <img src={Logo} alt="" />
      <p>Discografia</p>
    </div>
  )
}