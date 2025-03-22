import "./globals.css";
import { AuthProvider } from "@/context/authContext";

export const metadata = {
  title: "SpendWise",
  description: "The next-gen financial literacy and management platform.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <AuthProvider>
            {children}
        </AuthProvider>
      </body>
    </html>
  );
}
