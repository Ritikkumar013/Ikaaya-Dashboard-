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

type Property = {
  id: string;
  title: string;
  description: string;
  locationArea: string;
  address: string;
  propertyType: string;
  numberOfBedrooms: number;
  numberOfBathrooms: number;
  numberOfBalconies: number;
  carpetArea: number;
  plotArea: number;
  plotDimensions: string;
  widthFacingRoad: number;
  facing: string;
  totalFloors: number;
  status: string;
  ageOfProperty: number;
  totalPrice: number;
  pricePerUnit: number;
  otherRooms: string;
  furnishing: string;
  parking: string;
  amenities: string;
  locationAdvantage: string;
  rentalIncome: number;
  createdAt: string;
};

type FormMode = "view" | "update" | "create";

export default function CommercialProperties() {
  // Dummy data for demo
  const [properties, setProperties] = useState<Property[]>([
    {
      id: "HYLxEuyL1CYMlitm5kNV",
      title: "Modern & Super Luxury Apartment",
      description: "Spacious apartment in city center",
      locationArea: "Midtown",
      address: "456 Elm St",
      propertyType: "Apartment",
      numberOfBedrooms: 3,
      numberOfBathrooms: 2,
      numberOfBalconies: 1,
      carpetArea: 1200,
      plotArea: 0,
      plotDimensions: "",
      widthFacingRoad: 30,
      facing: "East",
      totalFloors: 10,
      status: "Ready to move",
      ageOfProperty: 2,
      totalPrice: 8500000,
      pricePerUnit: 7000,
      otherRooms: "Study",
      furnishing: "semi-furnished",
      parking: "Available",
      amenities: "Gym, Pool, Security",
      locationAdvantage: "Near subway",
      rentalIncome: 20000,
      createdAt: "2025-09-06T07:58:21.392Z",
    },
  ]);

  const [loading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [filter, setFilter] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [formMode, setFormMode] = useState<FormMode>("create");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  useEffect(() => {
    if (formMode === "create") {
      setSelectedProperty(null);
    }
  }, [formMode]);

  // Filter properties for table list
  const filteredProperties = properties.filter(
    (p) =>
      p.id.includes(filter) ||
      p.title.toLowerCase().includes(filter.toLowerCase()) ||
      p.locationArea.toLowerCase().includes(filter.toLowerCase()) ||
      p.propertyType.toLowerCase().includes(filter.toLowerCase())
  );

  // Open form drawer
  const openForm = (mode: FormMode, property?: Property) => {
    setFormMode(mode);
    setSelectedProperty(property || null);
    setSheetOpen(true);
  };

  // Handler for form submit updating local state
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedProperty && formMode === "update") return;

    const formData = new FormData(e.currentTarget);

    // Parse all fields carefully
    const updatedProperty: Property = {
      id: selectedProperty ? selectedProperty.id : `id_${Date.now()}`,
      title: (formData.get("title") as string).trim(),
      description: (formData.get("description") as string).trim(),
      locationArea: (formData.get("locationArea") as string).trim(),
      address: (formData.get("address") as string).trim(),
      propertyType: (formData.get("propertyType") as string).trim(),
      numberOfBedrooms: Number(formData.get("numberOfBedrooms")),
      numberOfBathrooms: Number(formData.get("numberOfBathrooms")),
      numberOfBalconies: Number(formData.get("numberOfBalconies")),
      carpetArea: Number(formData.get("carpetArea")),
      plotArea: Number(formData.get("plotArea")),
      plotDimensions: (formData.get("plotDimensions") as string).trim(),
      widthFacingRoad: Number(formData.get("widthFacingRoad")),
      facing: (formData.get("facing") as string).trim(),
      totalFloors: Number(formData.get("totalFloors")),
      status: (formData.get("status") as string).trim(),
      ageOfProperty: Number(formData.get("ageOfProperty")),
      totalPrice: Number(formData.get("totalPrice")),
      pricePerUnit: Number(formData.get("pricePerUnit")),
      otherRooms: (formData.get("otherRooms") as string).trim(),
      furnishing: (formData.get("furnishing") as string).trim(),
      parking: (formData.get("parking") as string).trim(),
      amenities: (formData.get("amenities") as string).trim(),
      locationAdvantage: (formData.get("locationAdvantage") as string).trim(),
      rentalIncome: Number(formData.get("rentalIncome")),
      createdAt: selectedProperty?.createdAt || new Date().toISOString(),
    };

    if (formMode === "update" && selectedProperty) {
      setProperties((prev) =>
        prev.map((p) => (p.id === selectedProperty.id ? updatedProperty : p))
      );
      toast.success("Property updated successfully");
    } else if (formMode === "create") {
      setProperties((prev) => [...prev, updatedProperty]);
      toast.success("Property created successfully");
    }

    setSheetOpen(false);
    setSelectedProperty(null);
    setFormMode("create");
  };

  // Delete property with confirmation
  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this property?")) return;
    setProperties((prev) => prev.filter((p) => p.id !== id));
    toast.success("Property deleted successfully");
  };

  if (loading) return <p>Loading properties...</p>;
  if (error) return <p className="text-red-600 text-center mt-4">Error: {error}</p>;

  return (
    <div>
      <div className="flex justify-between mb-6">
        <Input
          placeholder="Filter properties by ID, title, location or type"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-xs"
        />
        <Button onClick={() => openForm("create")}>Add Property</Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Location Area</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Property Type</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell className="truncate max-w-[160px]">{property.id}</TableCell>
                  <TableCell>{property.title}</TableCell>
                  <TableCell>{property.locationArea}</TableCell>
                  <TableCell>{property.totalPrice.toLocaleString()}</TableCell>
                  <TableCell>{property.propertyType}</TableCell>
                  <TableCell>
                    <div className="flex justify-center space-x-2">
                      <Button size="sm" variant="outline" onClick={() => openForm("view", property)}>
                        View
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => openForm("update", property)}>
                        Edit
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(property.id)}>
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  No properties found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Property Form Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="right" className="w-full max-w-3xl p-6">
          <SheetHeader>
            <SheetTitle>
              {formMode === "view"
                ? "View Property"
                : formMode === "update"
                ? "Edit Property"
                : "Add Property"}
            </SheetTitle>
            <SheetDescription>
              {formMode === "view"
                ? "Property details (read-only)"
                : "Fill the property details below"}
            </SheetDescription>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto max-h-[80vh]">
            {formMode !== "create" && (
              <div>
                <Label htmlFor="id">ID</Label>
                <Input id="id" name="id" value={selectedProperty?.id || ""} disabled readOnly />
              </div>
            )}

            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                defaultValue={selectedProperty?.title || ""}
                disabled={formMode === "view"}
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                defaultValue={selectedProperty?.description || ""}
                disabled={formMode === "view"}
                required
              />
            </div>

            <div>
              <Label htmlFor="locationArea">Location Area</Label>
              <Input
                id="locationArea"
                name="locationArea"
                defaultValue={selectedProperty?.locationArea || ""}
                disabled={formMode === "view"}
                required
              />
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                defaultValue={selectedProperty?.address || ""}
                disabled={formMode === "view"}
                required
              />
            </div>

            <div>
              <Label htmlFor="propertyType">Property Type</Label>
              <Input
                id="propertyType"
                name="propertyType"
                defaultValue={selectedProperty?.propertyType || ""}
                disabled={formMode === "view"}
                required
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="numberOfBedrooms">Bedrooms</Label>
                <Input
                  id="numberOfBedrooms"
                  name="numberOfBedrooms"
                  type="number"
                  defaultValue={selectedProperty?.numberOfBedrooms || 0}
                  disabled={formMode === "view"}
                  required
                />
              </div>

              <div>
                <Label htmlFor="numberOfBathrooms">Bathrooms</Label>
                <Input
                  id="numberOfBathrooms"
                  name="numberOfBathrooms"
                  type="number"
                  defaultValue={selectedProperty?.numberOfBathrooms || 0}
                  disabled={formMode === "view"}
                  required
                />
              </div>

              <div>
                <Label htmlFor="numberOfBalconies">Balconies</Label>
                <Input
                  id="numberOfBalconies"
                  name="numberOfBalconies"
                  type="number"
                  defaultValue={selectedProperty?.numberOfBalconies || 0}
                  disabled={formMode === "view"}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="carpetArea">Carpet Area (sq ft)</Label>
              <Input
                id="carpetArea"
                name="carpetArea"
                type="number"
                defaultValue={selectedProperty?.carpetArea || 0}
                disabled={formMode === "view"}
                required
              />
            </div>

            <div>
              <Label htmlFor="plotArea">Plot Area (sq ft)</Label>
              <Input
                id="plotArea"
                name="plotArea"
                type="number"
                defaultValue={selectedProperty?.plotArea || 0}
                disabled={formMode === "view"}
                required
              />
            </div>

            <div>
              <Label htmlFor="plotDimensions">Plot Dimensions</Label>
              <Input
                id="plotDimensions"
                name="plotDimensions"
                defaultValue={selectedProperty?.plotDimensions || ""}
                disabled={formMode === "view"}
              />
            </div>

            <div>
              <Label htmlFor="widthFacingRoad">Width Facing Road</Label>
              <Input
                id="widthFacingRoad"
                name="widthFacingRoad"
                type="number"
                defaultValue={selectedProperty?.widthFacingRoad || 0}
                disabled={formMode === "view"}
              />
            </div>

            <div>
              <Label htmlFor="facing">Facing</Label>
              <Input
                id="facing"
                name="facing"
                defaultValue={selectedProperty?.facing || ""}
                disabled={formMode === "view"}
              />
            </div>

            <div>
              <Label htmlFor="totalFloors">Total Floors</Label>
              <Input
                id="totalFloors"
                name="totalFloors"
                type="number"
                defaultValue={selectedProperty?.totalFloors || 0}
                disabled={formMode === "view"}
              />
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <Input
                id="status"
                name="status"
                defaultValue={selectedProperty?.status || ""}
                disabled={formMode === "view"}
              />
            </div>

            <div>
              <Label htmlFor="ageOfProperty">Age of Property (years)</Label>
              <Input
                id="ageOfProperty"
                name="ageOfProperty"
                type="number"
                defaultValue={selectedProperty?.ageOfProperty || 0}
                disabled={formMode === "view"}
              />
            </div>

            <div>
              <Label htmlFor="totalPrice">Total Price</Label>
              <Input
                id="totalPrice"
                name="totalPrice"
                type="number"
                defaultValue={selectedProperty?.totalPrice || 0}
                disabled={formMode === "view"}
                required
              />
            </div>

            <div>
              <Label htmlFor="pricePerUnit">Price per Unit</Label>
              <Input
                id="pricePerUnit"
                name="pricePerUnit"
                type="number"
                defaultValue={selectedProperty?.pricePerUnit || 0}
                disabled={formMode === "view"}
              />
            </div>

            <div>
              <Label htmlFor="otherRooms">Other Rooms</Label>
              <Input
                id="otherRooms"
                name="otherRooms"
                defaultValue={selectedProperty?.otherRooms || ""}
                disabled={formMode === "view"}
              />
            </div>

            <div>
              <Label htmlFor="furnishing">Furnishing</Label>
              <Input
                id="furnishing"
                name="furnishing"
                defaultValue={selectedProperty?.furnishing || ""}
                disabled={formMode === "view"}
              />
            </div>

            <div>
              <Label htmlFor="parking">Parking</Label>
              <Input
                id="parking"
                name="parking"
                defaultValue={selectedProperty?.parking || ""}
                disabled={formMode === "view"}
              />
            </div>

            <div>
              <Label htmlFor="amenities">Amenities</Label>
              <Input
                id="amenities"
                name="amenities"
                defaultValue={selectedProperty?.amenities || ""}
                disabled={formMode === "view"}
              />
            </div>

            <div>
              <Label htmlFor="locationAdvantage">Location Advantage</Label>
              <Input
                id="locationAdvantage"
                name="locationAdvantage"
                defaultValue={selectedProperty?.locationAdvantage || ""}
                disabled={formMode === "view"}
              />
            </div>

            <div>
              <Label htmlFor="rentalIncome">Rental Income</Label>
              <Input
                id="rentalIncome"
                name="rentalIncome"
                type="number"
                defaultValue={selectedProperty?.rentalIncome || 0}
                disabled={formMode === "view"}
              />
            </div>

            <div>
              <Label htmlFor="createdAt">Created At</Label>
              <Input
                id="createdAt"
                name="createdAt"
                type="datetime-local"
                value={
                  selectedProperty
                    ? new Date(selectedProperty.createdAt).toISOString().slice(0, 16)
                    : ""
                }
                disabled
                readOnly
              />
            </div>

            {formMode !== "view" && (
              <SheetFooter className="flex justify-end pt-4">
                <Button type="submit">{formMode === "update" ? "Update" : "Create"}</Button>
              </SheetFooter>
            )}
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}
