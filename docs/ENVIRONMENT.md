# Environment Configuration

This project relies on several external services (MongoDB Atlas, Moondream, Anthropic, Stripe, OAuth providers) and therefore **must** be configured using environment variables.

Create a `.env.local` during local development (Vercel will use its own env-vars UI in prod).  
All variables are **case-sensitive**.

| Variable | Example / Format | Scope | Description |
|----------|------------------|-------|-------------|
| **MONGODB_URI** | `mongodb+srv://user:pass@cluster0.abc.mongodb.net/db?retryWrites=true&w=majority` | Server | Primary MongoDB Atlas connection string. If **unset** in dev, the code falls back to an in-memory instance. |
| **MOONDREAM_KEY** | `sk-live-…` | Server | API key for the Moondream Vision-Language Model. |
| **ANTHROPIC_API_KEY** | `claude-prod-…` | Server | API key for Anthropic Claude.  Used only for long/complex prompts. |
| **STRIPE_SECRET_KEY** | `sk_live_…` | Server | Secret key for Stripe's Node SDK. |
| **NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY** | `pk_live_…` | Client | Publishable key – safe to expose. |
| **GITHUB_ID** | `Iv1.…` | Server | GitHub OAuth Client ID. |
| **GITHUB_SECRET** | `gho_…` | Server | GitHub OAuth Client Secret. |
| **GOOGLE_ID** | `123456789012-abcdefg.apps.googleusercontent.com` | Server | Google OAuth Client ID. |
| **GOOGLE_SECRET** | `GOCSPX-…` | Server | Google OAuth Client Secret. |
| **NEXTAUTH_SECRET** | Random 32-byte string | Server | Encryption key for NextAuth sessions. |
| **NEXTAUTH_URL** | `http://localhost:3000` (dev) / `https://your-domain` (prod) | Server | URL used by NextAuth callbacks. |
| **FREE_IMAGE_LIMIT** | `25` | Server | Max images/playground requests for guest users. |
| **FREE_MAX_IMAGE_SIZE_KB** | `256` | Server | Max upload size (KB) for guest users. |
| **REWARD_WEIGHT_ACCURACY** | `2` | Server | RL reward weight (accuracy). |
| **REWARD_WEIGHT_HELPFULNESS** | `1` | Server | RL reward weight (helpfulness). |
| **REWARD_WEIGHT_LATENCY** | `-1` | Server | RL penalty (latency). |

> **Tip:** generate a strong random `NEXTAUTH_SECRET` via `openssl rand -base64 32`.

---
## Loading order
1. `.env.local` (ignored by git)  
2. `secrets.env.local` (optional secondary file)  
3. Vercel / Host platform env-vars

---
## Quick start (local)
```bash
cp .env.example .env.local  # an example file will be committed soon
# fill in the keys above
npm run dev
```

---
## Related docs
* `README.md` – high-level project overview
* `PLAN.md` – architectural roadmap and feature backlog 