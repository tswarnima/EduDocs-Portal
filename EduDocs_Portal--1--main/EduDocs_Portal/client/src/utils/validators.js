export function sanitizePhoneInput(value) {
  return value.replace(/\D/g, "").slice(0, 10);
}

export function validatePhone(phone) {
  const trimmed = phone?.trim() ?? "";

  if (!trimmed) {
    return { valid: true };
  }

  if (!/^\d+$/.test(trimmed)) {
    return { valid: false, message: "Phone number must contain digits only" };
  }

  if (!/^\d{10}$/.test(trimmed)) {
    return { valid: false, message: "Phone number must be exactly 10 digits" };
  }

  return { valid: true };
}
