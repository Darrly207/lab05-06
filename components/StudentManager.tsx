import { useRouter } from "next/router";
import { StudentDetail } from "./StudentDetail";
import { StudentList } from "./StudentList";

const StudentManagementApp = () => {
  const router = useRouter();
  const { pathname } = router;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Rendering either the list or detail view based on route */}
      {pathname.includes("/students/") ? <StudentDetail /> : <StudentList />}
    </div>
  );
};

export default StudentManagementApp;
