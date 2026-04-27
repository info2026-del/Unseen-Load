# The Unseen Load — Business Health Institute

A performance intelligence tool for women leaders. Built in React, deployed on Vercel, with the Anthropic API key protected server-side via Vercel serverless functions.

---

## What is in this folder

```
unseen-load/
├── api/
│   ├── generate.js       Serverless function — calls Anthropic API (key protected)
│   └── send-email.js     Serverless function — sends results via EmailJS
├── public/
│   └── index.html        HTML entry point
├── src/
│   ├── index.js          React entry point
│   └── App.jsx           Full application — all screens and logic
├── .env.example          Environment variable template
├── .gitignore            Protects secrets from being committed
├── package.json          Dependencies
└── vercel.json           Vercel deployment configuration
```

---

## Deploying to Vercel — step by step

### Step 1 — Create a GitHub account (if you do not have one)

Go to github.com and create a free account.

### Step 2 — Create a new repository

1. Once logged in, click the green New button
2. Name it: unseen-load
3. Set it to Private
4. Click Create repository

### Step 3 — Upload your files

1. On the repository page, click Add file then Upload files
2. Drag the entire unseen-load folder contents in (all files and folders)
3. Click Commit changes

### Step 4 — Create a Vercel account

Go to vercel.com and sign up using your GitHub account. This connects the two automatically.

### Step 5 — Import your project

1. In Vercel, click Add New then Project
2. Find your unseen-load repository and click Import
3. Vercel will detect it as a React app automatically
4. Do not change any build settings — click Deploy

### Step 6 — Add your environment variables (IMPORTANT)

This is the step that protects your API key and makes the AI narrative work.

1. In Vercel, go to your project
2. Click Settings then Environment Variables
3. Add the following one at a time:

| Name | Value |
|------|-------|
| ANTHROPIC_API_KEY | Your key from console.anthropic.com |
| EMAILJS_SERVICE_ID | From your EmailJS account (optional) |
| EMAILJS_TEMPLATE_ID | From your EmailJS account (optional) |
| EMAILJS_PUBLIC_KEY | From your EmailJS account (optional) |

4. After adding variables, go to Deployments and click Redeploy

### Step 7 — Your tool is live

Vercel gives you a URL like: unseen-load.vercel.app

You can also add a custom domain (e.g. unseenload.businesshealthinstitute.co.uk) in Vercel under Settings then Domains.

---

## Getting your Anthropic API key

1. Go to console.anthropic.com
2. Sign in or create an account
3. Go to API Keys and click Create Key
4. Copy the key immediately — it is only shown once
5. Paste it as ANTHROPIC_API_KEY in Vercel

Recommended: set a monthly spend limit in Billing so usage stays controlled.

---

## Setting up EmailJS (optional but recommended)

EmailJS sends results to the woman and to info@businesshealthinstitute.co.uk automatically.

1. Go to emailjs.com and create a free account
2. Add a new Email Service (connect your BHI Gmail or Outlook)
3. Create an Email Template with these variables:
   - {{name}} — her name
   - {{role}} — her role
   - {{sector}} — her sector
   - {{domain_scores}} — her five domain results
   - {{narrative}} — her AI-generated narrative
   - {{open_question}} — her closing question
   - {{to_email}} — sends to her
   - {{bhi_email}} — sends a copy to BHI
4. Copy your Service ID, Template ID, and Public Key into Vercel environment variables

---

## Making updates

If you need to change any content — questions, copy, retreat details:

1. Edit src/App.jsx in GitHub (click the pencil icon)
2. Commit the change
3. Vercel redeploys automatically within about 60 seconds

---

## Copyright

The Unseen Load is the intellectual property of Business Health Institute.
All rights reserved. 2025.
