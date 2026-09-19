const STUDENT_ID_KEY = "edudocs_studentId";
const STUDENT_TOKEN_KEY = "edudocs_token";
const ADMIN_TOKEN_KEY = "edudocs_admin_token";
const ADMIN_EMAIL_KEY = "edudocs_admin_email";

export function saveStudentId(studentId) {
  localStorage.setItem(STUDENT_ID_KEY, studentId);
}

export function getStudentId() {
  return localStorage.getItem(STUDENT_ID_KEY);
}

export function saveStudentToken(token) {
  localStorage.setItem(STUDENT_TOKEN_KEY, token);
}

export function getStudentToken() {
  return localStorage.getItem(STUDENT_TOKEN_KEY);
}

export function saveAdminToken(token) {
  localStorage.setItem(ADMIN_TOKEN_KEY, token);
}

export function getAdminToken() {
  return localStorage.getItem(ADMIN_TOKEN_KEY);
}

export function saveAdminEmail(email) {
  localStorage.setItem(ADMIN_EMAIL_KEY, email);
}

export function getAdminEmail() {
  return localStorage.getItem(ADMIN_EMAIL_KEY);
}

export function clearStudentId() {
  localStorage.removeItem(STUDENT_ID_KEY);
  localStorage.removeItem(STUDENT_TOKEN_KEY);
}

export function clearAdminSession() {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
  localStorage.removeItem(ADMIN_EMAIL_KEY);
}

export function isStudentLoggedIn() {
  return Boolean(getStudentToken() && getStudentId());
}

export function isAdminLoggedIn() {
  return Boolean(getAdminToken());
}

export function logoutStudent() {
  clearStudentId();
}

export function logoutAdmin() {
  clearAdminSession();
}
