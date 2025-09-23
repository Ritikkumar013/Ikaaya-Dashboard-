// "use client";

// import React, { useEffect, useState } from "react";
// import { Card } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import axios from "axios";

// interface ProfileData {
//   id: string;
//   name: string;
//   email: string;
// }

// export default function Profile() {
//   const [profile, setProfile] = useState<ProfileData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/auth/profile", {
//           withCredentials: true, // important to send session cookie
//         });
//         setProfile(response.data);
//         setError(null);
//       } catch (err: any) {
//         setError(err.response?.data?.error || "Failed to load profile");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   if (loading) return <p>Loading profile...</p>;

//   if (error) return <p className="text-red-600">Error: {error}</p>;

//   if (!profile) return <p>No profile data available.</p>;

//   return (
//     <div className="max-w-3xl mx-auto">
//       <Card className="p-8 space-y-8">
//         <div className="flex items-center space-x-6">
//           <Avatar className="w-24 h-24">
//             {/* For simplicity, use first char of name if no avatar */}
//             <AvatarFallback>{profile.name[0]}</AvatarFallback>
//           </Avatar>
//           <div>
//             <h2 className="text-3xl font-semibold">{profile.name}</h2>
//             {/* Use a default role or omit if not available */}
//             <Badge className="mt-1">User</Badge>
//             <p className="mt-4 text-gray-600">{/* add bio here if available */}</p>
//             <p className="mt-2 text-gray-500">{profile.email}</p>
//             {/* Username not provided by API, can be omitted */}
//           </div>
//         </div>

//         <div className="pt-4 flex justify-end">
//           <Button>Edit Profile</Button>
//         </div>
//       </Card>
//     </div>
//   );
// }


"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProfileData {
  id: string;
  name: string;
  email: string;
}

export default function Profile() {
  // Hardcoded dummy profile data to display UI only
  const [profile] = useState<ProfileData>({
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
  });

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="p-8 space-y-8">
        <div className="flex items-center space-x-6">
          <Avatar className="w-24 h-24">
            {/* For simplicity, use first char of name if no avatar */}
            <AvatarFallback>{profile.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-3xl font-semibold">{profile.name}</h2>
            {/* Use a default role or omit if not available */}
            <Badge className="mt-1">User</Badge>
            <p className="mt-4 text-gray-600">{/* add bio here if available */}</p>
            <p className="mt-2 text-gray-500">{profile.email}</p>
            {/* Username not provided by API, can be omitted */}
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <Button>Edit Profile</Button>
        </div>
      </Card>
    </div>
  );
}
