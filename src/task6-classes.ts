// ============================================================
// Практика 3: Классы и ООП
// ============================================================
// Цель: заменить функциональный каталог из Практик 2.1–2.2
// на класс с состоянием.
//
// Проверка: npm test -- task6
// ============================================================

import { Book, formatBook } from "./task1-types";
import { createBookFromForm } from "./task4-integration";
import { filterByTitle, sortBooks } from "./task5-utils";

export class BookCatalog {
  private books: Book[];
  readonly id: string;
  constructor(id: string, books: Book[] = []) {
    this.id = id;
    this.books = books;
  }

  addBook(book: Book): void {
    this.books = [...this.books, book] 
  }

  removeBook(id: string): void {
    this.books = this.books.filter(book => book.id != id)
  }

  getBooks(): Book[] {
    return [...this.books]
  }

  searchByTitle(query: string): Book[] {
    return this.books.filter(filterByTitle(query));
  }

  sortBy(sortType: "year" | "rating"): Book[] {
    return sortBooks(this.books, sortType);
  }
  
  get count(): number {
    return this.books.length
  }
}

export class BookClass implements Book {
  constructor(
    public readonly id: string,
    public title: string,
    public authors: string[],
    public year?: number,
    public rating?: number,
  ) {}

  format(): string {
    return formatBook(this);
  }

  static createFromFormData(formData: FormData): BookClass {
    const book = createBookFromForm(formData);
    return new BookClass(book.id, book.title, book.authors, book.year, book.rating);
  }
}
/*
  Реализуйте класс BookCatalog.

  Состояние:
    - books: Book[]        — приватное, снаружи недоступно
    - id: string           — readonly

  Конструктор: (id: string, books: Book[] = [])

  Публичный API:
    addBook(book: Book): void
    removeBook(id: string): void
    getBooks(): Book[]
    searchByTitle(query: string): Book[]
    sortBy(sortType: 'year' | 'rating'): Book[]
    get count(): number

  Требования:
    - addBook / removeBook не мутируют массив, а создают новый
    - searchByTitle и sortBy переиспользуют filterByTitle / sortBooks
    - внешний код не может присвоить this.books напрямую

  Бонус: класс Book с полями id, title, authors, year?, rating?,
  методом format() и статическим createFromFormData(FormData).
*/
