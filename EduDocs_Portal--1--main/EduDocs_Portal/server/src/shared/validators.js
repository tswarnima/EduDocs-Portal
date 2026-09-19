/** Phone: digits only, 10 digits (Indian mobile format used by the project). */
const PHONE_REGEX = /^\d{10}$/;

export function validatePhone(phone) {
  const trimmed = phone?.toString().trim() ?? "";

  if (!trimmed) {
    return { valid: true, value: "" };
  }

  if (!/^\d+$/.test(trimmed)) {
    return {
      valid: false,
      message: "Phone number must contain digits only",
    };
  }

  if (!PHONE_REGEX.test(trimmed)) {
    return {
      valid: false,
      message: "Phone number must be exactly 10 digits",
    };
  }

  return { valid: true, value: trimmed };
}
