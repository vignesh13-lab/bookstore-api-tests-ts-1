import { APIRequestContext } from "@playwright/test";
import env from "../../env/dev";
import { signup, login } from "../client/auth";

export async function getAuthToken(request: APIRequestContext): Promise<string> {
  await signup(request, env.user.email, env.user.password);
  const token = await login(request, env.user.email, env.user.password);
  return token;
}