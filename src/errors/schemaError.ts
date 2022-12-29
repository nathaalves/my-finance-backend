export class SchemaError extends Error {
  message: string;
  details: string[];
  statusCode: number;

  constructor(message: string, details: string[], statusCode: number) {
    super();
    this.message = message;
    this.details = details;
    this.statusCode = statusCode;
  }
}
