import { NavLink } from "react-router-dom";
import styles from './Footer.module.css';
import { PlusCircle, ArrowArcLeft } from 'phosphor-react'
import { IFooter } from "../../interfaces";

export function Footer({ link, icon, title }: IFooter) {
  return (
    <div className={styles.link} >
      <NavLink to={link} >
        {icon === 'PlusCircle' ? <PlusCircle size={24} /> : <ArrowArcLeft />}
        {title}
      </NavLink>
    </div>

  );
}