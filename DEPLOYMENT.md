# GitHub Pages Deployment Guide

This project is set up to deploy automatically to GitHub Pages.

## Setup Steps

### 1. Update Repository Configuration

First, update `package.json` line 6 with your actual GitHub username:
```json
"homepage": "https://YOUR_GITHUB_USERNAME.github.io/patternfly-compass-theme"
```

### 2. Create a GitHub Repository

1. Create a new repository on GitHub named `patternfly-compass-theme`
2. Update the git remote:
   ```bash
   cd patternfly-compass-theme
   git remote set-url origin https://github.com/YOUR_GITHUB_USERNAME/patternfly-compass-theme.git
   ```

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**

### 4. Push Your Code

```bash
git add .
git commit -m "Setup GitHub Pages deployment"
git push origin main
```

The GitHub Actions workflow will automatically build and deploy your app!

## Workflow Details

The deployment workflow (`.github/workflows/deploy.yaml`) will:
- Trigger on every push to `main` branch
- Build the app with the correct base path `/patternfly-compass-theme/`
- Deploy to GitHub Pages

Your app will be available at:
```
https://YOUR_GITHUB_USERNAME.github.io/patternfly-compass-theme/
```

## Local Testing with GitHub Pages Path

To test locally with the same base path as GitHub Pages:
```bash
npm run build:gh-pages
npm start
```

Then visit: `http://localhost:8080/patternfly-compass-theme/`

## Manual Deployment

If you want to build and deploy manually:
```bash
npm run build:gh-pages
```

This creates a production build in the `dist` folder with the correct base path.



