# Deployment Guide - GitHub & Vercel

This guide will help you deploy the FarmFinancer website to GitHub and Vercel.

## 📋 Prerequisites

- Git installed on your computer
- GitHub account
- Vercel account (free tier works perfectly)

## 🚀 Step-by-Step Deployment

### Step 1: Initialize Git Repository

If you haven't already initialized git:

```bash
# Navigate to your project directory
cd "c:\Users\ADMIN\Desktop\farm loans"

# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit - FarmFinancer website"
```

### Step 2: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" icon in the top right → "New repository"
3. Name your repository (e.g., `farmfinancer-website`)
4. **Don't** initialize with README (you already have one)
5. Click "Create repository"

### Step 3: Connect Local Repository to GitHub

GitHub will show you commands. Use these:

```bash
# Add remote repository (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

### Step 4: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in (use GitHub to sign in)
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel will automatically detect it as a static site
5. Click "Deploy"

**That's it!** Your site will be live in about 30 seconds.

### Step 5: Configure Custom Domain (Optional)

1. In Vercel dashboard, go to your project → Settings → Domains
2. Add your domain (e.g., `farmfinancer.com`)
3. Follow DNS configuration instructions
4. SSL certificate is automatically configured

## 🔄 Continuous Deployment

Once connected:
- **Every push to `main` branch** = Automatic production deployment
- **Every pull request** = Automatic preview deployment
- **No manual deployment needed!**

## 📝 Making Updates

1. Make changes to your files locally
2. Commit changes:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push
   ```
3. Vercel automatically deploys the update (usually within 1-2 minutes)

## 🔧 Vercel Configuration

The `vercel.json` file is already configured with:
- ✅ Static file serving
- ✅ Security headers
- ✅ Cache optimization
- ✅ 404 page handling

No additional configuration needed!

## 🌐 Environment Variables (If Needed)

If you need to add API keys or other secrets:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add your variables
3. They'll be available in your deployments

**Note:** For static sites, environment variables are mainly useful if you add serverless functions later.

## 📊 Monitoring & Analytics

Vercel provides:
- Deployment logs
- Analytics (basic on free tier)
- Performance metrics
- Error tracking

## 🐛 Troubleshooting

### Issue: Vercel shows build error
**Solution:** Check that `vercel.json` is in the root directory. Static HTML sites don't need a build command.

### Issue: Pages not loading correctly
**Solution:** 
- Check file paths (use relative paths: `../styles.css`)
- Verify all files are committed to git
- Check Vercel deployment logs

### Issue: Forms not submitting
**Solution:** 
- Client-side forms work as-is
- For backend submission, you'll need:
  - Vercel Serverless Functions, or
  - Third-party service (Formspree, etc.)

## ✅ Verification Checklist

After deployment, verify:
- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] CSS styles are applied
- [ ] JavaScript functions work
- [ ] Forms display correctly
- [ ] Mobile responsive design works
- [ ] 404 page works (try a non-existent URL)

## 🎉 Success!

Your website is now live and will automatically update on every git push!

**Your site URL will be:** `https://your-project-name.vercel.app`

---

## Quick Commands Reference

```bash
# Check git status
git status

# Add all changes
git add .

# Commit changes
git commit -m "Your commit message"

# Push to GitHub (triggers Vercel deployment)
git push

# View deployment logs in Vercel dashboard
# (Go to vercel.com → Your Project → Deployments)
```

---

**Need Help?** Check Vercel documentation: https://vercel.com/docs

