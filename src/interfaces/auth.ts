export interface User {
  id: string;
  username: string;
  full_name: string;
  role: "admin" | "doctor" | "nurse" | "receptionist";
}
