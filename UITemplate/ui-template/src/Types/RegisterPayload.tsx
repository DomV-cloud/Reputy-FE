export type RegisterPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "Tenant" | "Landlord";
};
