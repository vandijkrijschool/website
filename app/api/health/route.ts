import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json(
    {
      status: "ok",
      service: "vandijkrijschool",
      environment: process.env.APP_ENVIRONMENT ?? "development",
      revision: process.env.APP_REVISION ?? "development",
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
