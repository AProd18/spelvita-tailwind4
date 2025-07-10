import React, { Suspense } from "react";
import VerifyEmailClient from "./VerifyEmailClient";

export default function VerifyEmailPage() {
  return (
    // Minor comment for triggering deploy

    <Suspense fallback={<p>Učitavanje verifikacije...</p>}>
      <VerifyEmailClient />
    </Suspense>
  );
}
