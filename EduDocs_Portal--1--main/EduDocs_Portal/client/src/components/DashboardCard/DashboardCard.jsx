import styles from "./DashboardCard.module.css";

function DashboardCard({ title, description, icon, onClick }) {
    return (
        <div
            className={styles.card}
            onClick={onClick}
        >
            <div className={styles.icon}>
                {icon}
            </div>

            <h3>{title}</h3>

            <p>{description}</p>
        </div>
    );
}

export default DashboardCard;