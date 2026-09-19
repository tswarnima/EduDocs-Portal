import { useState, useEffect } from "react";
import styles from "./Profile.module.css";

import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { getProfile, updateProfile } from "../../api/profile";
import { getStudentId } from "../../api/auth";
import { sanitizePhoneInput, validatePhone } from "../../utils/validators";

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [saveMessage, setSaveMessage] = useState("");
  const studentId = getStudentId();

  const [profile, setProfile] = useState({
    name: "",
    studentId: "",
    email: "",
    department: "",
    semester: "",
    phone: "",
  });

  useEffect(() => {
    if (!studentId) {
      return;
    }

    getProfile(studentId)
      .then((data) => {
        setProfile(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [studentId]);

  if (!studentId) {
    return (
      <div className={styles.profileContainer}>
        <h1>My Profile</h1>
        <p className={styles.error}>Please login or register to view your profile.</p>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const sanitized = sanitizePhoneInput(value);
      setProfile((prev) => ({
        ...prev,
        phone: sanitized,
      }));
      setPhoneError("");
      return;
    }

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleButtonClick = async () => {
    if (isEditing) {
      const phoneValidation = validatePhone(profile.phone);
      if (!phoneValidation.valid) {
        setPhoneError(phoneValidation.message);
        return;
      }

      const currentStudentId = getStudentId();

      try {
        const updated = await updateProfile(currentStudentId, profile);
        setProfile(updated);
        setSaveMessage("Profile updated successfully!");
        setError("");
        setPhoneError("");
      } catch (err) {
        setError(err.message);
        setSaveMessage("");
        return;
      }
    } else {
      setSaveMessage("");
      setError("");
      setPhoneError("");
    }

    setIsEditing(!isEditing);
  };

  if (isLoading) {
    return (
      <div className={styles.profileContainer}>
        <h1>My Profile</h1>
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className={styles.profileContainer}>
      <h1>My Profile</h1>

      {error && <p className={styles.error}>{error}</p>}
      {saveMessage && <p className={styles.success}>{saveMessage}</p>}

      <div className={styles.profileForm}>
        <Input
          label="Full Name"
          type="text"
          name="name"
          value={profile.name}
          onChange={handleChange}
          disabled={!isEditing}
        />

        <Input
          label="Student ID"
          type="text"
          name="studentId"
          value={profile.studentId}
          onChange={handleChange}
          disabled
        />

        <Input
          label="Email"
          type="email"
          name="email"
          value={profile.email}
          onChange={handleChange}
          disabled={!isEditing}
        />

        <Input
          label="Department"
          type="text"
          name="department"
          value={profile.department}
          onChange={handleChange}
          disabled={!isEditing}
        />

        <Input
          label="Semester"
          type="text"
          name="semester"
          value={profile.semester}
          onChange={handleChange}
          disabled={!isEditing}
        />

        <Input
          label="Phone"
          type="tel"
          placeholder="Enter 10-digit phone number"
          name="phone"
          value={profile.phone}
          onChange={handleChange}
          disabled={!isEditing}
        />

        {phoneError && <p className={styles.error}>{phoneError}</p>}

        <Button
          type="button"
          onClick={handleButtonClick}
        >
          {isEditing ? "Save Changes" : "Edit Profile"}
        </Button>
      </div>
    </div>
  );
}

export default Profile;
