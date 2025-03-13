"use client";
import { useState } from "react";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { updateStudent } from "@/store/studentSlice";
import type { Student } from "@/store/studentSlice";

function StudentDetail() {
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editedStudent, setEditedStudent] = useState<Student | null>(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const params = useParams() as { id: string };
  const id = params.id;

  const fetchStudentDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://user-auth-api-nestjs.onrender.com/students/${id}`
      );
      const data = await response.json();
      setStudent(data.data);
      setEditedStudent(data.data);
    } catch (error) {
      console.error("Error fetching student details:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (id) {
      fetchStudentDetails();
    }
  }, [id]);

  const handleSaveChanges = async () => {
    if (!editedStudent) return;
    console.log("Saving changes for student:", JSON.stringify(editedStudent));
    try {
      const response = await fetch(
        `https://user-auth-api-nestjs.onrender.com/students/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: editedStudent.name,
            isActive: editedStudent.isActive,
          }),
        }
      );

      const data = await response.json();

      dispatch(updateStudent(data.data));
      setStudent(data.data);
      setEditing(false);
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <div className="spinner w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
          <p>Student not found</p>
        </div>
        <button
          onClick={() => router.push("/students")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-rounded-md hover:bg-blue-700 transition-colors"
        >
          Back to Student List
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-blue-500 to-indigo-600">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">Student Details</h1>
            <button
              onClick={() => router.push("/students")}
              className="bg-white text-blue-600 px-4 py-2 rounded-md shadow hover:bg-blue-50 transition-colors flex items-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to List
            </button>
          </div>
        </div>

        <div className="p-6">
          {editing ? (
            <div className="space-y-4 max-w-lg mx-auto">
              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  Student Code
                </label>
                <input
                  disabled
                  type="text"
                  className="w-full px-3 py-2 border rounded-md bg-gray-300"
                  value={editedStudent?.studentCode || ""}
                  onChange={(e) =>
                    setEditedStudent({
                      ...editedStudent!,
                      studentCode: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={editedStudent?.name || ""}
                  onChange={(e) =>
                    setEditedStudent({
                      ...editedStudent!,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActiveDetail"
                  className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                  checked={editedStudent?.isActive || false}
                  onChange={(e) =>
                    setEditedStudent({
                      ...editedStudent!,
                      isActive: e.target.checked,
                    })
                  }
                />
                <label htmlFor="isActiveDetail" className="ml-2 text-gray-700">
                  Active Student
                </label>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors border border-gray-300 rounded-md"
                  onClick={() => {
                    setEditing(false);
                    setEditedStudent(student);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  onClick={handleSaveChanges}
                >
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            <div className="max-w-lg mx-auto">
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {student.name}
                    </h2>
                    <p className="text-gray-500">
                      Student Code: {student.studentCode}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      student.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {student.isActive ? "Active" : "Inactive"}
                  </span>
                </div>

                <div className="border-t pt-4">
                  <h3 className="text-lg font-medium mb-3">
                    Student Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">ID</p>
                      <p className="font-medium">{student._id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Student Code</p>
                      <p className="font-medium">{student.studentCode}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="font-medium">{student.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <p className="font-medium">
                        {student.isActive ? "Active" : "Inactive"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors flex items-center"
                  onClick={() => {
                    setEditing(true);
                    setEditedStudent(student);
                  }}
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Edit Student
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default StudentDetail;
