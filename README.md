# Smart Farm AI Solutions - User Manual

## Table of Contents
- [Overview](#overview)
- [Dependencies](#dependencies)
- [Installation](#installation)
- [Running the Website Locally](#running-the-website-locally)
- [Website Structure](#website-structure)
- [Website Features](#website-features)
- [Customizing the Website](#customizing-the-website)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## Overview

Smart Farm AI Solutions is a modern, interactive website showcasing AI-powered agricultural solutions. The website features a responsive design with animated sections, interactive elements, and a chatbot assistant.

## Dependencies

The website uses the following external libraries and frameworks:

- **AOS (Animate On Scroll)** - For scroll animations
  - Version: 2.3.1
  - CDN: `https://unpkg.com/aos@2.3.1/dist/aos.css` and `https://unpkg.com/aos@2.3.1/dist/aos.js`

- **Font Awesome** - For icons
  - Version: 6.5.1
  - CDN: `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css`

## Installation

### Prerequisites
- A code editor (VS Code, Sublime Text, etc.)
- A web browser
- Basic knowledge of HTML, CSS, and JavaScript
- Node.js and npm (optional, for local server setup)

### Setting up the Project

1. Clone or download the repository to your local machine

```bash
git clone <repository-url>
```

2. Navigate to the project directory

```bash
cd farm-web
```

## Running the Website Locally

There are several ways to run the website locally:

### Method 1: Open Directly in Browser

The simplest way is to directly open the `index.html` file in your web browser.

1. Navigate to the project directory
2. Right-click on `index.html` and select "Open with" your preferred browser

### Method 2: Using a Local Server (Recommended)

For better performance and to avoid potential CORS issues, it's recommended to use a local web server.

#### Using Node.js and http-server

1. Install http-server globally (if not already installed)

```bash
npm install -g http-server
```

2. Navigate to the project directory and start the server

```bash
http-server
```

3. Open your browser and go to `http://localhost:8080`

#### Using Visual Studio Code Live Server Extension

1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html` and select "Open with Live Server"
3. The website will automatically open in your default browser

#### Using Python's built-in HTTP server

1. Navigate to the project directory
2. Run the following command:

Python 3:
```bash
python -m http.server
```

Python 2:
```bash
python -m SimpleHTTPServer
```

3. Open your browser and go to `http://localhost:8000`

## Website Structure

The website consists of the following files:

- `index.html` - Main HTML file containing the website structure
- `chatbot.js` - JavaScript file for the chatbot functionality
- `App.jsx` - Custom styles referenced in the HTML (but may not be in use)
- `SignUp_LogIn_Form.html` - Login and registration page (linked from navigation)
- Various other linked pages for specific features (pest-disease-detection.html, soil-health-monitoring.html, etc.)

## Website Features

### Navigation
- Fixed navigation bar with smooth scrolling to sections
- Active link highlighting based on current section

### Sections
1. **Hero Section** - Main introduction with background image
2. **Stats Section** - Animated statistics with counters
3. **Interactive Demo** - Feature demonstration with progress animation
4. **AI Solutions** - Grid of feature cards with hover effects
5. **Testimonials** - Customer testimonials with AOS animations
6. **Contact Form** - Form for requesting demos
7. **Footer** - Company information, links, and social media

### Interactive Elements
1. **Chatbot** - AI assistant for answering user questions
   - Toggle button to open/close
   - Message input and send functionality

2. **Interactive Demo** - Simulated AI farm analysis
   - Progress bar animation
   - Completion alert

3. **Animated Stats** - Numbers that count up when scrolled into view

4. **AOS Animations** - Various elements animate when scrolled into view

## Customizing the Website

### Modifying Content

To change the website content, edit the `index.html` file. The HTML structure follows a clear section-based organization where you can easily update:

- Text content in headings, paragraphs, and buttons
- Links in navigation and feature cards
- Images by replacing URLs
- Feature cards by duplicating or modifying existing card elements

### Modifying Styles

Styles are primarily defined in a `<style>` block within the `index.html` file. Key style customizations:

1. **Color Scheme** - Modify the CSS variables at the top of the style section:
   ```css
   :root {
       --primary-color: #4ade80;
       --primary-dark: #22c55e;
       --background-dark: #0f172a;
       --background-card: #1e293b;
       /* other variables */
   }
   ```

2. **Animations** - Modify the animation keyframes defined in the CSS
3. **Layout** - Adjust the grid and responsive breakpoints

### Adding New Features

To add new sections or features:

1. Add a new section to the HTML following the existing pattern
2. Style the new section using the existing CSS patterns
3. Add any necessary JavaScript for interactivity
4. Update navigation links if adding a new main section

## Chatbot Customization

The chatbot functionality is controlled by `chatbot.js`. To customize:

1. Modify the pre-defined responses in the JavaScript file
2. Adjust the chatbot UI by editing the related CSS in the style section
3. Implement more advanced AI functionality by connecting to external APIs

## Deployment

### Hosting Options

The website can be deployed to various hosting platforms:

1. **GitHub Pages**
   - Push your code to a GitHub repository
   - Enable GitHub Pages in the repository settings

2. **Netlify**
   - Sign up for a Netlify account
   - Drag and drop your project folder to deploy

3. **Vercel**
   - Connect your GitHub repository
   - Follow the deployment instructions

4. **Traditional Web Hosting**
   - Upload files via FTP to your hosting provider

### Deployment Checklist

Before deploying to production:

1. Test all links and features
2. Optimize images for web (compress and resize)
3. Minify CSS and JavaScript for better performance
4. Ensure all external resources are loaded securely (HTTPS)
5. Test on multiple devices and browsers

## Troubleshooting

### Common Issues

1. **Images Not Loading**
   - Check file paths and URLs
   - Ensure image files exist in the correct location
   - Verify there are no CORS issues if using external images

2. **JavaScript Not Working**
   - Check browser console for errors
   - Ensure all script tags are properly included
   - Verify there are no syntax errors in your JavaScript

3. **Responsive Design Issues**
   - Test on multiple device sizes
   - Use browser developer tools to troubleshoot
   - Check media queries in CSS

4. **Font Awesome Icons Not Showing**
   - Ensure the Font Awesome CDN is accessible
   - Verify icon class names are correct

### Getting Help

If you encounter issues not covered in this manual:

1. Check the browser developer console for errors
2. Search for specific error messages online
3. Consult documentation for the relevant libraries
4. Reach out to the developer community on Stack Overflow

## Additional Resources

- [AOS Documentation](https://github.com/michalsnik/aos)
- [Font Awesome Documentation](https://fontawesome.com/docs)
- [HTML/CSS/JavaScript MDN Documentation](https://developer.mozilla.org/)
