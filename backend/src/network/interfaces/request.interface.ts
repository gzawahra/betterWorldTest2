import express from 'express';

interface User {
  networkId: string;
}

export interface Request extends express.Request {
  user: User;
}
