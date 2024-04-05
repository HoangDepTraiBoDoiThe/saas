import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("Webhook called");
  try {
    const body = await req.json();
    const { id, email_addresses, first_name, image_url } = body?.data;
    await db.user.upsert({
      where: { clerkId: id },
      update: {
        email: email_addresses[0].email_address,
        name: first_name,
        profileImage: image_url,
      },
      create: {
        clerkId: id,
        email: email_addresses[0].email_address,
        name: first_name,
        profileImage: image_url,
      },
    });
    return new NextResponse("✅Successfully updated user", { status: 200 });
  } catch (error) {
    console.log("❌", error);
    return new NextResponse("❌Error updating database", { status: 500 });
  }
}
