"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addStudent } from "@/store/studentSlice";

const AddStudentForm = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [course, setCourse] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !age || !course) return;

    dispatch(addStudent({ id: Date.now(), name, age: parseInt(age), course }));
    setName("");
    setAge("");
    setCourse("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-lg">
      <h2 className="text-xl font-bold mb-3">Add Student</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <input
        type="text"
        placeholder="Course"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded w-full"
      >
        Add Student
      </button>
    </form>
  );
};

export default AddStudentForm;
