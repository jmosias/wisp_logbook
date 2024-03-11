const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const GET = async (url) => {
  const res = await fetch(BASE_URL + url);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

const POST = async (url, query) => {
  const res = await $http.post(url, query);
  return res;
};

const api = {
  getAllProductCollections: "/productCollections",
};

export const getAllProductCollections = () => {
  return GET(api.getAllProductCollections);
};
