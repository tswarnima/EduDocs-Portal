import StepCard from "../StepCard/StepCard";
import styles from "./HowItWorks.module.css";
import { Link } from "react-router-dom";

function HowItWorks(){
    
    const steps = [
        {
            id:1,
            stepNumber:1,
            title:"Register/Login",
            description:"Create your account."
        },
        {
            id:2,
            stepNumber:2,
            title:"Request Documents",
            description:"Fill out the request form."
        },
        {
            id:3,
            stepNumber:3,
            title:"Track Status",
            description:"Check your request status."
        },
        {
            id:4,
            stepNumber:4,
            title:"Download Documents",
            description:"Download your approved document."
        }
    ]

    return(
        <section className={styles.howItWorks}>
            <h2>How It Works</h2>
            <p>
                Follow these steps to request and receive your academic documents.
            </p>

        
            <div className={styles.steps}>
                {steps.map((step) => (
                    <StepCard
                       key={step.id}
                       stepNumber={step.stepNumber}
                       title={step.title}
                       description={step.description}
                   />
                ))}
            </div>

            <Link to="/login" className={styles.requestBtn}>
                Request Documents
            </Link>

        </section>
        
    )

}
export default HowItWorks;