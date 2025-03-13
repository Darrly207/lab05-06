"use client";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import "./globals.css";

import AuthWrapper from "@/components/AuthWrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <AuthWrapper>{children}</AuthWrapper>
    </Provider>
  );
}
