import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Student = {
  _id: string;
  studentCode: string;
  name: string;
  isActive: boolean;
};

interface StudentState {
  students: Student[];
}

const initialState: StudentState = {
  students: [],
};


const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    addStudent: (state, action: PayloadAction<Student>) => {
      state.students.push(action.payload);
    },
    removeStudent: (state, action: PayloadAction<string>) => {
      state.students = state.students.filter((s) => s._id !== action.payload);
    },
    updateStudent: (state, action: PayloadAction<Student>) => {
      const index = state.students.findIndex((s) => s._id === action.payload._id);
      if (index !== -1) {
        state.students[index] = action.payload; // Cập nhật trực tiếp
      }
    },
  },    
});

export const { addStudent, removeStudent, updateStudent } = studentSlice.actions;
export default studentSlice.reducer;
