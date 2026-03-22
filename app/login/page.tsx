"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function LoginPage() {

  const [isLogin,setIsLogin] = useState(true);
  const [loading,setLoading] = useState(false);

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [name,setName] = useState("");

  const router = useRouter();

  const handleSubmit = async (e:React.FormEvent) => {

    e.preventDefault();

    setLoading(true);

    if(isLogin){

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if(error){
        alert(error.message);
        setLoading(false);
        return;
      }


    }else{

  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });
  console.log("SIGNUP DATA:", data);

  if (error) {
    alert(error.message);
    setLoading(false);
    return;
  }

  await supabase.from("profiles").insert({
  id: data.user!.id,
  full_name: name,
  role: "customer"
});
  

}

    // ✅ Wait for session to be set in cookies
await new Promise((resolve) => setTimeout(resolve, 500));

// 🔄 Sync with server
router.refresh();

// 🚀 Redirect
router.push("/dashboard");

setLoading(false);

  };

  return (
    <div className="min-h-screen bg-[#f6f8f8] flex items-center justify-center px-4 pt-[220px] md:pt-[240px] pb-20">

      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* LEFT PANEL */}

        <div className="hidden md:flex flex-col justify-center bg-[#f4b400] text-white p-12">

          <h2 className="text-4xl font-extrabold mb-6">
            {isLogin ? "Welcome Back!" : "Join Travel For Benefits"}
          </h2>

          <p className="text-white/90 leading-relaxed">
            {isLogin
              ? "Login to manage your bookings, explore adventures, and plan your next unforgettable journey."
              : "Create your account and start booking stays, activities, retreats & pilgrimage packages seamlessly."}
          </p>

        </div>

        {/* RIGHT PANEL */}

        <div className="p-10 md:p-12">

          {/* Toggle */}

          <div className="flex mb-8 bg-slate-100 rounded-full p-1">

            <button
              onClick={()=>setIsLogin(true)}
              className={`w-1/2 py-2 rounded-full text-sm font-bold transition-all ${
                isLogin ? "bg-white shadow text-slate-900" : "text-slate-500"
              }`}
            >
              Login
            </button>

            <button
              onClick={()=>setIsLogin(false)}
              className={`w-1/2 py-2 rounded-full text-sm font-bold transition-all ${
                !isLogin ? "bg-white shadow text-slate-900" : "text-slate-500"
              }`}
            >
              Signup
            </button>

          </div>

          <h3 className="text-2xl font-extrabold mb-6">
            {isLogin ? "Login to Your Account" : "Create Your Account"}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-5">

            {!isLogin && (
              <div>
                <label className="text-sm font-semibold text-slate-600">
                  Full Name
                </label>

                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                  className="w-full mt-2 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-[#f4b400]"
                />
              </div>
            )}

            {/* Email */}

            <div>
              <label className="text-sm font-semibold text-slate-600">
                Email Address
              </label>

              <input
                type="email"
                required
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className="w-full mt-2 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-[#f4b400]"
              />
            </div>

            {/* Password */}

            <div>
              <label className="text-sm font-semibold text-slate-600">
                Password
              </label>

              <input
                type="password"
                required
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                className="w-full mt-2 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-[#f4b400]"
              />
            </div>

            {/* Forgot password */}

            {isLogin && (
              <div className="text-right text-sm">
                <button
                  type="button"
                  className="text-[#f4b400] font-semibold hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            {/* Submit */}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#f4b400] text-white py-3 rounded-xl font-bold hover:scale-105 transition-all disabled:opacity-70"
            >
              {loading
                ? "Please wait..."
                : isLogin
                ? "Login"
                : "Create Account"}
            </button>

          </form>

          {/* Divider */}

          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-slate-200"></div>
            <span className="text-sm text-slate-400">OR</span>
            <div className="flex-1 h-px bg-slate-200"></div>
          </div>

          {/* Google Login Placeholder */}

          <button className="w-full border py-3 rounded-xl font-semibold hover:bg-slate-50 transition-all">
            Continue with Google
          </button>
          

        </div>

      </div>

    </div>
  );
}