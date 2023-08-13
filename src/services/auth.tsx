/* eslint-disable import/prefer-default-export */

import network from './network';

export type LoginData = {
  email: FormDataEntryValue;
  password: FormDataEntryValue;
};

export type UserAxiosResponse = {
  id: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
};

export type User = {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  isStaff: boolean;
  isSuperuser: boolean;
};

export type LoginResponse = User;

export type LoginRequest = {
  email: string;
  password: string;
};

export interface RegisterFormData {
  email: FormDataEntryValue | null;
  username: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
  firstName: FormDataEntryValue | null;
  lastName: FormDataEntryValue | null;
}

export type RegisterRequest = {
  email: string;
  password: string;
  username: string;
  name: string;
  surname: string;
};

export type RegisterResponse = User;

export function login(credentials: LoginData) {
  const loginRequest: LoginRequest = {
    email: credentials.email.toString(),
    password: credentials.password.toString(),
  };
  return network.post('/auth/login', loginRequest);
}

export function register(data: RegisterFormData) {
  if (
    !data.email ||
    !data.username ||
    !data.password ||
    !data.firstName ||
    !data.lastName
  ) {
    throw new Error('Missing required fields');
  }
  const registerRequest: RegisterRequest = {
    email: data.email.toString(),
    username: data.username.toString(),
    password: data.password.toString(),
    name: data.firstName.toString(),
    surname: data.lastName.toString(),
  };
  return network.post('/auth/register', registerRequest);
}
