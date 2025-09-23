// "use client";

// import React, { useState } from "react";
// import axios from "axios";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../../../lib/firebaseClient"; // your Firebase client SDK

// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
//   CardFooter,
// } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// export function LoginForm() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const validate = () => {
//     if (!email) {
//       toast.error("Email is required");
//       return false;
//     }
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       toast.error("Please enter a valid email");
//       return false;
//     }
//     if (!password) {
//       toast.error("Password is required");
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async (e: { preventDefault: () => void }) => {
//     e.preventDefault();

//     if (!validate()) return;

//     setLoading(true);
//     try {
//       // Call backend login API that sets session cookie
//       await axios.post(
//         "http://localhost:3000/auth/login",
//         { email, password },
//         { withCredentials: true } // IMPORTANT: send cookies
//       );

//       // Sign in Firebase client SDK to trigger onAuthStateChanged
//       await signInWithEmailAndPassword(auth, email, password);

//       toast.success("Logged in successfully");
//       router.push("/dashboard");
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         toast.error(error.response?.data?.error || "Login failed");
//       } else {
//         toast.error("Login failed");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Card className="w-full max-w-md mx-auto mt-20">
//       <form onSubmit={handleSubmit}>
//         <CardHeader>
//           <CardTitle className="text-2xl font-semibold">Welcome Back</CardTitle>
//           <CardDescription>Enter your credentials to sign in.</CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-4 mt-6">
//           <div className="space-y-1">
//             <Label htmlFor="email">Email</Label>
//             <Input
//               id="email"
//               type="email"
//               placeholder="you@example.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="space-y-1">
//             <Label htmlFor="password">Password</Label>
//             <Input
//               id="password"
//               type="password"
//               placeholder="********"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <Button className="w-full mt-2 mb-5" type="submit" disabled={loading}>
//             {loading ? "Signing In..." : "Sign In"}
//           </Button>
//         </CardContent>
//         <CardFooter className="flex justify-between text-sm">
//           <a href="/forgot-password" className="hover:underline">
//             Forgot password?
//           </a>
//         </CardFooter>
//       </form>
//     </Card>
//   );
// }


"use client";

import React, { useState } from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // UI only - no validation or API calls
    setLoading(true);

    // Simulate async action then reset loading (optional)
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-20">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Welcome Back</CardTitle>
          <CardDescription>Enter your credentials to sign in.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 mt-6">
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button className="w-full mt-2 mb-5" type="submit" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </CardContent>
        <CardFooter className="flex justify-between text-sm">
          <a href="/forgot-password" className="hover:underline">
            Forgot password?
          </a>
        </CardFooter>
      </form>
    </Card>
  );
}
