import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ENV } from '../config/env';

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // Demo fallback for mock/dev environment
  if (email === 'admin@buniyad.app' && password === 'Admin@123456') {
    const token = jwt.sign({ id: 'admin-1', email, role: 'ADMIN' }, ENV.JWT_SECRET, { expiresIn: '7d' });
    return res.json({
      token,
      user: { id: 'admin-1', name: 'System Admin', email, role: 'ADMIN' },
    });
  }

  if (email === 'client@rightcon.in' && password === 'Client@123456') {
    const token = jwt.sign({ id: 'user-1', email, role: 'USER' }, ENV.JWT_SECRET, { expiresIn: '7d' });
    return res.json({
      token,
      user: { id: 'user-1', name: 'Rajesh Sharma', email, role: 'USER' },
    });
  }

  return res.status(401).json({ error: 'Invalid credentials. Use admin@buniyad.app / Admin@123456' });
}

export async function register(req: Request, res: Response) {
  const { email, password, name, phone } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  const token = jwt.sign({ id: `user-${Date.now()}`, email, role: 'USER' }, ENV.JWT_SECRET, { expiresIn: '7d' });

  return res.status(201).json({
    message: 'User registered successfully',
    token,
    user: { id: `user-${Date.now()}`, name, email, phone, role: 'USER' },
  });
}
