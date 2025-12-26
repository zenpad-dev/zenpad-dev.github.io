# Zenpad Website

This repository contains the source code for the official Zenpad website and documentation. Note that this is purely the frontend showcase; the actual editor source code is hosted in a separate repository.

## Live Website

https://jagdishtripathy.github.io/zenpad-web

## Repository Contents

*   **Landing Page**: Product showcase with features and screenshots.
*   **Documentation**: User guides, installation instructions, and configuration details.
*   **Keyboard Shortcuts**: Searchable reference for editor keybindings.
*   **About**: Project philosophy and background.

## Tech Stack

*   **Core**: React 19, TypeScript, Vite
*   **Styling**: Tailwind CSS
*   **Animations**: Framer Motion
*   **Components**: Radix UI
*   **Routing**: React Router (HashRouter)
*   **Deployment**: GitHub Pages

## Local Development

1.  **Clone the repository**
    ```bash
    git clone https://github.com/jagdishtripathy/zenpad-web.git
    cd zenpad-web
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run development server**
    ```bash
    npm run dev
    ```

## Project Structure

```
src/
├── components/     # UI components (Layout, Sections, primitives)
├── lib/           # Utilities and helpers
├── pages/         # Route components (Home, Docs, Shortcuts)
├── App.tsx        # Main application entry and routing
└── main.tsx       # React DOM rendering
```

## Deployment

This project is configured for automated deployment to GitHub Pages using GitHub Actions. Pushing to the `main` branch triggers the build workflow defined in `.github/workflows/deploy.yml`.

## Related Repositories

*   **Zenpad Editor**: [https://github.com/jagdishtripathy/zenpad](https://github.com/jagdishtripathy/zenpad) - The core text editor application (Python/GTK).

## License

This project is licensed under the GPL-2.0 License.
