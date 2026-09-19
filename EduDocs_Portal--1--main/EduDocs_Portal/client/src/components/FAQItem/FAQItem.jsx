import { FaChevronDown } from "react-icons/fa";
import styles from "./FAQItem.module.css";

function FAQItem ({question, answer, isOpen, onClick}){
    
    return(
        <div className= {styles.faq}>
            <div 
               className ={styles.question} 
               onClick={onClick}>

                <h3>{question}</h3>

                <span className={`${styles.icon} ${isOpen ? styles.rotate: " "}`}>
                    <FaChevronDown />
                </span>

            </div>

            {isOpen && (
              <div className={styles.answer} >
                <p>{answer}</p>
              </div>
            )}

        </div>
    );
}

export default FAQItem;