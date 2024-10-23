export const URLs = {
    logo: "https://s3.brilliant.com.bd/rafin_storage/logo.png",
    profile_picture: "https://s3.brilliant.com.bd/rafin_storage/profile-img01.png"
  };

// export const API_BASE_URL = "http://127.0.0.1:5000/api/v1"
export const API_KEY = "@Beginning@After@the@ENd@"

export const API_BASE_URL =
  window.location.hostname === "rafin.dev"
    ? "https://rafin.dev/api/v1"
    : "http://103.209.42.145:30000/api/v1";
