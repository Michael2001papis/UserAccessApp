export interface NewProfileForm {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  location?: string;
  street?: string;
  city: string;
  userType: string;
  languages?: string[];
}

export interface User extends NewProfileForm {
  id: number;
}
