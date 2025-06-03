import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { Plan } from '../models/Plan';
import { PLANS, PlanKey } from '../config/plans';

export const register = async (req: Request, res: Response) => {
  const { email, password, firstName, lastName, plan = 'discovery' } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ message: 'Email already used' });

  let planDoc = await Plan.findOne({ name: PLANS[plan as PlanKey].name });
  if (!planDoc) {
    planDoc = await Plan.create(PLANS[plan as PlanKey]);
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({
    email,
    password: hashed,
    firstName,
    lastName,
    role: 'concierge',
    plan: planDoc._id,
  });

  const token = jwt.sign(
    { id: user._id, role: user.role, plan: planDoc },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: '1h' }
  );

  res.json({ token, user: { id: user._id, email, firstName, lastName, role: user.role, plan: planDoc } });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).populate('plan');
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign(
    { id: user._id, role: user.role, plan: user.plan, iaSearchesUsed: user.iaSearchesUsed, suggestionUsed: user.suggestionUsed },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: '1h' }
  );
  res.json({ token, user: { id: user._id, email, firstName: user.firstName, lastName: user.lastName, role: user.role, plan: user.plan } });
};

export const me = async (req: any, res: Response) => {
  const user = await User.findById(req.user.id).populate('plan');
  if (!user) return res.status(404).json({ message: 'Not found' });
  res.json({ id: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName, role: user.role, plan: user.plan, iaSearchesUsed: user.iaSearchesUsed, suggestionUsed: user.suggestionUsed });
};
