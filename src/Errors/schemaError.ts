export class SchemaError extends Error {
  error: string;
  details: string[];
  statusCode: number;

  constructor(error: string, details: string[], statusCode: number) {
    super();
    this.error = error;
    this.details = details;
    this.statusCode = statusCode;
  }
}
