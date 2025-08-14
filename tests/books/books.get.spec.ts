import { test, expect } from "@playwright/test";
import env from "../../env/dev";
import { signup, login } from "../../src/client/auth";
import { createBook, getBook } from "../../src/client/books";
import bookSchema from "../../src/schemas/book.schema.json" assert { type: "json" };
import { validateSchema } from "../../src/utils/schema";

test.describe("Get Book", () => {
  let token: string;
  let bookId: number;

  test.beforeAll(async ({ request }) => {
    await signup(request, env.user.email, env.user.password);
    token = await login(request, env.user.email, env.user.password);
    const res = await createBook(request, token, {
      name: "Pragmatic Programmer",
      author: "Andrew Hunt",
      published_year: 1999,
      book_summary: "Tips for better coding"
    });
    const book = await res.json();
    bookId = book.id;
  });

  test("Get book by ID", async ({ request }) => {
    const res = await getBook(request, token, bookId);
    expect(res.status()).toBe(200);
    const book = await res.json();
    validateSchema(bookSchema, book);
  });
});
