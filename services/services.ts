"use server";

import { nestAPI } from "@/lib/api";
import { cookies } from "next/headers";
import { unstable_cache } from "next/cache";

const userToken = async (): Promise<string | null> => {
  return (await cookies()).get("userToken")?.value || null;
};

const fetchUserData = async (token: string, url: string) => {
  try {
    const { data } = await nestAPI.get(url, {
      headers: { Cookie: `userToken=${token}` },
    });
    return data.data;
  } catch (error) {
    return null;
  }
};

const getCVData = async () => {
  const token = await userToken();
  // if (!token) return null;
  try {
    const { data } = await nestAPI.get("dashboard/cv", {
      headers: { Cookie: `userToken=${token}` },
    });
    return data;
  } catch (error) {
    return null;
  }
};

export { getCVData };

const getUserDataDashboard = async (url: string, tag: string) => {
  const token = await userToken();
  if (!token) return null;

  return unstable_cache(() => fetchUserData(token, url), [tag, token], {
    tags: [tag],
    revalidate: 60,
  })();
};

export { getUserDataDashboard };
