import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addStudent, removeStudent, updataStudent } from "@/store/studentSlice";
import { RootState } from "@/store/store";
import { useRouter } from "next/router";

// Types
type Student = {
  id: number;
  studentCode: string;
  name: string;
  isActive: boolean;
};

// Components
export const StudentList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
  const [newStudent, setNewStudent] = useState({
    studentCode: "",
    name: "",
    isActive: true,
  });

  const dispatch = useDispatch();
  const students = useSelector((state: RootState) => state.students.students);
  const router = useRouter();

  const fetchStudents = async () => {
    try {
      const response = await fetch(
        "https://user-auth-api-nestjs.onrender.com/api/students"
      );
      const data = await response.json();

      // Add each student to Redux
      data.forEach((student: Student) => {
        dispatch(addStudent(student));
      });
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleAddStudent = async () => {
    try {
      const response = await fetch(
        "https://user-auth-api-nestjs.onrender.com/api/students",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newStudent),
        }
      );

      const data = await response.json();
      dispatch(addStudent(data));
      setNewStudent({ studentCode: "", name: "", isActive: true });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  const handleDeleteStudent = async (id: number) => {
    try {
      await fetch(
        `https://user-auth-api-nestjs.onrender.com/api/students/${id}`,
        {
          method: "DELETE",
        }
      );

      dispatch(removeStudent(id));
      setConfirmDelete(null);
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const viewStudentDetails = (student: Student) => {
    setSelectedStudent(student);
    router.push(`/students/${student.id}`);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-blue-500 to-indigo-600">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">
              Student Management
            </h1>
            <button
              onClick={() => setIsModalOpen(true)}
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
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Add Student
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">
                    Student Code
                  </th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">
                    Name
                  </th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr
                    key={student.id}
                    className="border-b hover:bg-gray-50 cursor-pointer"
                    onClick={() => viewStudentDetails(student)}
                  >
                    <td className="py-3 px-4 text-gray-800">
                      {student.studentCode}
                    </td>
                    <td className="py-3 px-4 text-gray-800">{student.name}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          student.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {student.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td
                      className="py-3 px-4 flex space-x-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                        onClick={() => {
                          setSelectedStudent(student);
                          setIsModalOpen(true);
                        }}
                      >
                        <svg
                          className="w-5 h-5"
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
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800 transition-colors"
                        onClick={() => setConfirmDelete(student.id)}
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add/Edit Student Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {selectedStudent ? "Edit Student" : "Add New Student"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">Student Code</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={
                    selectedStudent
                      ? selectedStudent.studentCode
                      : newStudent.studentCode
                  }
                  onChange={(e) =>
                    selectedStudent
                      ? setSelectedStudent({
                          ...selectedStudent,
                          studentCode: e.target.value,
                        })
                      : setNewStudent({
                          ...newStudent,
                          studentCode: e.target.value,
                        })
                  }
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={
                    selectedStudent ? selectedStudent.name : newStudent.name
                  }
                  onChange={(e) =>
                    selectedStudent
                      ? setSelectedStudent({
                          ...selectedStudent,
                          name: e.target.value,
                        })
                      : setNewStudent({ ...newStudent, name: e.target.value })
                  }
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                  checked={
                    selectedStudent
                      ? selectedStudent.isActive
                      : newStudent.isActive
                  }
                  onChange={(e) =>
                    selectedStudent
                      ? setSelectedStudent({
                          ...selectedStudent,
                          isActive: e.target.checked,
                        })
                      : setNewStudent({
                          ...newStudent,
                          isActive: e.target.checked,
                        })
                  }
                />
                <label htmlFor="isActive" className="ml-2 text-gray-700">
                  Active Student
                </label>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedStudent(null);
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                onClick={async () => {
                  if (selectedStudent) {
                    try {
                      const response = await fetch(
                        `https://user-auth-api-nestjs.onrender.com/api/students/${selectedStudent.id}`,
                        {
                          method: "PUT",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            name: selectedStudent.name,
                            isActive: selectedStudent.isActive,
                          }),
                        }
                      );

                      const data = await response.json();
                      dispatch(
                        updataStudent({ ...data, id: selectedStudent.id })
                      );
                      setIsModalOpen(false);
                      setSelectedStudent(null);
                    } catch (error) {
                      console.error("Error updating student:", error);
                    }
                  } else {
                    handleAddStudent();
                  }
                }}
              >
                {selectedStudent ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-medium text-gray-900">
              Confirm Deletion
            </h3>
            <p className="mt-2 text-gray-500">
              Are you sure you want to delete this student? This action cannot
              be undone.
            </p>
            <div className="mt-4 flex justify-end space-x-3">
              <button
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                onClick={() => setConfirmDelete(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                onClick={() => handleDeleteStudent(confirmDelete)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
