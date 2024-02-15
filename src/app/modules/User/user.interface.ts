export type TUser = {
  email: string;
  role: 'user' | 'student' | 'faculty' | 'admin';
  hasAdditionalInfo: boolean;
  isDeleted: boolean;
};
