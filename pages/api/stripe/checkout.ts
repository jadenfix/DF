import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { z } from 'zod';
import db from '../../../lib/mongodb';
import stripe from '../../../lib/stripe';

const schema = z.object({
  plan: z.enum(['pro', 'enterprise']),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ status: 'error', error: 'Method not allowed' });
  }

  await db();
  const parse = schema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ status: 'error', error: parse.error.flatten() });
  }

  const session = await getServerSession(req, res, authOptions);
  const user = session?.user as any;
  if (!user || user.name === 'Guest') {
    return res.status(401).json({ status: 'error', error: 'Login required for checkout' });
  }

  // Map plan to Stripe price ID (replace with your real price IDs)
  const priceMap: Record<string, string> = {
    pro: process.env.STRIPE_PRICE_PRO_ID!,
    enterprise: process.env.STRIPE_PRICE_ENTERPRISE_ID!,
  };
  const priceId = priceMap[parse.data.plan];
  if (!priceId) {
    return res.status(400).json({ status: 'error', error: 'Invalid plan' });
  }

  try {
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer_email: user.email,
      success_url: `${process.env.NEXTAUTH_URL}/pricing?success=1`,
      cancel_url: `${process.env.NEXTAUTH_URL}/pricing?canceled=1`,
      metadata: { userId: user.id },
    });
    return res.status(200).json({ status: 'ok', data: { url: checkoutSession.url } });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ status: 'error', error: 'Stripe error' });
  }
} 