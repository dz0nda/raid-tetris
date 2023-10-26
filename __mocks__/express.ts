import { NextFunction, Request, Response } from 'express';

const mockExpressApp = {
  use: jest.fn(),
  get: jest.fn(),
  post: jest.fn(),
};

const mockExpress = jest.fn(() => (req: Request, res: Response, next: NextFunction) => {});

mockExpress.mockReturnValue((req: Request, res: Response, next: NextFunction) => mockExpressApp);

export default mockExpress;
