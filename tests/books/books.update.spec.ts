import { test, expect } from "@playwright/test";
import env from "../../env/dev";
import { getAuthToken } from "../../src/utils/authHelper";
import { createBook, updateBook, getBook } from "../../src/client/books";
import bookSchema from "../../src/schemas/book.schema.json" assert { type: "json" };
import { validateSchema } from "../../src/utils/schema";

test.describe("Update Book", () => {
  let token: string;
  let bookId: number;

  test.beforeAll(async ({ request }) => {
  token = await getAuthToken(request);


    const createRes = await createBook(request, token, {
      name: "Refactoring",
      author: "Martin Fowler",
      published_year: 1999,
      book_summary: "Refactor code examples"
    });
    const book = await createRes.json();
    bookId = book.id;
  });

  test("Update book successfully", async ({ request }) => {
    const res = await updateBook(request, token, bookId, { book_summary: "Updated summary" });
    expect(res.status()).toBe(200);

    const getRes = await getBook(request, token, bookId);
    const book = await getRes.json();
    expect(book.book_summary).toBe("Updated summary");
    validateSchema(bookSchema, book);
  });
});
