import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    // 1. Database Connect karein
    await connectToDatabase();

    // 2. Check karein ki user pehle se toh nahi hai
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists with this email." },
        { status: 400 }
      );
    }

    // 3. Password ko hash (encrypt) karein
    const hashedPassword = await bcrypt.hash(password, 12);

    // 4. Naya User save karein
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return NextResponse.json(
      { message: "User registered successfully!" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}