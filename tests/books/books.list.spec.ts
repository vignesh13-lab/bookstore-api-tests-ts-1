import { test, expect } from "@playwright/test";
import env from "../../env/dev";
import { signup, login } from "../../src/client/auth";
import { createBook, listBooks } from "../../src/client/books";
import bookSchema from "../../src/schemas/book.schema.json" assert { type: "json" };
import { validateSchema } from "../../src/utils/schema";

test.describe("List Books", () => {
  let token: string;

  test.beforeAll(async ({ request }) => {
    await signup(request, env.user.email, env.user.password);
    token = await login(request, env.user.email, env.user.password);

    // Create a book for listing
    await createBook(request, token, {
      name: "Test Book",
      author: "Tester",
      published_year: 2025,
      book_summary: "Test summary"
    });
  });

  test("List all books", async ({ request }) => {
    const res = await listBooks(request, token);
    expect(res.status()).toBe(200);
    const books = await res.json();
    expect(Array.isArray(books)).toBeTruthy();
    books.forEach(book => validateSchema(bookSchema, book));
  });
});
