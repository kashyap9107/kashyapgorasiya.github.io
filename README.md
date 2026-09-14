# Kashyap Gorasiya Portfolio

A responsive single-page personal portfolio website for an AI Research Engineer and AI Engineer. The project is built as a static website using HTML, CSS, Bootstrap, and vanilla JavaScript, with no backend or build pipeline required.

## Overview

This website showcases:

- AI research and engineering profile
- education and academic achievements
- professional experience
- research projects and applied AI work
- technology stack and capabilities
- gallery and milestone highlights
- contact and social links

The site is designed for personal branding, recruitment, networking, and professional visibility.

## Tech Stack

- HTML5
- CSS3
- Bootstrap 5
- Bootstrap Icons
- Vanilla JavaScript

## Project Structure

- `index.html` — page layout and content
- `css/style.css` — all visual styling and animations
- `js/script.js` — behavior for nav, reveal effects, filters, and modal project cards
- `assets/images/` — profile, logos, and gallery images
- `assets/documents/` — resume and supporting documents
- `profile.txt` — text profile summary backup

## Local Development

Because this is a static portfolio, you can run it in any of the following ways:

1. Open `index.html` directly in a browser.
2. Use a simple local static server.
3. Use VS Code Live Preview or any local preview extension.

Example using Python:

```bash
cd "E:\Profile\Profile_Website\v3"
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Security Review

This project is a client-side static site with no server-side code, database, or authentication layer. That means common backend risks such as SQL injection, SSRF, or server-side file access are not applicable here.

However, there are still a few things to keep in mind:

- Only use trusted external libraries/CDNs.
- Prefer adding `integrity` and `crossorigin` attributes to external CDN assets when possible.
- Avoid injecting user-controlled content into the DOM without sanitization.
- If content becomes dynamic later, validate and escape all input before rendering.
- Keep assets and links reviewed before publishing.

## Recommended Publishing

This portfolio is well-suited for GitHub Pages.

Typical repository naming:

```text
kashyap9107.github.io
```

Because the site uses relative paths, it can be deployed directly to GitHub Pages without a build system.

## Customization Guide

### Replace profile image

Use the current image file and keep the same filename:

- `assets/images/profile-placeholder.png`

### Replace resume

The current resume file is:

- `assets/documents/Kashyap_CV.pdf`

### Update portfolio content

Edit the content in `index.html` to change:

- name and title
- experience
- education
- projects
- gallery captions
- contact links

### Add a new project

Follow the existing project card structure in `index.html` and `js/script.js`.

## Important Notes

- The project is intentionally lightweight and easy to host.
- It is built for fast loading and easy editing.
- The current styling is mobile-friendly and responsive.
- The site is designed to be a personal portfolio, not a multi-user application.

## License

This repository is intended for personal portfolio use. If you plan to publish it publicly, confirm whether you want to keep the content private, include attribution, or add your own project license.

## Suggested Next Improvements

- Add a real resume PDF
- Replace placeholder images with final assets
- Add a favicon and social share metadata for final branding
- Add a lightweight accessibility pass for contrast and keyboard navigation
- Consider a cleaner GitHub Pages profile variation later when you want the next design direction
