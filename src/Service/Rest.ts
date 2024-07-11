export type RemoteError = {
    message: string;
    code?: number;
    type?: string;
  };

  export class Response<T> {
    content?: T;
    error?: RemoteError;
    totalElements?: number;
    totalPages?: number;
    get hasError(): boolean {
      return this.error !== undefined;
    }
  }
