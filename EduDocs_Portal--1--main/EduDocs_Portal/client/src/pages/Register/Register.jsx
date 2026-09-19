import { useState } from "react";
import styles from "./Register.module.css";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../api/register";
import { saveStudentId } from "../../api/auth";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        studentId: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({
        fullName: "",
        email: "",
        studentId: "",
        password: "",
        confirmPassword: "",
    });

    const [submitError, setSubmitError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));

        setSubmitError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {
            fullName: "",
            email: "",
            studentId: "",
            password: "",
            confirmPassword: "",
        };

        if (!formData.fullName.trim()) {
            newErrors.fullName = "Full Name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        }

        if (!formData.studentId.trim()) {
            newErrors.studentId = "Student ID is required";
        }

        if (!formData.password.trim()) {
            newErrors.password = "Password is required";
        }

        if (!formData.confirmPassword.trim()) {
            newErrors.confirmPassword = "Confirm Password is required";
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);

        if (Object.values(newErrors).some((error) => error !== "")) {
            return;
        }

        setIsSubmitting(true);
        setSubmitError("");

        try {
            const user = await registerUser(formData);
            saveStudentId(user.studentId);
            navigate("/dashboard");
        } catch (error) {
            setSubmitError(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.registerContainer}>
            <div className={styles.leftSection}>
                <div className={styles.leftContent}>
                    <h1>Create Your Account</h1>

                    <p>
                        Register to request academic documents,
                        track applications, and manage your profile.
                    </p>
                </div>
            </div>

            <div className={styles.rightSection}>
                <form
                    className={styles.formContainer}
                    onSubmit={handleSubmit}
                >
                    <h2>Register</h2>

                    <p className={styles.subtitle}>
                        Fill in the details below.
                    </p>

                    <Input
                        label="Full Name"
                        type="text"
                        placeholder="Enter your full name"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                    />
                    {errors.fullName && (
                      <p className={styles.error}>{errors.fullName}</p>
                    )}

                    <Input
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && (
                      <p className={styles.error}>{errors.email}</p>
                    )}

                    <Input
                        label="Student ID"
                        type="text"
                        placeholder="Enter your student ID"
                        name="studentId"
                        value={formData.studentId}
                        onChange={handleChange}
                    />
                    {errors.studentId && (
                      <p className={styles.error}>{errors.studentId}</p>
                    )}

                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && (
                      <p className={styles.error}>{errors.password}</p>
                    )}

                    <Input
                        label="Confirm Password"
                        type="password"
                        placeholder="Confirm your password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                    {errors.confirmPassword && (
                      <p className={styles.error}>{errors.confirmPassword}</p>
                    )}

                    {submitError && (
                      <p className={styles.error}>{submitError}</p>
                    )}

                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Registering..." : "Register"}
                    </Button>

                    <p className={styles.loginText}>
                       Already have an account?
                       <Link to="/login">
                          Login
                       </Link>
                    </p>

                </form>
            </div>
        </div>
    );
}

export default Register;
