import { useState } from "react";
import FAQItem from "../FAQItem/FAQItem";
import styles from "./FAQ.module.css";

function FAQ() {
    
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs =[
        {
            id:1,
            question:"How long does the document approval take?",
            answer:"Usually 2-3 working days."
        },
        {
           id:2,
           question:"Can I track my request?",
           answer:"Yes, you can..." 
        },
        {
            
           id:3,
           question:"Is login required",
           answer:"Yes, It is..." 
        
        },
        {
           id:4,
           question:"Which documents can I request",
           answer:"Documents like your TC, Marksheet, Migration." 
        
        }
    ];
    return(
        <section className={styles.FAQ}>
            <h2>Frequently Asked Questions</h2>
            <p className={styles.subtitle}>
                Find answers to the most commonly asked questions about the document request process.
            </p>

        
            <div className={styles.faqs}>
                {faqs.map((faq, index) => (
                    <FAQItem
                       key={faq.id}
                       question={faq.question}
                       answer={faq.answer}
                       
                       isOpen={activeIndex === index}
                       onClick={() =>
                            setActiveIndex(activeIndex === index ? null : index)
                        }

                   />
                ))}
            </div>
        </section>
    )
}

export default FAQ;