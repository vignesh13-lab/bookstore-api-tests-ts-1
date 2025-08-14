import { APIRequestContext } from "@playwright/test";

const authHeader = (token?: string) => token ? { Authorization: `Bearer ${token}` } : {};

export async function createBook(request: APIRequestContext, token: string | undefined, payload: any) {
  return request.post("/books/", { data: payload, headers: authHeader(token) });
}

export async function getBook(request: APIRequestContext, token: string | undefined, id: number) {
  return request.get(`/books/${id}`, { headers: authHeader(token) });
}

export async function updateBook(request: APIRequestContext, token: string | undefined, id: number, data: any) {
  return request.put(`/books/${id}`, { data, headers: authHeader(token) });
}

export async function deleteBook(request: APIRequestContext, token: string | undefined, id: number) {
  return request.delete(`/books/${id}`, { headers: authHeader(token) });
}

export async function listBooks(request: APIRequestContext, token: string | undefined) {
  return request.get("/books/", { headers: authHeader(token) });
}
