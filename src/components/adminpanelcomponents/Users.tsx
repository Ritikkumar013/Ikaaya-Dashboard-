// "use client";

// import React, { useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetDescription,
//   SheetFooter,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card } from "@/components/ui/card";

// type User = {
//   id: string;
//   name: string;
//   email: string;
// };

// type FormMode = "view" | "update" | "create";

// export default function Users() {
//   const [users, setUsers] = useState<User[]>([
//     { id: "1", name: "John Doe", email: "john@example.com" },
//     { id: "2", name: "Jane Smith", email: "jane@example.com" },
//     { id: "3", name: "Robert Johnson", email: "robert@example.com" },
//   ]);

//   const [filter, setFilter] = useState("");
//   const [sheetOpen, setSheetOpen] = useState(false);
//   const [formMode, setFormMode] = useState<FormMode>("create");
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);

//   // Filtered users list
//   const filteredUsers = users.filter(
//     (user) =>
//       user.id.includes(filter) ||
//       user.name.toLowerCase().includes(filter.toLowerCase()) ||
//       user.email.toLowerCase().includes(filter.toLowerCase())
//   );

//   const openForm = (mode: FormMode, user?: User) => {
//     setFormMode(mode);
//     setSelectedUser(user || null);
//     setSheetOpen(true);
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget);
//     const id = formData.get("id") as string;
//     const name = formData.get("name") as string;
//     const email = formData.get("email") as string;

//     if (formMode === "update" && selectedUser) {
//       setUsers((prev) =>
//         prev.map((u) => (u.id === selectedUser.id ? { id, name, email } : u))
//       );
//     } else if (formMode === "create") {
//       setUsers((prev) => [...prev, { id, name, email }]);
//     }
//     setSheetOpen(false);
//     setSelectedUser(null);
//   };

//   return (
//     <div>
//       <div className="flex justify-between mb-6">
//         <Input
//           placeholder="Filter users by ID, name, or email"
//           value={filter}
//           onChange={(e) => setFilter(e.target.value)}
//           className="max-w-xs"
//         />
//         <Button onClick={() => openForm("create")}>Create User</Button>
//       </div>

//       <Card>
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead className="w-[100px]">Id</TableHead>
//               <TableHead>Name</TableHead>
//               <TableHead>Email</TableHead>
//               <TableHead className="text-center">Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {filteredUsers.length > 0 ? (
//               filteredUsers.map((user) => (
//                 <TableRow key={user.id}>
//                   <TableCell>{user.id}</TableCell>
//                   <TableCell>{user.name}</TableCell>
//                   <TableCell>{user.email}</TableCell>
//                   <TableCell>
//                     <div className="flex justify-center space-x-2">
//                       <Button
//                         size="sm"
//                         variant="outline"
//                         onClick={() => openForm("view", user)}
//                       >
//                         View
//                       </Button>
//                       <Button
//                         size="sm"
//                         variant="outline"
//                         onClick={() => openForm("update", user)}
//                       >
//                         Update
//                       </Button>
//                       <Button size="sm" variant="destructive" onClick={() => {}}>
//                         Delete
//                       </Button>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={4} className="text-center py-4">
//                   No users found.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </Card>

//       {/* Sheet Drawer for User Form */}
//       <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
//         <SheetContent side="right" className="w-[400px] sm:w-[540px] p-6">
//           <SheetHeader>
//             <SheetTitle>
//               {formMode === "view"
//                 ? "View User"
//                 : formMode === "update"
//                 ? "Update User"
//                 : "Create User"}
//             </SheetTitle>
//             <SheetDescription>
//               {formMode === "view"
//                 ? "User information (read-only)"
//                 : "Fill the user information and submit"}
//             </SheetDescription>
//           </SheetHeader>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <Label htmlFor="id">ID</Label>
//               <Input
//                 id="id"
//                 name="id"
//                 defaultValue={selectedUser?.id || ""}
//                 disabled={formMode !== "create"}
//                 required
//               />
//             </div>

//             <div>
//               <Label htmlFor="name">Name</Label>
//               <Input
//                 id="name"
//                 name="name"
//                 defaultValue={selectedUser?.name || ""}
//                 disabled={formMode === "view"}
//                 required
//               />
//             </div>

//             <div>
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 name="email"
//                 type="email"
//                 defaultValue={selectedUser?.email || ""}
//                 disabled={formMode === "view"}
//                 required
//               />
//             </div>

//             {formMode !== "view" && (
//               <SheetFooter className="flex justify-end pt-4">
//                 <Button type="submit">
//                   {formMode === "update" ? "Update" : "Create"}
//                 </Button>
//               </SheetFooter>
//             )}
//           </form>
//         </SheetContent>
//       </Sheet>
//     </div>
//   );
// }



"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

type User = {
  id: string;
  name: string;
  email: string;
};

type FormMode = "view" | "create";

export default function Users() {
  const [users, setUsers] = useState<User[]>([
    { id: "1", name: "John Doe", email: "john@example.com" },
    { id: "2", name: "Jane Smith", email: "jane@example.com" },
    { id: "3", name: "Robert Johnson", email: "robert@example.com" },
  ]);

  const [filter, setFilter] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [formMode, setFormMode] = useState<FormMode>("create");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const filteredUsers = users.filter(
    (user) =>
      user.id.includes(filter) ||
      user.name.toLowerCase().includes(filter.toLowerCase()) ||
      user.email.toLowerCase().includes(filter.toLowerCase())
  );

  const openForm = (mode: FormMode, user?: User) => {
    setFormMode(mode);
    setSelectedUser(user || null);
    setSheetOpen(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    // ID is not entered by user when creating, generate simple unique ID here
    // For demo, we use timestamp string as ID
    const id = formMode === "create" ? Date.now().toString() : (formData.get("id") as string);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;

    if (formMode === "create") {
      setUsers((prev) => [...prev, { id, name, email }]);
    }
    setSheetOpen(false);
    setSelectedUser(null);
  };

  return (
    <div>
      <div className="flex justify-between mb-6">
        <Input
          placeholder="Filter users by ID, name, or email"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-xs"
        />
        <Button onClick={() => openForm("create")}>Create User</Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openForm("view", user)}
                      >
                        View
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Sheet Drawer for User Form */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="right" className="w-[400px] sm:w-[540px] p-6">
          <SheetHeader>
            <SheetTitle>{formMode === "view" ? "View User" : "Create User"}</SheetTitle>
            <SheetDescription>
              {formMode === "view"
                ? "User information (read-only)"
                : "Fill the user information and submit"}
            </SheetDescription>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            {formMode === "view" && selectedUser && (
              <div>
                <Label htmlFor="id">ID</Label>
                <Input id="id" name="id" value={selectedUser.id} disabled readOnly />
              </div>
            )}

            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                defaultValue={selectedUser?.name || ""}
                disabled={formMode === "view"}
                required
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                defaultValue={selectedUser?.email || ""}
                disabled={formMode === "view"}
                required
              />
            </div>

            {formMode !== "view" && (
              <SheetFooter className="flex justify-end pt-4">
                <Button type="submit">Create</Button>
              </SheetFooter>
            )}
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}
