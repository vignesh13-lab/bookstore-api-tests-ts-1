import { test, expect } from "@playwright/test";
import env from "../../env/dev";
import { signup, login } from "../../src/client/auth";
import { createBook, getBook, updateBook, deleteBook } from "../../src/client/books";

test.describe("Books negative scenarios", () => {
  let token: string;

  test.beforeAll(async ({ request }) => {
    // Signup and login to get JWT token
    await signup(request, env.user.email, env.user.password);
    token = await login(request, env.user.email, env.user.password);
  });

  test("unauthorized access should return 403", async ({ request }) => {
    const res = await request.get(`${env.baseURL}/books/1`);
    expect(res.status()).toBe(403);
  });

  test("creating a book with invalid payload should fail", async ({ request }) => {
    const res = await createBook(request, token, { name: "", author: "", published_year: 0 });
    expect([400, 422, 500]).toContain(res.status());
  });

  test("accessing/updating/deleting non-existent book should return 404", async ({ request }) => {
    const nonExistentId = 9999;

    const getRes = await getBook(request, token, nonExistentId);
    expect(getRes.status()).toBe(404);

    const updateRes = await updateBook(request, token, nonExistentId, { name: "x" });
    expect(updateRes.status()).toBe(404);

    const deleteRes = await deleteBook(request, token, nonExistentId);
    expect(deleteRes.status()).toBe(404);
  });
});
