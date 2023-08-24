export function isOnPhone() {
  if (typeof window !== "undefined" && window.navigator) {
    const userAgent: string = window.navigator.userAgent;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    );
  }
  return false;
}
