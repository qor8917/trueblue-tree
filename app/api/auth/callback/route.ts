import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";

const {
  NEXT_PUBLIC_COGNITO_DOMAIN,
  NEXT_PUBLIC_APP_CLIENT_ID,
  NEXT_PUBLIC_APP_CLIENT_SECRET,
} = process.env;

export async function GET(request: NextRequest) {
  try {
    const origin = request.nextUrl.origin;
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code") as string;

    if (!code) {
      const error = searchParams.get("error");
      // return NextResponse.json({ error: error || "Unknown error" });
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    }

    const authorizationHeader = `Basic ${Buffer.from(
      `${NEXT_PUBLIC_APP_CLIENT_ID}:${NEXT_PUBLIC_APP_CLIENT_SECRET}`
    ).toString("base64")}`;

    const requestBody = new URLSearchParams({
      grant_type: "authorization_code",
      client_id: NEXT_PUBLIC_APP_CLIENT_ID as string,
      code: code,
      redirect_uri: `${origin}/api/auth/callback`,
    });

    // Get tokens
    const res = await fetch(`${NEXT_PUBLIC_COGNITO_DOMAIN}/oauth2/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: authorizationHeader,
      },
      body: requestBody,
    });

    const data = await res.json();
    console.log(data.access_token);
    const tokenWithHeader = `Bearer ${data.access_token}`;
    // Get UserInfo
    const res2 = await fetch(`${NEXT_PUBLIC_COGNITO_DOMAIN}/oauth2/userInfo`, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-amz-json-1.1",
        Authorization: tokenWithHeader,
      },
    });
    const userInfo = await res2.json();
    console.log(userInfo);

    if (!res.ok) {
      return NextResponse.json({
        error: data.error,
        error_description: data.error_description,
      });
    }

    // Store tokens in cookies
    const cookieStore = cookies();
    cookieStore.set("id_token", data.id_token);
    cookieStore.set("access_token", data.access_token);
    cookieStore.set("refresh_token", data.refresh_token);
    cookieStore.set("user_info", JSON.stringify(userInfo));

    return NextResponse.redirect(new URL("/", request.nextUrl));
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}
