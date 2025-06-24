"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function useAdminGuard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== "loading") {
      const isNotAdmin = !session || session.user.role !== "admin";
      if (isNotAdmin) {
        router.push("/");
      }
    }
  }, [session, status, router]);

  return { session, status };
}
