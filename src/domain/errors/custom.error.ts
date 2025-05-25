export class CustomError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly message: string
  ) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  static badRequest = (message: string) => new CustomError(400, message);
  static unauthorized = (message: string) => new CustomError(401, message);
  static forbidden = (message: string) => new CustomError(403, message);
  static notFound = (message: string) => new CustomError(404, message);
  static internalServerError = (message: string='Internal Server Error') => new CustomError(500, message);
}
