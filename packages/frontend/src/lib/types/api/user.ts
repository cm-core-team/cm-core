import { User } from "../models/user";

interface CreateUserResponse {
  user: User
}

interface LoginResponse {
  sessionToken: string;
}

export type { CreateUserResponse, LoginResponse };
