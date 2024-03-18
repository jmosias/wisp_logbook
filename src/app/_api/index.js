const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const GET = async (url) => {
  try {
    const response = await fetch(BASE_URL + url, {
      credentials: "include",
    });
    const jsonData = await response.json();
    if (!response.ok) {
      throw new Error(jsonData.message);
    }
    return jsonData;
  } catch (error) {
    throw new Error(error.message);
  }
};

const POST = async (url, data) => {
  try {
    const response = await fetch(BASE_URL + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });
    const jsonData = await response.json();
    if (!response.ok) {
      throw new Error(jsonData.message);
    }
    return jsonData;
  } catch (error) {
    throw new Error(error.message);
  }
};

const api = {
  getAllProductCollections: "/productCollections",

  // user
  userLogin: "/user/login",
  userRegister: "/user/register",
  getUserInfo: "/user/info",
  userLogout: "/user/logout",
};

export const getAllProductCollections = () => {
  return GET(api.getAllProductCollections);
};

export const userLogin = (email, password) => {
  return POST(api.userLogin, { email, password });
};

export const userRegister = (email, password) => {
  return POST(api.userRegister, { email, password });
};

export const getUserInfo = () => {
  return GET(api.getUserInfo);
};

export const userLogout = () => {
  return POST(api.userLogout);
};
