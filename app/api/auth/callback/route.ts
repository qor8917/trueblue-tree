import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";

const {
  NEXT_PUBLIC_COGNITO_DOMAIN,
  NEXT_PUBLIC_APP_CLIENT_ID,
  NEXT_PUBLIC_APP_CLIENT_SECRET,
  NEXT_PUBLIC_HOST,
} = process.env;

export async function GET(request: NextRequest) {
  try {
    const origin = NEXT_PUBLIC_HOST;
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code") as string;
    console.log("origin", origin);
    console.log("searchParams", searchParams);
    console.log("code", code);
    console.log("NEXT_PUBLIC_APP_CLIENT_ID", NEXT_PUBLIC_APP_CLIENT_ID);
    console.log("NEXT_PUBLIC_APP_CLIENT_SECRET", NEXT_PUBLIC_APP_CLIENT_SECRET);
    console.log("NEXT_PUBLIC_COGNITO_DOMAIN", NEXT_PUBLIC_COGNITO_DOMAIN);
    console.log("request.nextUrl", request.nextUrl);
    console.log("NEXT_PUBLIC_HOST", NEXT_PUBLIC_HOST);
    if (!code) {
      const error = searchParams.get("error");
      // return NextResponse.json({ error: error || "Unknown error" });
      return NextResponse.redirect(`${origin}`);
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
    console.log("aaaaaaaaaaaaa", data);
    if (!res.ok) {
      console.log("bbbbbbbbbbbb", data.error);
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

    return NextResponse.redirect(`${origin}`);
  } catch (error) {
    return NextResponse.redirect(`${origin}`);
  }
}
