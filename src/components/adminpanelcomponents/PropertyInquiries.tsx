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
// } from "@/components/ui/sheet";
// import { Card } from "@/components/ui/card";

// type QuizAttemptType = {
//   id: string;
//   userName: string;
//   quizTitle: string;
//   score: number;
//   totalQuestions: number;
//   percentage: number;
//   attemptDate: {
//     _seconds: number;
//     _nanoseconds: number;
//   };
//   detailedResults: {
//     questionId: string;
//     questionText: string;
//     correctOptionIndex: number;
//     selectedOptionIndex: number;
//     isCorrect: boolean;
//   }[];
// };

// export default function QuizAttempt() {
//   // Dummy example data for UI demo
//   const [quizAttempts, setQuizAttempts] = useState<QuizAttemptType[]>([
//     {
//       id: "1",
//       userName: "Alice",
//       quizTitle: "Science Quiz",
//       score: 8,
//       totalQuestions: 10,
//       percentage: 80,
//       attemptDate: { _seconds: 1694000000, _nanoseconds: 0 },
//       detailedResults: [
//         {
//           questionId: "q1",
//           questionText: "What is water made of?",
//           correctOptionIndex: 1,
//           selectedOptionIndex: 1,
//           isCorrect: true,
//         },
//         {
//           questionId: "q2",
//           questionText: "The sun is a star?",
//           correctOptionIndex: 0,
//           selectedOptionIndex: 1,
//           isCorrect: false,
//         },
//       ],
//     },
//   ]);

//   const [loading] = useState(false);
//   const [error] = useState<string | null>(null);

//   const [sheetOpen, setSheetOpen] = useState(false);
//   const [selectedAttempt, setSelectedAttempt] = useState<QuizAttemptType | null>(
//     null
//   );

//   const openView = (attempt: QuizAttemptType) => {
//     setSelectedAttempt(attempt);
//     setSheetOpen(true);
//   };

//   if (loading) return <p>Loading quiz attempts...</p>;
//   if (error)
//     return (
//       <p className="text-red-600 text-center mt-4">Error: {error}</p>
//     );

//   return (
//     <div>
//       <Card>
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead className="w-[60px]">ID</TableHead>
//               <TableHead>Name</TableHead>
//               <TableHead>Quiz Title</TableHead>
//               <TableHead>Score</TableHead>
//               <TableHead>Total Questions</TableHead>
//               <TableHead>Percentage</TableHead>
//               <TableHead className="text-center">Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {quizAttempts.length > 0 ? (
//               quizAttempts.map((attempt) => (
//                 <TableRow key={attempt.id}>
//                   <TableCell>{attempt.id}</TableCell>
//                   <TableCell>{attempt.userName}</TableCell>
//                   <TableCell>{attempt.quizTitle}</TableCell>
//                   <TableCell>{attempt.score}</TableCell>
//                   <TableCell>{attempt.totalQuestions}</TableCell>
//                   <TableCell>{attempt.percentage}%</TableCell>
//                   <TableCell>
//                     <div className="flex justify-center">
//                       <Button
//                         size="sm"
//                         variant="outline"
//                         onClick={() => openView(attempt)}
//                       >
//                         View
//                       </Button>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={7} className="text-center py-4">
//                   No quiz attempts found.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </Card>

//       {/* Sheet Drawer for viewing details */}
//       <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
//         <SheetContent side="right" className="w-[400px] sm:w-[540px] p-6">
//           <SheetHeader>
//             <SheetTitle>Quiz Attempt Details</SheetTitle>
//             <SheetDescription>
//               Detailed information of the selected quiz attempt.
//             </SheetDescription>
//           </SheetHeader>

//           {selectedAttempt && (
//             <div className="space-y-4 mt-6">
//               <p>
//                 <strong>ID:</strong> {selectedAttempt.id}
//               </p>
//               <p>
//                 <strong>Name:</strong> {selectedAttempt.userName}
//               </p>
//               <p>
//                 <strong>Quiz Title:</strong> {selectedAttempt.quizTitle}
//               </p>
//               <p>
//                 <strong>Score:</strong> {selectedAttempt.score}
//               </p>
//               <p>
//                 <strong>Total Questions:</strong> {selectedAttempt.totalQuestions}
//               </p>
//               <p>
//                 <strong>Percentage:</strong> {selectedAttempt.percentage}%
//               </p>
//               <p>
//                 <strong>Attempt Date: </strong>{" "}
//                 {new Date(selectedAttempt.attemptDate._seconds * 1000).toLocaleString()}
//               </p>

//               <div>
//                 <h3 className="font-semibold mt-4 mb-2">Detailed Results:</h3>
//                 {selectedAttempt.detailedResults.map((result) => (
//                   <div
//                     key={result.questionId}
//                     className={`p-2 rounded border mb-2 ${
//                       result.isCorrect ? "border-green-500" : "border-red-500"
//                     }`}
//                   >
//                     <p>
//                       <strong>Question:</strong> {result.questionText}
//                     </p>
//                     <p>
//                       <strong>Correct Option Index:</strong> {result.correctOptionIndex}
//                     </p>
//                     <p>
//                       <strong>Selected Option Index:</strong> {result.selectedOptionIndex}
//                     </p>
//                     <p>
//                       <strong>{result.isCorrect ? "Correct" : "Incorrect"}</strong>
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           <SheetFooter className="flex justify-end pt-4">
//             <Button variant="outline" onClick={() => setSheetOpen(false)}>
//               Close
//             </Button>
//           </SheetFooter>
//         </SheetContent>
//       </Sheet>
//     </div>
//   );
// }

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
// } from "@/components/ui/sheet";
// import { Card } from "@/components/ui/card";

// type InquiryType = {
//   id: string;
//   userName: string;
//   propertyName: string;
//   mobileNumber: string;
//   message: string;
// };

// export default function Inquiries() {
//   // Dummy example data for UI demo
//   const [inquiries, setInquiries] = useState<InquiryType[]>([
//     {
//       id: "1",
//       userName: "John Smith",
//       propertyName: "Seaside Villa",
//       mobileNumber: "+1 234 567 890",
//       message: "Is the property available for rent next month?",
//     },
//     {
//       id: "2",
//       userName: "Jane Doe",
//       propertyName: "Downtown Apartment",
//       mobileNumber: "+1 987 654 321",
//       message: "Can I schedule a visit on the weekend?",
//     },
//   ]);

// const fetchInquiries = async () => {
// setLoading(true);
// setError(null);

// try{
//   const response = await fetch('http://localhost:3000/inquiries,{
//     method: 'GET',
//   }
// }

// }
// const [error, setError]= useState<string | null>(null);
//   const [sheetOpen, setSheetOpen] = useState(false);
//   const [loading, setLoading]= useState(false);
//   const [selectedInquiry, setSelectedInquiry] = useState<InquiryType | null>(
//     null
//   );

//   const openView = (inquiry: InquiryType) => {
//     setSelectedInquiry(inquiry);
//     setSheetOpen(true);
//   };

//   return (
//     <div>
//       <Card>
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead className="w-[60px]">ID</TableHead>
//               <TableHead>User Name</TableHead>
//               <TableHead>Property Name</TableHead>
//               <TableHead>Mobile Number</TableHead>
//               <TableHead>Message</TableHead>
//               <TableHead className="text-center">Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {inquiries.length > 0 ? (
//               inquiries.map((inquiry) => (
//                 <TableRow key={inquiry.id}>
//                   <TableCell>{inquiry.id}</TableCell>
//                   <TableCell>{inquiry.userName}</TableCell>
//                   <TableCell>{inquiry.propertyName}</TableCell>
//                   <TableCell>{inquiry.mobileNumber}</TableCell>
//                   <TableCell className="truncate max-w-xs">{inquiry.message}</TableCell>
//                   <TableCell>
//                     <div className="flex justify-center">
//                       <Button
//                         size="sm"
//                         variant="outline"
//                         onClick={() => openView(inquiry)}
//                       >
//                         View
//                       </Button>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={6} className="text-center py-4">
//                   No inquiries found.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </Card>

//       {/* Sheet Drawer for viewing details */}
//       <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
//         <SheetContent side="right" className="w-[400px] sm:w-[540px] p-6">
//           <SheetHeader>
//             <SheetTitle>Inquiry Details</SheetTitle>
//             <SheetDescription>
//               Detailed information of the selected inquiry.
//             </SheetDescription>
//           </SheetHeader>

//           {selectedInquiry && (
//             <div className="space-y-4 mt-6">
//               <p>
//                 <strong>ID:</strong> {selectedInquiry.id}
//               </p>
//               <p>
//                 <strong>User Name:</strong> {selectedInquiry.userName}
//               </p>
//               <p>
//                 <strong>Property Name:</strong> {selectedInquiry.propertyName}
//               </p>
//               <p>
//                 <strong>Mobile Number:</strong> {selectedInquiry.mobileNumber}
//               </p>
//               <p>
//                 <strong>Message:</strong> {selectedInquiry.message}
//               </p>
//             </div>
//           )}

//           <SheetFooter className="flex justify-end pt-4">
//             <Button variant="outline" onClick={() => setSheetOpen(false)}>
//               Close
//             </Button>
//           </SheetFooter>
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
import { Card } from "@/components/ui/card";

type InquiryType = {
  id: string;
  userName: string;
  propertyName: string;
  mobileNumber: string;
  message: string;
  createdAt: string;
};
interface APIInquiryResponse {
  id: string;
  username: string;
  propertyName: string;
  mobileNumber: string | number;
  message: string;
  createdAt: string;
}
export default function Inquiries() {
  const [inquiries, setInquiries] = useState<InquiryType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryType | null>(
    null
  );

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://ikaaya-realty-backend.onrender.com/residential-properties';

  // Fetch inquiries from API
  const fetchInquiries = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${backendUrl}/property-inquiries`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        mode: "cors",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Inquiries API Response:", data);

      // Transform the API response to match our component's expected structure
    const transformedInquiries: InquiryType[] = data.map((item: APIInquiryResponse) => ({
  id: item.id,
  userName: item.username,
  propertyName: item.propertyName,
  mobileNumber: typeof item.mobileNumber === "number"
    ? item.mobileNumber.toString()
    : item.mobileNumber,
  message: item.message,
  createdAt: item.createdAt,
}));

      setInquiries(transformedInquiries);
    } catch (err) {
      console.error("Error fetching inquiries:", err);
      setError(
        err instanceof Error ? err.message : "Failed to fetch inquiries"
      );

      // Fallback: Use dummy data for development
     
     
    } finally {
      setLoading(false);
    }
  };

  // Delete inquiry API call
  const deleteInquiry = async (id: string) => {
    if (!confirm("Are you sure you want to delete this inquiry?")) return;

    setDeleteLoading(id);

    try {
      const response = await fetch(
        `${backendUrl}/property-inquiries/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log("Delete API Response: Success");

      // Remove the inquiry from local state after successful deletion
      setInquiries((prev) => prev.filter((inquiry) => inquiry.id !== id));

      // Close the sheet if the deleted inquiry was currently being viewed
      if (selectedInquiry?.id === id) {
        setSheetOpen(false);
        setSelectedInquiry(null);
      }

      alert("Inquiry deleted successfully!");
    } catch (err) {
      console.error("Error deleting inquiry:", err);
      alert("Failed to delete inquiry. Please try again.");
    } finally {
      setDeleteLoading(null);
    }
  };

  // Fetch inquiries on component mount
  useEffect(() => {
    fetchInquiries();
  }, []);

  const openView = (inquiry: InquiryType) => {
    setSelectedInquiry(inquiry);
    setSheetOpen(true);
  };

  // Loading state
  if (loading) {
    return <p className="text-center mt-4">Loading inquiries...</p>;
  }

  // Error state
  if (error) {
    return (
      <div className="text-center mt-4">
        <p className="text-red-600 mb-4">Error: {error}</p>
        <Button onClick={fetchInquiries} variant="outline">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Property Inquiries</h1>
        <Button onClick={fetchInquiries} variant="outline">
          Refresh
        </Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]">ID</TableHead>
              <TableHead>User Name</TableHead>
              <TableHead>Property Name</TableHead>
              <TableHead>Mobile Number</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inquiries.length > 0 ? (
              inquiries.map((inquiry) => (
                <TableRow key={inquiry.id}>
                  <TableCell className="font-mono text-xs">
                    {inquiry.id.substring(0, 8)}...
                  </TableCell>
                  <TableCell>{inquiry.userName}</TableCell>
                  <TableCell>{inquiry.propertyName}</TableCell>
                  <TableCell>{inquiry.mobileNumber}</TableCell>
                  <TableCell className="truncate max-w-xs">
                    {inquiry.message}
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {new Date(inquiry.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openView(inquiry)}
                      >
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteInquiry(inquiry.id)}
                        disabled={deleteLoading === inquiry.id}
                      >
                        {deleteLoading === inquiry.id
                          ? "Deleting..."
                          : "Delete"}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4">
                  No inquiries found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Sheet Drawer for viewing details */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="right" className="w-[400px] sm:w-[540px] p-6">
          <SheetHeader>
            <SheetTitle>Inquiry Details</SheetTitle>
            <SheetDescription>
              Detailed information of the selected inquiry.
            </SheetDescription>
          </SheetHeader>

          {selectedInquiry && (
            <div className="space-y-4 mt-6">
              <div className="grid grid-cols-1 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">ID</p>
                  <p className="font-medium font-mono text-sm">
                    {selectedInquiry.id}
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">User Name</p>
                  <p className="font-medium">{selectedInquiry.userName}</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Property Name</p>
                  <p className="font-medium">{selectedInquiry.propertyName}</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Mobile Number</p>
                  <p className="font-medium">{selectedInquiry.mobileNumber}</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Message</p>
                  <p className="font-medium">{selectedInquiry.message}</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Created At</p>
                  <p className="font-medium">
                    {new Date(selectedInquiry.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          )}

          <SheetFooter className="flex justify-between pt-6">
            <Button
              variant="destructive"
              onClick={() =>
                selectedInquiry && deleteInquiry(selectedInquiry.id)
              }
              disabled={deleteLoading === selectedInquiry?.id}
            >
              {deleteLoading === selectedInquiry?.id
                ? "Deleting..."
                : "Delete Inquiry"}
            </Button>
            <Button variant="outline" onClick={() => setSheetOpen(false)}>
              Close
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
