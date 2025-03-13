import StudentList from "./StudentList";

const StudentManagementApp = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Rendering either the list or detail view based on route */}
      <StudentList />
    </div>
  );
};

export default StudentManagementApp;
