import { Router } from 'express';
import { authMiddleware, checkQuota } from '../middleware/auth';
import { User } from '../models/User';

const router = Router();

router.get('/search', authMiddleware, checkQuota('iaSearchQuota'), async (req: any, res) => {
  const user = await User.findById(req.user.id).populate('plan');
  if (!user) return res.status(404).json({ message: 'User not found' });
  user.iaSearchesUsed += 1;
  await user.save();
  res.json({ results: [], used: user.iaSearchesUsed });
});

export default router;
