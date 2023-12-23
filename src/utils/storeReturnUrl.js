// utils/auth.js
export const storeReturnUrl = (url) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("returnUrl", url);
  }
};

export const getReturnUrl = () => {
  if (typeof window !== "undefined") {
    const returnUrl = sessionStorage.getItem("returnUrl");
    sessionStorage.removeItem("returnUrl");
    return returnUrl || "/notfound";
  }
  return "/";
};
