import styles from "./Input.module.css";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Input({
    label,
    type,
    placeholder,
    name,
    value,
    onChange,
    disabled = false,
}) {

    const[showPassword, setShowPassword] = useState(false);

    const inputType =
        type === "password"
           ? showPassword
              ? "text"
              : "password"
            : type;

    return (
        <div className={styles.inputGroup}>

            <label>{label}</label>
            
            <div className={styles.inputWrapper}>
              <input
                  type={inputType}
                  placeholder={placeholder}
                  name={name}
                  value={value}
                  onChange={onChange}
                  disabled={disabled}
               />

               {type ==="password" && (
                  <button
                      type="button"
                      className={styles.eyeButton}
                      onClick={() => setShowPassword(prev => !prev)}
                   >
                     {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
               )}


            </div>

         </div>
    );
}

export default Input;