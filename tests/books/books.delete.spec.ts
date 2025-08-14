import { test, expect } from "@playwright/test";
import env from "../../env/dev";
import { signup, login } from "../../src/client/auth";
import { createBook, deleteBook, getBook } from "../../src/client/books";

test.describe("Delete Book", () => {
  let token: string;
  let bookId: number;

  test.beforeAll(async ({ request }) => {
    await signup(request, env.user.email, env.user.password);
    token = await login(request, env.user.email, env.user.password);

    const createRes = await createBook(request, token, {
      name: "Domain-Driven Design",
      author: "Eric Evans",
      published_year: 2003,
      book_summary: "DDD book"
    });
    const book = await createRes.json();
    bookId = book.id;
  });

  test("Delete book successfully", async ({ request }) => {
    const res = await deleteBook(request, token, bookId);
    expect(res.status()).toBe(200);

    const getRes = await getBook(request, token, bookId);
    expect(getRes.status()).toBe(404);
  });
});
