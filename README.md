# FarmFinancer Website

Modern, content-rich agricultural financing website built with static HTML, CSS, and JavaScript.

## 🚀 Quick Start

This is a static website that can be deployed directly to Vercel or any static hosting service.

### Local Development

1. Clone the repository:
   ```bash
   git clone [your-repo-url]
   cd farm-loans
   ```

2. Open in your browser:
   - Simply open `index.html` in your browser, or
   - Use a local server:
     ```bash
     # Python 3
     python -m http.server 8000
     
     # Node.js (if you have http-server installed)
     npx http-server
     ```

3. Visit `http://localhost:8000` in your browser

## 📁 Project Structure

```
/
├── index.html              # Homepage
├── styles.css              # Main stylesheet
├── script.js               # Main JavaScript
├── calculator.js            # Loan calculator logic
├── loan-products/          # Loan product landing pages
├── loan-purposes/          # Loan purpose pages
├── resources/              # Tools and resources
├── how-it-works/           # Process and information pages
├── about/                  # About us pages
├── blog/                   # Blog posts
├── contact/                # Contact pages
├── system/                 # System pages (404, thank you, etc.)
└── legal/                  # Legal pages (privacy, terms, etc.)
```

## 🛠️ Technologies

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS variables
- **JavaScript (ES6+)** - Interactive features
- **No Framework** - Pure vanilla JavaScript for fast performance

## 📦 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Vercel will automatically detect it as a static site
4. Deploy!

The `vercel.json` file is already configured for optimal deployment.

### Other Static Hosts

This site works with any static hosting service:
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Any web server

## 🔧 Configuration

### Environment Variables (Optional)

If you need to add environment variables (for analytics, API keys, etc.):

1. Create a `.env` file (not committed to git)
2. In Vercel, add environment variables in the dashboard
3. Access via JavaScript if using a build process

### Custom Domain

1. Add your domain in Vercel dashboard
2. Update DNS records as instructed
3. SSL certificate is automatically configured

## 📝 Content Management

Currently, content is managed directly in HTML files. For future enhancements:
- Consider a static site generator (11ty, Hugo, etc.)
- Or add a headless CMS integration

## 🎨 Branding

- **Brand**: FarmFinancer (or Janus AG Finance)
- **Colors**: Defined in `styles.css` CSS variables
- **Typography**: Inter font family

## 📊 SEO

- Semantic HTML structure
- Meta tags on all pages
- Schema.org JSON-LD markup
- XML sitemap (to be generated)
- Open Graph tags for social sharing

## 🧪 Testing

- Test all forms
- Verify all links
- Check mobile responsiveness
- Validate HTML/CSS
- Test cross-browser compatibility

## 📄 License

Copyright © 2025 FarmFinancer. All rights reserved.

## 🤝 Contributing

This is a private project. For updates, create a branch and submit a pull request.

## 📞 Support

For questions or issues, contact the development team.

---

**Built with ❤️ for agricultural financing**

