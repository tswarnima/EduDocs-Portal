import hero from "../../assets/hero.svg";
import styles from "./Hero.module.css";
import { useNavigate } from "react-router-dom";
import { isStudentLoggedIn } from "../../api/auth";

function Hero({ content }) {
  const navigate = useNavigate();
  const loggedIn = isStudentLoggedIn();

  const handleGetStarted = () => {
    navigate(loggedIn ? "/dashboard" : "/login");
  };

  return (
    <section className={styles.hero}>
      <div className={styles.left}>
        <h1>{content?.title || "Welcome to EduDocs Portal"}</h1>

        <p>
          {content?.subtitle ||
            "Securely request, track, and manage your academic documents from one place."}
        </p>

        {content?.stats && (
          <div className={styles.stats}>
            <div>
              <strong>{content.stats.totalStudents}</strong>
              <span>Students</span>
            </div>
            <div>
              <strong>{content.stats.totalRequests}</strong>
              <span>Requests</span>
            </div>
            <div>
              <strong>{content.stats.pendingRequests}</strong>
              <span>Pending</span>
            </div>
          </div>
        )}

        <button onClick={handleGetStarted}>Get Started</button>
      </div>

      <div className={styles.right}>
        <img src={hero} alt="Hero" />
      </div>
    </section>
  );
}

export default Hero;
