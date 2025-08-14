import { APIRequestContext, expect } from "@playwright/test";

export async function signup(request: APIRequestContext, email: string, password: string) {
  const res = await request.post("/signup", { data: { email, password } });
  expect(res.status()).toBeLessThan(500);
  return res;
}

export async function login(request: APIRequestContext, email: string, password: string) {
  const res = await request.post("/login", { data: { email, password } });
  expect(res.status()).toBe(200);
  const body = await res.json();
  expect(body.access_token).toBeTruthy();
  return body.access_token as string;
}
