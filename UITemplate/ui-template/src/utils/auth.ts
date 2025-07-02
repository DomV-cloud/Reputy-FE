export function isTokenValid(): boolean {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const payload = token.split(".")[1];
    if (!payload) return false;
    const decoded = JSON.parse(atob(payload));
    if (!decoded.exp) return false;
    const now = Math.floor(Date.now() / 1000);
    return decoded.exp > now;
  } catch (e) {
    return false;
  }
}
