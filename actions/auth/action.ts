"use server";

import { cookies } from "next/headers";

const { NEXT_PUBLIC_COGNITO_DOMAIN } = process.env;

export const getUserInfo = async () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access_token");

  if (accessToken === undefined) {
    return null;
  }
  const tokenWithHeader = `Bearer ${accessToken.value}`;

  // Get UserInfo
  const res2 = await fetch(`${NEXT_PUBLIC_COGNITO_DOMAIN}/oauth2/userInfo`, {
    method: "GET",
    headers: {
      "Content-Type": "application/x-amz-json-1.1",
      Authorization: tokenWithHeader,
    },
  });
  const userInfo = await res2.json();

  return userInfo;
};
