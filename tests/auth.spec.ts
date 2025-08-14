import { test, expect } from "@playwright/test";
import env from "../env/dev";
import { signup, login } from "../src/client/auth";

test("Signup + Login returns JWT", async ({ request }) => {
  await signup(request, env.user.email, env.user.password);
  const token = await login(request, env.user.email, env.user.password);
  expect(typeof token).toBe("string");
});
