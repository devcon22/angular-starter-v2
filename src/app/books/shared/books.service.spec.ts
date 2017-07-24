import { booksStub, bookMock } from './books.service.stub';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { it } from '@angular/cli/lib/ast-tools/spec-utils';
import { BaseRequestOptions, Http, HttpModule, Response, ResponseOptions } from '@angular/http';
import { async, inject, TestBed } from '@angular/core/testing';

import { BooksService } from './books.service';


describe('BooksService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BooksService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backendInstance, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        },

      ],
      imports: [HttpModule]
    });
  });

  it('should be created', inject([BooksService], (service: BooksService) => {
    expect(service).toBeTruthy();
  }));

  it('should return all books', inject([BooksService, MockBackend], (service: BooksService, backend: MockBackend) => {
    backend.connections.subscribe((connection: MockConnection) => {
      const options = new ResponseOptions({
        body: JSON.stringify(booksStub)
      });
      connection.mockRespond(new Response(options));
    });

    service.getBooks()
      .subscribe(
      books => expect(books).toEqual(booksStub)
      );
  }
  ));

  it('should return one specific book', inject([BooksService, MockBackend], (service: BooksService, backend: MockBackend) => {
    backend.connections.subscribe((connection: MockConnection) => {
      const options = new ResponseOptions({
        body: JSON.stringify(booksStub[0])
      });
      connection.mockRespond(new Response(options));
    });

    service.getBook('1234')
      .subscribe(
      book => expect(book).toEqual(booksStub[0])
      );
  }
  ));

  it('should update a book', inject([BooksService, MockBackend], (service: BooksService, backend: MockBackend) => {
    backend.connections.subscribe((connection: MockConnection) => {
      const options = new ResponseOptions({
        body: JSON.stringify(bookMock)
      });
      connection.mockRespond(new Response(options));
    });

    service.updateBook(bookMock)
      .subscribe(
      book => expect(book.title).toEqual(bookMock.title)
      );
  }
  ));

  it('should create a book', inject([BooksService, MockBackend], (service: BooksService, backend: MockBackend) => {
    backend.connections.subscribe((connection: MockConnection) => {
      const options = new ResponseOptions({
        body: JSON.stringify(bookMock)
      });
      connection.mockRespond(new Response(options));
    });

    service.createBook(bookMock)
      .subscribe(
      book => expect(book.title).toEqual(bookMock.title)
      );
  }
  ));

});
