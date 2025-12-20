# Force Vercel Deployment - Troubleshooting Guide

## Issue: Changes Not Showing on Vercel

If your changes aren't appearing on your Vercel deployment, follow these steps:

## Method 1: Manual Redeploy (Recommended)

1. Go to your Vercel Dashboard: https://vercel.com/dashboard
2. Find your project: "updated-farm-financer" or similar
3. Click on the project
4. Go to the **Deployments** tab
5. Find the latest deployment
6. Click the **"..."** (three dots) menu
7. Select **"Redeploy"**
8. Confirm the redeployment

This forces Vercel to rebuild and deploy your latest code from GitHub.

## Method 2: Clear Browser Cache

Your browser might be caching the old CSS/JS files:

1. **Chrome/Edge:**
   - Press `Ctrl + Shift + Delete` (Windows) or `Cmd + Shift + Delete` (Mac)
   - Select "Cached images and files"
   - Click "Clear data"
   - Or use `Ctrl + F5` to hard refresh

2. **Firefox:**
   - Press `Ctrl + Shift + Delete`
   - Select "Cache"
   - Click "Clear Now"
   - Or use `Ctrl + F5`

3. **Safari:**
   - Press `Cmd + Option + E` to empty cache
   - Or use `Cmd + Shift + R` to hard refresh

## Method 3: Verify GitHub Push

Make sure all files are committed and pushed to GitHub:

```bash
git status
git add .
git commit -m "Update: Blue & Gold theme, Farm Financer branding"
git push
```

Then wait 1-2 minutes for Vercel to auto-deploy, or use Method 1.

## Method 4: Check Vercel Build Logs

1. Go to Vercel Dashboard → Your Project → Deployments
2. Click on the latest deployment
3. Check the **Build Logs** for any errors
4. If there are errors, fix them and redeploy

## Method 5: Force Cache Clear (Advanced)

If the above doesn't work, the cache headers have been temporarily reduced. After confirming the changes work, you can increase them again in `vercel.json`.

## What Changed in This Update

- ✅ Color scheme: Blue & Gold (Notre Dame style)
- ✅ Branding: "Janus AG Finance" → "Farm Financer"
- ✅ Email forms: Configured for skater.ryan11@gmail.com
- ✅ Cache headers: Temporarily reduced to ensure fresh content

## Verify Changes Are Live

After redeploying, check:
1. Logo should say "FARM FINANCER" (uppercase)
2. Colors should be blue and gold (not green)
3. Contact email should be skater.ryan11@gmail.com
4. Hero section should have blue background with gold accents

If you still don't see changes after trying all methods, there might be a build issue. Check the Vercel build logs for errors.

