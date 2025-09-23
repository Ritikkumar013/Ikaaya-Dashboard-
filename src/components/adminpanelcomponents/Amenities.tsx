// "use client";

// import React, { useState, useEffect } from "react";
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
// } from "@/components/ui/sheet";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card } from "@/components/ui/card";
// import { toast } from "sonner";

// type Amenity = {
//   id: string;
//   name: string;
// };

// type FormMode = "view" | "edit" | "create";

// export default function Amenities() {
//   const [amenities, setAmenities] = useState<Amenity[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const [filter, setFilter] = useState("");
//   const [sheetOpen, setSheetOpen] = useState(false);
//   const [formMode, setFormMode] = useState<FormMode>("create");
//   const [selectedAmenity, setSelectedAmenity] = useState<Amenity | null>(null);

//   // Fetch amenities from API
//   const fetchAmenities = async () => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       const response = await fetch("http://localhost:3000/amenities", {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json',
//         },
//         mode: 'cors', // Explicitly set CORS mode
//       });
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
      
//       const data = await response.json();
//       console.log("API Response:", data); // Debug log
      
//       // Transform the API response to match our component's expected structure
//       const transformedAmenities: Amenity[] = data.map((item: any) => ({
//         id: item.id,
//         name: item.title || item.Title // Handle both 'title' and 'Title' fields
//       }));
      
//       setAmenities(transformedAmenities);
//     } catch (err) {
//       console.error("Error fetching amenities:", err);
//       setError(err instanceof Error ? err.message : "Failed to fetch amenities");
      
//       // Fallback: Use dummy data for development
//       console.log("Using fallback dummy data");
//       setAmenities([
//         { id: "1", name: "Swimming Pool" },
//         { id: "2", name: "Gym" },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch amenities on component mount
//   useEffect(() => {
//     fetchAmenities();
//   }, []);

//   const filteredAmenities = amenities.filter(
//     (a) =>
//       a.id.includes(filter) || a.name.toLowerCase().includes(filter.toLowerCase())
//   );

//   const openForm = (mode: FormMode, amenity?: Amenity) => {
//     setFormMode(mode);
//     setSelectedAmenity(amenity || null);
//     setSheetOpen(true);
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const formData = new FormData(e.currentTarget);
//     const name = (formData.get("name") as string).trim();

//     if (!name) {
//       toast.error("Name is required");
//       return;
//     }

//     if (formMode === "edit" && selectedAmenity) {
//       // Update existing amenity
//       setAmenities((prev) =>
//         prev.map((a) =>
//           a.id === selectedAmenity.id ? { ...a, name } : a
//         )
//       );
//       toast.success("Amenity updated successfully");
//     } else if (formMode === "create") {
//       // Create new amenity with unique id
//       const newAmenity: Amenity = {
//         id: (amenities.length + 1).toString(),
//         name,
//       };
//       setAmenities((prev) => [...prev, newAmenity]);
//       toast.success("Amenity created successfully");
//     }

//     setSheetOpen(false);
//     setSelectedAmenity(null);
//   };

//   const handleDelete = async (id: string) => {
//     if (!confirm("Are you sure you want to delete this amenity?")) return;
    
//     try {
//       const response = await fetch(`http://localhost:3000/amenities/${id}`, {
//         method: 'DELETE',
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       // Remove from local state after successful API deletion
//       setAmenities((prev) => prev.filter((a) => a.id !== id));
//       toast.success("Amenity deleted successfully");
//     } catch (err) {
//       console.error("Error deleting amenity:", err);
//       toast.error("Failed to delete amenity");
//     }
//   };

//   if (loading) return <p>Loading amenities...</p>;
//   if (error) return <p className="text-red-600 text-center mt-4">Error: {error}</p>;

//   return (
//     <div>
//       <div className="flex justify-between mb-6">
//         <Input
//           placeholder="Filter amenities by ID or name"
//           value={filter}
//           onChange={(e) => setFilter(e.target.value)}
//           className="max-w-xs"
//         />
//         <Button onClick={() => openForm("create")}>Create Amenity</Button>
//       </div>

//       <Card>
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead className="w-[80px]">ID</TableHead>
//               <TableHead>Name</TableHead>
//               <TableHead className="text-center">Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {filteredAmenities.length > 0 ? (
//               filteredAmenities.map((amenity) => (
//                 <TableRow key={amenity.id}>
//                   <TableCell>{amenity.id}</TableCell>
//                   <TableCell>{amenity.name}</TableCell>
//                   <TableCell>
//                     <div className="flex justify-center space-x-2">
//                       <Button
//                         size="sm"
//                         variant="outline"
//                         onClick={() => openForm("view", amenity)}
//                       >
//                         View
//                       </Button>
//                       <Button
//                         size="sm"
//                         variant="outline"
//                         onClick={() => openForm("edit", amenity)}
//                       >
//                         Edit
//                       </Button>
//                       <Button
//                         size="sm"
//                         variant="destructive"
//                         onClick={() => handleDelete(amenity.id)}
//                       >
//                         Delete
//                       </Button>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={3} className="text-center py-4">
//                   No amenities found.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </Card>

//       {/* Sheet for Form */}
//       <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
//         <SheetContent side="right" className="w-[400px] sm:w-[540px] p-6">
//           <SheetHeader>
//             <SheetTitle>
//               {formMode === "view"
//                 ? "View Amenity"
//                 : formMode === "edit"
//                 ? "Edit Amenity"
//                 : "Create Amenity"}
//             </SheetTitle>
//             <SheetDescription>
//               {formMode === "view"
//                 ? "Read-only view of Amenity details"
//                 : "Fill the form and submit"}
//             </SheetDescription>
//           </SheetHeader>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {formMode !== "create" && (
//               <div>
//                 <Label htmlFor="id">ID</Label>
//                 <Input
//                   id="id"
//                   name="id"
//                   value={selectedAmenity?.id || ""}
//                   disabled
//                   readOnly
//                 />
//               </div>
//             )}

//             <div>
//               <Label htmlFor="name">Name</Label>
//               <Input
//                 id="name"
//                 name="name"
//                 defaultValue={selectedAmenity?.name || ""}
//                 disabled={formMode === "view"}
//                 required
//               />
//             </div>

//             {formMode !== "view" && (
//               <SheetFooter className="flex justify-end pt-4">
//                 <Button type="submit">{formMode === "edit" ? "Update" : "Create"}</Button>
//               </SheetFooter>
//             )}
//           </form>
//         </SheetContent>
//       </Sheet>
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect } from "react";
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
import { toast } from "sonner";

type Amenity = {
  id: string;
  name: string;
};

type FormMode = "view" | "edit" | "create";

export default function Amenities() {
  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [filter, setFilter] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [formMode, setFormMode] = useState<FormMode>("create");
  const [selectedAmenity, setSelectedAmenity] = useState<Amenity | null>(null);

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';

  // Fetch amenities from API
  const fetchAmenities = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${backendUrl}/amenities`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors', // Explicitly set CORS mode
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("API Response:", data); // Debug log
      
      // Transform the API response to match our component's expected structure
      const transformedAmenities: Amenity[] = data.map((item: any) => ({
        id: item.id,
        name: item.title || item.Title // Handle both 'title' and 'Title' fields
      }));
      
      setAmenities(transformedAmenities);
    } catch (err) {
      console.error("Error fetching amenities:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch amenities");
      
      // Fallback: Use dummy data for development
      console.log("Using fallback dummy data");
      setAmenities([
        { id: "1", name: "Swimming Pool" },
        { id: "2", name: "Gym" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Create amenity API call
  const createAmenity = async (title: string) => {
    try {
      const response = await fetch(`${backendUrl}/amenities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          Title: title
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Create API Response:", data);

      // Add the new amenity to the local state
      const newAmenity: Amenity = {
        id: data.id,
        name: data.title || data.Title
      };

      setAmenities((prev) => [...prev, newAmenity]);
      toast.success("Amenity created successfully");
      
      return data;
    } catch (err) {
      console.error("Error creating amenity:", err);
      toast.error("Failed to create amenity");
      throw err;
    }
  };

  // Update amenity API call
  const updateAmenity = async (id: string, title: string) => {
    try {
      const response = await fetch(`${backendUrl}/amenities/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify({
          Title: title
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Update API Response:", data);

      // Update the amenity in local state
      setAmenities((prev) =>
        prev.map((a) =>
          a.id === id ? { ...a, name: data.title || data.Title || title } : a
        )
      );
      
      toast.success("Amenity updated successfully");
      
      return data;
    } catch (err) {
      console.error("Error updating amenity:", err);
      toast.error("Failed to update amenity");
      throw err;
    }
  };

  // Fetch amenities on component mount
  useEffect(() => {
    fetchAmenities();
  }, []);

  const filteredAmenities = amenities.filter(
    (a) =>
      a.id.includes(filter) || a.name.toLowerCase().includes(filter.toLowerCase())
  );

  const openForm = (mode: FormMode, amenity?: Amenity) => {
    setFormMode(mode);
    setSelectedAmenity(amenity || null);
    setSheetOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = (formData.get("name") as string).trim();

    if (!name) {
      toast.error("Name is required");
      setSubmitLoading(false);
      return;
    }

    try {
      if (formMode === "edit" && selectedAmenity) {
        // Update existing amenity via API
        await updateAmenity(selectedAmenity.id, name);
      } else if (formMode === "create") {
        // Create new amenity via API
        await createAmenity(name);
      }

      setSheetOpen(false);
      setSelectedAmenity(null);
    } catch (err) {
      // Error handling is done in the API functions
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this amenity?")) return;
    
    try {
      const response = await fetch(`http://localhost:3000/amenities/${id}`, {
        method: 'DELETE',
        mode: 'cors',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Remove from local state after successful API deletion
      setAmenities((prev) => prev.filter((a) => a.id !== id));
      toast.success("Amenity deleted successfully");
    } catch (err) {
      console.error("Error deleting amenity:", err);
      toast.error("Failed to delete amenity");
    }
  };

  if (loading) return <p>Loading amenities...</p>;
  if (error) return <p className="text-red-600 text-center mt-4">Error: {error}</p>;

  return (
    <div>
      <div className="flex justify-between mb-6">
        <Input
          placeholder="Filter amenities by ID or name"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-xs"
        />
        <Button onClick={() => openForm("create")}>Create Amenity</Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAmenities.length > 0 ? (
              filteredAmenities.map((amenity) => (
                <TableRow key={amenity.id}>
                  <TableCell>{amenity.id}</TableCell>
                  <TableCell>{amenity.name}</TableCell>
                  <TableCell>
                    <div className="flex justify-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openForm("view", amenity)}
                      >
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openForm("edit", amenity)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(amenity.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-4">
                  No amenities found.
                </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Sheet for Form */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="right" className="w-[400px] sm:w-[540px] p-6">
          <SheetHeader>
            <SheetTitle>
              {formMode === "view"
                ? "View Amenity"
                : formMode === "edit"
                ? "Edit Amenity"
                : "Create Amenity"}
            </SheetTitle>
            <SheetDescription>
              {formMode === "view"
                ? "Read-only view of Amenity details"
                : "Fill the form and submit"}
            </SheetDescription>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            {formMode !== "create" && (
              <div>
                <Label htmlFor="id">ID</Label>
                <Input
                  id="id"
                  name="id"
                  value={selectedAmenity?.id || ""}
                  disabled
                  readOnly
                />
              </div>
            )}

            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                defaultValue={selectedAmenity?.name || ""}
                disabled={formMode === "view"}
                required
              />
            </div>

            {formMode !== "view" && (
              <SheetFooter className="flex justify-end pt-4">
                <Button type="submit" disabled={submitLoading}>
                  {submitLoading 
                    ? "Processing..." 
                    : formMode === "edit" 
                    ? "Update" 
                    : "Create"
                  }
                </Button>
              </SheetFooter>
            )}
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}