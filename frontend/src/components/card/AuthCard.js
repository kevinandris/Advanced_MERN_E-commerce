import styles from "./Card.module.scss";

const AuthCard = ({ children, cardClass }) => {
  return <div className={`${styles.authCard} ${cardClass}`}>{children}</div>;
};

export default AuthCard;
