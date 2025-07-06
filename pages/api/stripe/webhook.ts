import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../lib/mongodb';
import stripe from '../../../lib/stripe';
import User from '../../../models/User';

// Stripe requires the raw body to verify signature
export const config = {
  api: {
    bodyParser: false,
  },
};

const relevantEvents = new Set([
  'checkout.session.completed',
  'invoice.paid',
  'invoice.payment_failed',
]);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ status: 'error', error: 'Method not allowed' });
  }

  await db();
  const sig = req.headers['stripe-signature'] as string;
  let event;
  try {
    const rawBody = await getRawBody(req);
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err: any) {
    console.error('Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (relevantEvents.has(event.type)) {
    try {
      switch (event.type) {
        case 'checkout.session.completed': {
          const session = event.data.object as any;
          // Find user by metadata.userId and mark as pro
          if (session.metadata?.userId) {
            await User.updateOne(
              { _id: session.metadata.userId },
              { $set: { plan: 'pro', stripeCustomerId: session.customer } }
            );
          }
          break;
        }
        case 'invoice.paid': {
          // Optionally handle renewals
          break;
        }
        case 'invoice.payment_failed': {
          // Optionally handle failed payments
          break;
        }
      }
    } catch (err) {
      console.error('Webhook handler error:', err);
      return res.status(500).json({ status: 'error', error: 'Webhook handler error' });
    }
  }
  res.json({ received: true });
}

// Helper to get raw body for Stripe signature
import { Readable } from 'stream';
function getRawBody(req: NextApiRequest): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    (req as any).on('data', (chunk: Buffer) => chunks.push(chunk));
    (req as any).on('end', () => resolve(Buffer.concat(chunks)));
    (req as any).on('error', reject);
  });
} 