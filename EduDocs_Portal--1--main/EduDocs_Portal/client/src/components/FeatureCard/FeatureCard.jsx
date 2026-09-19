import styles from "./FeatureCard.module.css";

function FeatureCard({ icon, title, description }) {
  return (
    <div className={styles.card}>
      {icon}

      <h3>{title}</h3>

      <p>{description}</p>
    </div>
  );
}

export default FeatureCard;