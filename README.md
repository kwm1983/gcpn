# Gulf Coast Production Network — Phase 2 Setup Guide

Welcome! This document walks you through getting your site live in about 15–20 minutes
tomorrow on your computer. Follow each step in order.

---

## What You Have

This is a full Next.js web application with:
- Real user accounts (sign up / log in)
- Pro profiles that pros can edit themselves
- Browse & search directory with filters
- Job posting form that saves to a real database
- Pro dashboard to manage their profile
- Client dashboard to manage their job posts
- Ready to deploy on Vercel (free)

---

## Step 1 — Create Your 3 Free Accounts (5 minutes)

### 1A. GitHub (stores your code)
1. Go to https://github.com
2. Click "Sign up" — create a free account
3. Done. You'll use this in Step 3.

### 1B. Supabase (your database + user auth)
1. Go to https://supabase.com
2. Click "Start your project" — sign up free
3. Click "New Project"
   - Name it: `gcpn`
   - Set a strong Database Password (save this!)
   - Choose region: **US East (North Virginia)**
4. Wait ~2 minutes for your project to spin up
5. Go to: Settings → API
6. Copy these two values — you'll need them in Step 2:
   - **Project URL** (looks like: https://xxxxxxxxxxxx.supabase.co)
   - **anon / public key** (long string starting with "eyJ...")

### 1C. Vercel (hosts your website, free)
1. Go to https://vercel.com
2. Sign up with your GitHub account
3. Done for now — you'll use it in Step 4.

---

## Step 2 — Set Up Your Environment Variables (2 minutes)

1. Open the `gcpn` project folder on your computer
2. Find the file named `.env.local`
3. Open it in any text editor (Notepad works fine)
4. Replace the placeholder values with your Supabase info:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

5. Save the file.

---

## Step 3 — Set Up Your Database (3 minutes)

1. Go to your Supabase project dashboard
2. Click **SQL Editor** in the left sidebar
3. Click **New Query**
4. Open the file `supabase-schema.sql` from this folder
5. Select ALL the text (Ctrl+A) and copy it
6. Paste it into the Supabase SQL Editor
7. Click the green **Run** button
8. You should see "Success. No rows returned" — that means it worked!

Your database now has tables for:
- profiles (user accounts + pro info)
- portfolio_items
- reviews
- job_postings
- messages

---

## Step 4 — Install & Run Locally (3 minutes)

Make sure you have Node.js installed. If not, download it free at https://nodejs.org
(Download the "LTS" version)

Open Terminal (Mac) or Command Prompt (Windows), then:

```bash
# Navigate to the project folder
cd path/to/gcpn

# Install all dependencies (only needed once)
npm install

# Start the development server
npm run dev
```

Open your browser to: http://localhost:3000

You should see your site running! Test it:
- Click "Join Free" and create an account
- Try posting a job
- Browse the directory

---

## Step 5 — Deploy Live to Vercel (5 minutes)

### 5A. Push code to GitHub
1. Go to https://github.com/new
2. Create a new PRIVATE repository called `gcpn`
3. Follow the instructions GitHub shows you to push your existing code

Or if you're not comfortable with Git, just drag-and-drop the folder to Vercel directly.

### 5B. Deploy on Vercel
1. Go to https://vercel.com/dashboard
2. Click **Add New → Project**
3. Import your `gcpn` GitHub repository
4. **IMPORTANT**: Before clicking Deploy, click **Environment Variables**
5. Add your two Supabase variables:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key
6. Click **Deploy**
7. Wait ~2 minutes — Vercel will give you a free URL like `gcpn.vercel.app`

### 5C. Connect your domain
1. In Vercel: go to your project → Settings → Domains
2. Add `gulfcoastproductionnetwork.com`
3. Vercel will show you DNS settings to copy
4. Go to wherever you bought your domain (GoDaddy, Namecheap, etc.)
5. Update the DNS records as Vercel instructs
6. Wait up to 24 hours for DNS to propagate (usually much faster)

---

## Step 6 — Enable Supabase Email Auth (2 minutes)

By default Supabase sends confirmation emails. To customize:
1. Supabase Dashboard → Authentication → Email Templates
2. Update the sender name to "Gulf Coast Production Network"

---

## Monetization Roadmap (When You're Ready)

### Free Tier (Launch with this)
- Free to list as a pro
- Free to post a job

### Pro Plus (~$29/month per pro)
When ready, add Stripe to charge for:
- Featured placement in search results
- Verified badge
- Unlimited portfolio uploads
- Analytics on profile views

### How to add Stripe later
1. Sign up at https://stripe.com (free)
2. I can build the payment pages for you when you're ready
3. Just come back and ask — it's about 2-3 hours of build work

---

## Getting Help

If anything doesn't work tomorrow, just:
1. Take a screenshot or copy the error message
2. Come back to Claude and paste it — I'll fix it instantly

You've got this. There is genuinely nothing like this on the Gulf Coast.
Go build it!

---

## Project File Structure

```
gcpn/
├── app/
│   ├── page.tsx              ← Homepage
│   ├── layout.tsx            ← Root layout + nav
│   ├── globals.css           ← Styles
│   ├── auth/
│   │   ├── page.tsx          ← Sign in / Sign up
│   │   └── callback/route.ts ← Auth redirect handler
│   ├── browse/
│   │   └── page.tsx          ← Search & browse pros
│   ├── profile/[id]/
│   │   └── page.tsx          ← Individual pro profile
│   ├── post-job/
│   │   └── page.tsx          ← Post a job form
│   └── dashboard/
│       ├── page.tsx          ← Pro & client dashboard
│       └── EditProfileForm.tsx
├── components/
│   ├── Navbar.tsx            ← Navigation bar
│   └── ProCard.tsx           ← Pro listing card
├── lib/
│   ├── supabase.ts           ← Browser Supabase client
│   └── supabase-server.ts    ← Server Supabase client
├── supabase-schema.sql       ← Run this in Supabase!
├── .env.local                ← Your API keys go here
├── package.json
├── tailwind.config.ts
└── next.config.js
```
