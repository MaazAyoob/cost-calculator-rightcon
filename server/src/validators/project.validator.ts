import { z } from 'zod';

export const createProjectSchema = z.object({
  name: z.string().min(3, 'Project name must be at least 3 characters'),
  city: z.enum(['Bangalore', 'Mysore']),
  authority: z.string().min(2, 'Authority is required'),
  plotLength: z.number().positive('Plot length must be positive'),
  plotWidth: z.number().positive('Plot width must be positive'),
  houseType: z.enum(['Villa', 'Duplex', 'Triplex', 'Rental', 'Mixed Use']),
  floors: z.number().min(1).max(5),
  qualityTier: z.enum(['Essential', 'Premium', 'Luxury']),
});
