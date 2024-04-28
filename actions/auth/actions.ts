"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import crypto from "crypto";

const { NEXT_PUBLIC_COGNITO_DOMAIN } = process.env;

export const getUserInfo = async () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access_token");

  if (accessToken === undefined) {
    return null;
  }
  const tokenWithHeader = `Bearer ${accessToken.value}`;

  // Get UserInfo
  const response = await fetch(
    `${NEXT_PUBLIC_COGNITO_DOMAIN}/oauth2/userInfo`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/x-amz-json-1.1",
        Authorization: tokenWithHeader,
      },
    }
  );
  if (!response.ok) {
    const idTokenExists = cookieStore.has("id_token");
    const accessTokenExists = cookieStore.has("access_token");
    const refreshTokenExists = cookieStore.has("refresh_token");
    if (idTokenExists) {
      cookieStore.delete("id_token");
    }

    if (accessTokenExists) {
      cookieStore.delete("access_token");
    }

    if (refreshTokenExists) {
      cookieStore.delete("refresh_token");
    }
    return redirect("/");
  }
  const userInfo = await response.json();
  console.log(userInfo);
  return userInfo;
};

export const redirectSignIn = () => {
  const { NEXT_PUBLIC_HOST, NEXT_PUBLIC_APP_CLIENT_ID } = process.env;

  let authorizeParams = new URLSearchParams();
  const origin = NEXT_PUBLIC_HOST;

  const state = crypto.randomBytes(16).toString("hex");

  authorizeParams.append("response_type", "code");
  authorizeParams.append("client_id", NEXT_PUBLIC_APP_CLIENT_ID as string);
  authorizeParams.append("redirect_uri", `${origin}/api/auth/callback`);
  authorizeParams.append("state", state);
  authorizeParams.append("identity_provider", "Google");
  authorizeParams.append("scope", "profile email openid");
  redirect(
    `${NEXT_PUBLIC_COGNITO_DOMAIN}/oauth2/authorize?${authorizeParams.toString()}`
  );
};

export const redirectSignOut = async () => {
  const {
    NEXT_PUBLIC_COGNITO_DOMAIN,
    NEXT_PUBLIC_APP_CLIENT_ID,
    NEXT_PUBLIC_APP_CLIENT_SECRET,
  } = process.env;

  const cookieStore = cookies();

  const idTokenExists = cookieStore.has("id_token");
  const accessTokenExists = cookieStore.has("access_token");
  const refreshTokenExists = cookieStore.has("refresh_token");

  if (!refreshTokenExists) {
    redirect("/");
  }

  const token = cookieStore.get("refresh_token");
  const authorizationHeader = `Basic ${Buffer.from(
    `${NEXT_PUBLIC_APP_CLIENT_ID}:${NEXT_PUBLIC_APP_CLIENT_SECRET}`
  ).toString("base64")}`;

  const response = await fetch(`${NEXT_PUBLIC_COGNITO_DOMAIN}/oauth2/revoke`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: authorizationHeader,
    },
    body: new URLSearchParams({
      token: token?.value!,
    }),
  });

  if (!response.ok) {
    const data = await response.json();

    return {
      status: 500,
      response: {
        error: data.error,
        error_description: data.error_description,
      },
    };
  }

  if (response.ok) {
    if (idTokenExists) {
      cookieStore.delete("id_token");
    }

    if (accessTokenExists) {
      cookieStore.delete("access_token");
    }

    if (refreshTokenExists) {
      cookieStore.delete("refresh_token");
    }

    return redirect("/");
  }
};
