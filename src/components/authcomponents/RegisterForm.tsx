// "use client";

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
// import Link from "next/link";
// import { Checkbox } from "../ui/checkbox";
// import React, { useState } from "react";
// import axios from "axios";
// import { toast } from "sonner";
// import { Eye, EyeOff } from "lucide-react";

// export function RegisterForm() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false); // Optional: for password visibility toggle

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const response = await axios.post("http://192.154.230.43:4000/auth/register", {
//         name,
//         email,
//         password,
//       });
//       toast(response.data.message || "Registration successful");
//       console.log("API Response:", response.data);
//     } catch (error: unknown) {
//       if (axios.isAxiosError(error)) {
//         toast(error.response?.data?.message || "Registration error");
//         console.error("Registration error:", error);
//       } else {
//         toast("Registration error");
//         console.error("Registration error:", error);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Card className="w-full max-w-md">
//       <CardHeader>
//         <CardTitle className="text-2xl font-semibold">
//           Welcome to Kulfiwala
//         </CardTitle>
//         <CardDescription>
//           You will need to fill the following Form in order to create your
//           Account.
//         </CardDescription>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         <div className="space-y-1">
//           <Label htmlFor="name">Name</Label>
//           <Input
//             id="name"
//             type="text"
//             placeholder="William Smith"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </div>
//         <div className="space-y-1">
//           <Label htmlFor="email">Email</Label>
//           <Input
//             id="email"
//             type="email"
//             placeholder="you@example.com"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>
//         <div className="space-y-1 relative">
//           <Label htmlFor="password">Password</Label>
//           <Input
//             id="password"
//             type={showPassword ? "text" : "password"}
//             placeholder="********"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           {/* Optional: Password visibility toggle */}
//           <button
//             type="button"
//             onClick={() => setShowPassword((prev) => !prev)}
//             className="absolute right-3 top-9 transform -translate-y-1/2 text-gray-400 hover:text-gray-700"
//             tabIndex={-1}
//           >
//             {showPassword ? (
//               <EyeOff className="w-5 h-5" />
//             ) : (
//               <Eye className="w-5 h-5" />
//             )}
//           </button>
//         </div>
//         {/* Optional: Remember me */}
//         <div className="flex items-center">
//           <Checkbox id="remember" />{" "}
//           <Label htmlFor="remember" className="ml-2">
//             Remember me
//           </Label>
//         </div>
//         <Button className="w-full mt-2" type="submit" disabled={loading} onClick={handleSubmit}>
//           {loading ? "Registering..." : "Sign Up"}
//         </Button>
//       </CardContent>
//       <CardFooter className="flex justify-between text-sm">
//         <Link href="/forgot-password" className="hover:underline">
//           Forgot password?
//         </Link>
//         <Link href="/login" className="hover:underline">
//           Already have an Account? Login
//         </Link>
//       </CardFooter>
//     </Card>
//   );
// }



"use client";

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
import Link from "next/link";
import { Checkbox } from "../ui/checkbox";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Optional: for password visibility toggle

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate async action then reset loading (optional)
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Welcome to Kulfiwala</CardTitle>
        <CardDescription>
          You will need to fill the following Form in order to create your Account.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="William Smith"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="space-y-1 relative">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* Optional: Password visibility toggle */}
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-9 transform -translate-y-1/2 text-gray-400 hover:text-gray-700"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {/* Optional: Remember me */}
        <div className="flex items-center">
          <Checkbox id="remember" />{" "}
          <Label htmlFor="remember" className="ml-2">
            Remember me
          </Label>
        </div>
        <Button className="w-full mt-2" type="submit" disabled={loading} onClick={handleSubmit}>
          {loading ? "Registering..." : "Sign Up"}
        </Button>
      </CardContent>
      <CardFooter className="flex justify-between text-sm">
        <Link href="/forgot-password" className="hover:underline">
          Forgot password?
        </Link>
        <Link href="/login" className="hover:underline">
          Already have an Account? Login
        </Link>
      </CardFooter>
    </Card>
  );
}
