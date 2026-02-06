"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { ReactNode } from "react";

interface GoogleAuthProviderWrapperProps {
  children: ReactNode;
}

export default function GoogleAuthProviderWrapper({
  children,
}: GoogleAuthProviderWrapperProps) {
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

  if (!googleClientId) {
    console.warn("Google Client ID not configured");
    return <>{children}</>;
  }

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      {children}
    </GoogleOAuthProvider>
  );
}
