class AppError extends Error {
  isOperational: boolean;
  status: string;
  constructor(message: string, public statusCode: number) {
    super(message);
    this.status = `${statusCode}`[0] === "5" ? "error" : "fail";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
