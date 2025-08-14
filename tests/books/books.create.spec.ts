import { test, expect } from "@playwright/test";
import env from "../../env/dev";
import { signup, login } from "../../src/client/auth";
import { createBook } from "../../src/client/books";
import bookSchema from "../../src/schemas/book.schema.json" assert { type: "json" };
import { validateSchema } from "../../src/utils/schema";

test.describe("Book Creation", () => {
  let token: string;

  test.beforeAll(async ({ request }) => {
    await signup(request, env.user.email, env.user.password);
    token = await login(request, env.user.email, env.user.password);
  });

  test("Create book successfully", async ({ request }) => {
    const res = await createBook(request, token, {
      name: "Clean Code",
      author: "Robert C. Martin",
      published_year: 2008,
      book_summary: "A guide to writing clean code"
    });
    expect(res.status()).toBe(200);
    const book = await res.json();
    validateSchema(bookSchema, book);
  });
});
