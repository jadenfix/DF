Below is a recommended .cursorrc config (in your project root) plus a set of paired Cursor rules that will guide Cursor’s code generation to match your DreamForge conventions end-to-end.

⸻


// .cursorrc
{
  // 1. Project conventions
  "projectType": "nextjs",
  "language": "typescript",
  "style": "tailwind",

  // 2. Directory layout
  "dirs": {
    "pages": "pages",
    "api": "pages/api",
    "components": "components",
    "lib": "lib",
    "models": "models"
  },

  // 3. Enforce these libs & patterns
  "patterns": {
    "validation": "zod",
    "db": "mongodb-atlas-singleton",
    "queue": "bullmq",
    "stripe": "stripe-node-sdk",
    "auth": "nextauth-js"
  },

  // 4. API Route skeleton
  "apiRouteTemplate": {
    "imports": [
      "import { NextApiRequest, NextApiResponse } from 'next';",
      "import db from '../../lib/mongodb';",
      "import { z } from 'zod';"
    ],
    "body": [
      "await db();",
      "const data = Schema.parse(req.body);",
      "// your logic here",
      "res.status(200).json({/*...*/});"
    ]
  },

  // 5. Model boilerplate
  "modelTemplate": {
    "imports": ["import mongoose from 'mongoose';"],
    "body": [
      "const XSchema = new mongoose.Schema({/* your fields */});",
      "export default mongoose.models.X || mongoose.model('X', XSchema);"
    ]
  },

  // 6. Lib wrappers
  "libTemplates": {
    "moondreamClient": "export const client = new Moondream({ apiKey: process.env.MOONDREAM_KEY });",
    "anthropicClient": "export const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });",
    "stripeClient": "export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2020-08-27' });"
  },

  // 7. Commit message style
  "commitStyle": "conventional"
}


⸻

Cursor Rules Explained
	1.	Project & Language
	•	Always scaffold in Next.js + TypeScript.
	•	Use Tailwind CSS for all styling.
	2.	Directories
	•	API routes live under pages/api, UI pages under pages.
	•	Shared components in components/, utilities in lib/, and Mongoose schemas in models/.
	3.	Validation & DB
	•	Import and use Zod for request validation in every API route.
	•	Use the MongoDB Atlas singleton connector in lib/mongodb.ts.
	4.	Queue & Worker
	•	Scaffold job-queue code using BullMQ with REDIS_URL.
	•	Use an in-memory fallback if no REDIS_URL is set.
	5.	Stripe & Auth
	•	API routes for Stripe must import the stripe wrapper from lib/stripe.ts.
	•	Use NextAuth.js for authentication (GitHub/Google) with guest mode support.
	6.	API Route Boilerplate
	•	Always begin routes with await db() and a Zod parse.
	•	Return standardized JSON responses { status: 'ok', data } or { status: 'error', error }.
	7.	Model Definitions
	•	Every Mongoose model file follows the same template: import mongoose, new Schema, export default mongoose.models.X || mongoose.model('X', Schema).
	8.	Lib Wrappers
	•	Centralize external clients (Moondream, Anthropic, Stripe) in lib/ so environment-var handling is consistent.
	9.	Commit Messages
	•	Encourage Conventional Commits: feat: add /api/dream route, fix: validate input with Zod.

⸻

How to use:
	1.	Create the file .cursorrc at your project root with the JSON above.
	2.	Reload or restart Cursor in your IDE.
	3.	Cursor will now adhere to these conventions when generating new files or code snippets.

This setup ensures consistent, high-quality scaffolding across your DreamForge codebase—exactly how a professional Node.js + Next.js team would work.