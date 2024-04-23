"use server";
import crypto from "crypto";
import { redirect } from "next/navigation";
const {
  NEXT_PUBLIC_COGNITO_DOMAIN,
  NEXT_PUBLIC_APP_CLIENT_ID,
  NEXT_PUBLIC_HOST,
} = process.env;

export async function signIn() {
  let authorizeParams = new URLSearchParams();
  const state = crypto.randomBytes(16).toString("hex");

  authorizeParams.append("response_type", "code");
  authorizeParams.append("client_id", NEXT_PUBLIC_APP_CLIENT_ID as string);
  authorizeParams.append(
    "redirect_uri",
    `${NEXT_PUBLIC_HOST}/api/auth/callback`
  );
  authorizeParams.append("state", state);
  authorizeParams.append("identity_provider", "Google");
  authorizeParams.append("scope", "profile email openid");

  return `${NEXT_PUBLIC_COGNITO_DOMAIN}/oauth2/authorize?${authorizeParams.toString()}`;
}
