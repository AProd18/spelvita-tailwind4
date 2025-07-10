import React, { Suspense } from "react";
import VerifyEmailClient from "./VerifyEmailClient";

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<p>Učitavanje verifikacije...</p>}>
      <VerifyEmailClient />
    </Suspense>
  );
}
