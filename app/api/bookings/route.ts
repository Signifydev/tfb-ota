import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const supabase = await createClient();

    const { error } = await supabase.from("bookings").insert([
      {
        listing_id: body.listing_id,
        room_name: body.room_name,
        full_name: body.full_name,
        phone: body.phone,
        email: body.email,
        check_in: body.check_in,
        guests: body.guests,
        special_request: body.special_request,
      },
    ]);

    if (error) {
      console.error(error);
      return NextResponse.json({ error: "Failed to save" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}