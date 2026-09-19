import { NavLink } from "react-router-dom";
import styles from "./Footer.module.css";

function Footer() {
    
    const getLinkClass = ({ isActive }) =>
             isActive ? `${styles.link} ${styles.active}` : styles.link;

    return (
        <footer className={styles.footer}>

          <div className={styles.footerContent}>

            <div className={styles.brand}>

                <h2>EduDocs Portal</h2>

                <p>
                    Making academic document requests simple,
                    secure, and hassle-free.
               </p>

           </div>

           <div className={styles.links}>

               <h3>Quick Links</h3>

               <ul>
                   <li>
                        <NavLink to="/" className={ getLinkClass }>
                                Home
                        </NavLink>
                  </li>
                   <li>
                        <NavLink to="/login" className ={ getLinkClass }> 
                                Login
                        </NavLink>
                   </li>
                   <li>
                        <NavLink to="/register" className={getLinkClass}> 
                               Register
                        </NavLink>
                   </li>
                   <li>
                        <NavLink to="/track-request" className={ getLinkClass }>
                               Track Request
                        </NavLink>
                   </li>
               </ul>

           </div>

           <div className={styles.contact}>

             <h3>Contact Us</h3>

             <ul>
                 <li>
                      Email:
                         <a href="mailto:support@edudocs.com" className ={styles.link}>
                            support@edudocs.com
                         </a>
                 </li>
                  
                  <li>
                       Phone:
                          <a href="tel:+919876543210" className = {styles.link}>
                              +91 98765 43210
                         </a>
                 </li>
                 <li>Address: Lucknow, Uttar Pradesh</li>
             </ul>

          </div>

          <div className={styles.resources}>

              <h3>Resources</h3>

              <ul>
                  <li>
                      <NavLink to="/help" className={getLinkClass}>
                            Help Center
                      </NavLink>
                  </li>
                  <li>
                       <NavLink to="/privacy" className={getLinkClass}>
                            Privacy Policy
                       </NavLink>
                  </li>
                  <li>
                       <NavLink to="/terms" className={getLinkClass}>
                            Terms & Conditions
                       </NavLink>
                  </li>
                  <li>
                        <NavLink to="/support" className={getLinkClass}>
                             Support
                        </NavLink>
                  </li>
              </ul>

            </div>

          </div>

          <div className={styles.bottom}>
              <p>© 2026 EduDocs Portal. All rights reserved.</p>
          </div>

        </footer>
    );

}

export default Footer;