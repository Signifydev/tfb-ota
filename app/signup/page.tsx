"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/auth";
import { useRouter } from "next/navigation";

export default function SignupPage() {

  const router = useRouter();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [loading,setLoading] = useState(false);

  const handleSignup = async () => {

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password
    });

    if(error){
      alert(error.message);
      setLoading(false);
      return;
    }

    alert("Account created successfully");

    router.push("/dashboard");

  };

  return (

    <div className="max-w-md mx-auto py-24">

      <h1 className="text-2xl font-bold mb-6">
        Create Account
      </h1>

      <input
        type="email"
        placeholder="Email"
        className="w-full border p-3 rounded-lg mb-4"
        onChange={(e)=>setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full border p-3 rounded-lg mb-6"
        onChange={(e)=>setPassword(e.target.value)}
      />

      <button
        onClick={handleSignup}
        className="w-full bg-black text-white py-3 rounded-lg"
      >
        {loading ? "Creating..." : "Sign Up"}
      </button>

    </div>

  );
}