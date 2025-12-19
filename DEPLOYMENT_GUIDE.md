# Vercel Deployment Troubleshooting Guide

## Issue: Changes Not Propagating to Vercel

If you've pushed changes to GitHub but they're not showing on Vercel, follow these steps:

### Step 1: Check Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Find your project (farm-financer)
3. Check the "Deployments" tab
4. Look for the latest deployment status

### Step 2: Verify GitHub Connection
1. In Vercel dashboard, go to Project Settings
2. Check "Git" section
3. Verify the correct repository is connected
4. Ensure the correct branch is selected (usually `main` or `master`)

### Step 3: Trigger Manual Redeploy
1. In Vercel dashboard, go to "Deployments"
2. Click the three dots (⋯) on the latest deployment
3. Select "Redeploy"
4. Or click "Redeploy" button

### Step 4: Check for Build Errors
1. Click on the latest deployment
2. Check the "Build Logs" tab
3. Look for any error messages
4. Common issues:
   - Missing files
   - Path errors
   - Configuration errors

### Step 5: Force Redeploy from GitHub
1. Make a small change to any file (add a space)
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Trigger Vercel redeploy"
   git push
   ```

### Step 6: Clear Vercel Cache
1. In Vercel dashboard → Project Settings
2. Go to "Build & Development Settings"
3. Clear build cache (if available)
4. Redeploy

### Step 7: Check File Paths
Ensure all paths in HTML files use absolute paths:
- ✅ `/styles.css` (correct)
- ❌ `styles.css` (incorrect)
- ❌ `../styles.css` (incorrect)

### Step 8: Verify File Structure
Ensure these files are in the root:
- `index.html`
- `styles.css`
- `script.js`
- `calculator.js`
- `vercel.json`

### Step 9: Check Branch Settings
1. Vercel Settings → Git
2. Ensure "Production Branch" is set to your main branch
3. Check "Auto-deploy" is enabled

### Step 10: Manual Deployment
If auto-deploy isn't working:
1. Go to Vercel dashboard
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure settings:
   - Framework Preset: Other
   - Root Directory: ./
   - Build Command: (leave empty)
   - Output Directory: ./
5. Deploy

## Quick Fix Commands

If you have Vercel CLI installed:
```bash
vercel --prod
```

## Common Issues and Solutions

### Issue: "Build failed"
**Solution:** Check vercel.json for syntax errors

### Issue: "Files not found"
**Solution:** Ensure all files are committed to GitHub

### Issue: "Styling broken"
**Solution:** Verify CSS paths use `/styles.css` (absolute paths)

### Issue: "JavaScript not working"
**Solution:** Verify JS paths use `/script.js` (absolute paths)

## Verification Checklist

- [ ] Files pushed to GitHub
- [ ] Vercel connected to correct repo
- [ ] Latest deployment shows your commit
- [ ] No build errors in logs
- [ ] All paths use absolute format (`/file.css`)
- [ ] vercel.json is valid JSON
- [ ] Files exist in root directory

## Still Not Working?

1. Check Vercel status: https://www.vercel-status.com/
2. Review Vercel logs for specific errors
3. Try disconnecting and reconnecting the GitHub repo
4. Contact Vercel support with deployment logs

