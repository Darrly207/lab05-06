import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Định nghĩa kiểu dữ liệu cho user
interface User {
  id: string;
  fullName: string;
  username: string;
  password: string;
}

interface UserState {
  user: User | null;
  token: string | null; 
}

// Trạng thái mặc định (chứa tài khoản mặc định)
const initialState: UserState = {
  user: null,
  token: null, 
};

// Tạo auth slice
const userReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: User; token: string }> ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
    register: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

// Xuất reducers
export const { login, logout, register, setUser } = userReducer.actions;
export default userReducer.reducer;
