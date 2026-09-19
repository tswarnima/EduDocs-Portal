import styles from "./Select.module.css";

function Select({
  label,
  name,
  value,
  onChange,
  options,
}) {
  return (
    <div className={styles.selectGroup}>
      <label>{label}</label>

      <select
        name={name}
        value={value}
        onChange={onChange}
      >
        <option value="">Select {label}</option>

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;