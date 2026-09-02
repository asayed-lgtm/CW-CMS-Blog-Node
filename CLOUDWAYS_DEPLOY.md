# Deploying to Cloudways

This project runs a real Node.js server (`next start`) rather than being
a purely static export, so it fits Cloudways' Node.js application
hosting directly.

## 1. Push the project to GitHub

Follow the "Connecting this to GitHub" section in `README.md` first —
Cloudways deploys from a Git repo, so the code needs to be there before
you launch the app.

## 2. Create the Node.js app on Cloudways

1. Log in to the Cloudways Platform and click **Launch Server**.
2. Choose a hosting provider (DigitalOcean, AWS, etc.) and select
   **Node.js** as the application stack.
3. Pick a server size, name your app (e.g. `cloudways-blog-cms`), and
   launch. This takes a few minutes to provision.

## 3. Connect the GitHub repo

1. In the Cloudways app dashboard, go to **Application Settings → Git**
   (naming may vary slightly by console version).
2. Authorize Cloudways' GitHub access if prompted.
3. Select your repo and the branch to deploy (`main`).
4. Trigger the first pull/deploy.

## 4. Configure build and start commands

In the app's Node.js settings, set:

- **Install command:** `npm install`
- **Build command:** `npm run build`
- **Start command:** `npm start`
- **App port:** `3000` (matches the `-p 3000` in `package.json`'s
  `start` script — adjust both together if you change it)

Cloudways' Nginx layer proxies incoming HTTPS traffic to this port.

## 5. Set environment variables

Under **Application Settings → Environment Variables**, add only what
you actually use — the site runs fine with none set, since the CMS
layer defaults to local mock data. If you've swapped in Contentful or
Sanity (see README), add the corresponding keys from `.env.example`.

## 6. SSL and domain

Under **Domain Management**, point your domain's DNS at the server, then
use Cloudways' free Let's Encrypt SSL under **SSL Certificate** to enable
HTTPS.

## 7. Rebuilding when content changes

Since blog content can live in a headless CMS instead of the repo, you
want a rebuild to happen without a code push:

- **Simplest:** re-run the deploy/pull step manually in the Cloudways
  dashboard whenever you publish a post.
- **Automated:** add a webhook in your CMS (Contentful and Sanity both
  support outgoing webhooks) that calls a small script on the server —
  via Cloudways' cron job feature or a lightweight webhook-triggered
  endpoint — that runs `git pull && npm run build && pm2 restart app`
  (or however your Node process is managed).

## 8. Redeploying after a code push

Whenever you push to `main`, either:
- click **Pull/Deploy** in the Cloudways Git panel, or
- set up Cloudways' auto-deploy-on-push option if your plan supports it.

Either way, Cloudways re-runs the install/build/start commands from step
4, regenerating the static pages with your latest content.
