import StudentList from "@/components/StudentList";
export default function Students() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Student Management</h1>
      <StudentList />
    </div>
  );
}
