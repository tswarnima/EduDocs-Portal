import styles from "./Features.module.css";

import {
  FaFileAlt,
  FaHistory,
  FaSearch,
  FaUser,
} from "react-icons/fa";

import FeatureCard from "../FeatureCard/FeatureCard";

function Features() {

  const features = [
    {
      id: 1,
      icon: <FaFileAlt />,
      title: "Request Documents",
      description:
        "Apply for certificates, transcripts, and other documents.",
    },
    {
      id: 2,
      icon: <FaSearch />,
      title: "Track Requests",
      description:
        "Track the status of your document requests in real time.",
    },
    {
      id: 3,
      icon: <FaHistory />,
      title: "Request History",
      description:
        "View all your previous document requests in one place.",
    },
    {
      id: 4,
      icon: <FaUser />,
      title: "Manage Profile",
      description:
        "Update your profile and account information easily.",
    },
  ];

  return (
    <section className={styles.featuresSection}>

      <h2>Our Features</h2>

      <p>
        Everything you need to request, track and manage your academic
        documents.
      </p>

      <div className={styles.features}>
        {features.map((feature) => (
          <FeatureCard
            key={feature.id}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>

    </section>
  );
}

export default Features;