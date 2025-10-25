# PVX Loop: Cleantech Client Portal

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/25CD3014/generated-app-20251025-202256)

PVX Loop is a web application for a cleantech startup that provides 'EPR-as-a-Service' for solar panel waste management. The platform serves two primary functions: a public-facing informational website and a secure client portal. The website educates potential partners about PVX Loop's unique business model, which focuses on immediate profitability by extracting high-grade aluminum and solving legal compliance issues for solar producers. The client portal allows registered solar power producers to log in, schedule pickups for their end-of-life solar panels, track the status of their pickups, and access essential compliance documentation, thereby streamlining their waste management and legal reporting obligations.

## Key Features

-   **Public-Facing Website:** A modern, responsive informational site including Homepage, About, Services, and Contact pages.
-   **Secure Client Portal:** A dedicated, login-protected area for solar producers.
-   **Client Dashboard:** An at-a-glance overview of total panels processed, upcoming pickups, and quick access to compliance documents.
-   **Pickup Scheduling:** An intuitive form for clients to request collection of end-of-life solar panels.
-   **Pickup History:** A detailed log of all past and pending pickups with status tracking ('Scheduled', 'In Transit', 'Processing', 'Completed').
-   **Compliance Document Access:** A secure repository for clients to view and download their 'chain-of-custody' and storage compliance certificates.

## Technology Stack

-   **Frontend:** React, React Router, Vite
-   **Backend:** Hono on Cloudflare Workers
-   **State Management:** Zustand
-   **UI:** Tailwind CSS, shadcn/ui, Framer Motion
-   **Forms:** React Hook Form with Zod for validation
-   **Icons:** Lucide React
-   **Language:** TypeScript

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   [Bun](https://bun.sh/) installed on your machine.
-   [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) for Cloudflare integration.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd pvx_loop_portal
    ```

2.  **Install dependencies:**
    ```bash
    bun install
    ```

## Development

To start the local development server, which includes both the Vite frontend and the Hono backend on Cloudflare Workers, run:

```bash
bun run dev
```

This will start the application, typically on `http://localhost:3000`. The frontend will hot-reload on changes, and the worker will restart automatically.

### Project Structure

-   `src/`: Contains all the frontend React application code, including pages, components, hooks, and utility functions.
-   `worker/`: Contains the backend Hono application code that runs on Cloudflare Workers. This is where API routes and business logic reside.
-   `shared/`: Contains TypeScript types and interfaces shared between the frontend and the worker to ensure type safety.

## Deployment

This project is designed to be deployed to Cloudflare's serverless platform.

1.  **Build the application:**
    ```bash
    bun run build
    ```

2.  **Deploy to Cloudflare:**
    Make sure you are logged into your Cloudflare account via the Wrangler CLI (`wrangler login`). Then, run the deploy script:
    ```bash
    bun run deploy
    ```
    This command will build the application and deploy it to your Cloudflare account.

Or deploy directly with the button below:

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/25CD3014/generated-app-20251025-202256)

## Available Scripts

-   `bun run dev`: Starts the development server.
-   `bun run build`: Builds the application for production.
-   `bun run deploy`: Deploys the application to Cloudflare Workers.
-   `bun run lint`: Lints the codebase using ESLint.