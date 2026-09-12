# Technical Writer Portfolio

A clean, minimal static website for showcasing technical writing work — documentation snippets, diagrams, and video tutorials.

## Quick Start (Local Preview)

Open `index.html` directly in a browser, or run a local server:

```bash
cd portfolio
python3 -m http.server 3000
```

Then visit `http://localhost:3000`.

## Deploying to GitHub Pages

1. Create a new GitHub repository (e.g. `portfolio`).
2. Copy the contents of the `portfolio/` folder into the repo root.
3. Push to the `main` branch.
4. Go to **Settings → Pages**.
5. Under **Source**, select the `main` branch and `/ (root)`.
6. Save. Your site will be live at `https://<your-username>.github.io/portfolio/`.

## Customizing

### Replace Placeholder Content

Open `index.html` and replace:

- `[Your Name]` (appears in navbar, footer, and page title)
- `you@example.com` (contact email)
- `#` links in the contact/socials section with your actual LinkedIn, GitHub, etc.
- Portfolio items: replace the preview content and descriptions with your real work

### Replace Doc Snippet Previews

The documentation cards use inline HTML code snippets as previews. To show a real screenshot instead:
1. Add your screenshot image to the project folder.
2. Replace the `.doc-snippet` div inside `.doc-preview` with:
```html
<img src="your-screenshot.png" alt="REST API Reference" style="width:100%;height:100%;object-fit:cover;">
```

### Replace Diagram Previews

The diagram cards use inline SVG placeholders. To show a real diagram:
1. Add your diagram (SVG or PNG) to the project folder.
2. Replace the `<svg>` inside `.diagram-preview` with:
```html
<img src="your-diagram.svg" alt="Architecture Diagram" style="width:100%;height:100%;object-fit:contain;">
```

### Replace Video Previews

The video cards show a play button on a dark background. To link to an actual video:
1. Replace the `.video-thumb` div with an iframe embed (YouTube, Vimeo, etc.) or a link.
2. For a simple link approach, wrap the entire card in an `<a>` tag pointing to your video URL.

### Add a Resume PDF

1. Place your resume PDF in the project folder (e.g. `resume.pdf`).
2. Update the download link in the Contact section:
```html
<a href="resume.pdf" class="btn btn-secondary" download>Download Resume (PDF)</a>
```

### Change Colors

Edit the CSS variables at the top of `css/style.css`:
```css
:root {
    --accent:       #3b6db8;  /* primary link/button color */
    --accent-dark:  #2a5290;  /* hover state */
    --accent-light: #e8f0fe;  /* light tint */
}
```

### No Google Indexing

The `<meta name="robots" content="noindex, nofollow">` tag in the HTML head tells search engines not to index this page. Keep this tag if you want the site to remain private.

## File Structure

```
portfolio/
├── index.html        # Main page
├── css/
│   └── style.css     # All styling
├── js/
│   └── main.js       # Interactions (nav, filter, animations)
└── README.md         # This file
```
