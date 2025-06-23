import { NextResponse } from "next/server";

export async function GET() {
  // Vrati 0 jer još nemamo implementirane porudžbine
  return NextResponse.json({ count: 0 });
}
