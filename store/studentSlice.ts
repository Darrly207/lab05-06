import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Student = {
  id: number;
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
    removeStudent: (state, action: PayloadAction<number>) => {
      state.students = state.students.filter((s) => s.id !== action.payload);
    },
    updataStudent: ( state, action: PayloadAction<Student>) => {
      state.students = state.students.map((s) => {
        if(s.id === action.payload.id) {
          return action.payload;
        }
        return s;
        });
    },
    },
});

export const { addStudent, removeStudent, updataStudent } = studentSlice.actions;
export default studentSlice.reducer;
