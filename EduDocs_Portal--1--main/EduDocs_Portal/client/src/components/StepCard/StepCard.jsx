import styles from "./StepCard.module.css"

function StepCard({stepNumber, title, description}){
    return(
       <div className={styles.stepCard}>
         <div className={styles.stepNumber}>
            {stepNumber}
         </div>
         <h3>{title}</h3>
         <p>{description}</p>
       </div>
    );
}
export default StepCard;