"use client";
import { registerUser } from "@/app/actions/register";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const res = await registerUser(formData);
    if (res.success) router.push("/login");
    else alert(res.error);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form action={handleSubmit} className="p-8 border rounded shadow-md flex flex-col gap-4">
        <h1 className="text-xl font-bold">Create Account</h1>
        <input name="email" type="email" placeholder="Email" required className="border p-2" />
        <input name="password" type="password" placeholder="Password" required className="border p-2" />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Sign Up</button>
      </form>
    </div>
  );
}