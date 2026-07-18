# Space Biology Engine

Space Biology Engine is a frontend prototype built to help space biology researchers aggregate, visualize, and analyze complex biological data. It provides interactive data visualizations, a simulated semantic search assistant, and research reporting workflows through a React-based single-page application architecture using Vite, TypeScript, and Tailwind CSS. The current implementation focuses on validating the user interface and data interaction workflows before connecting to a live backend API.

## Table of Contents
- [About the Project](#about-the-project)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [Folder Structure](#folder-structure)
- [Important Code Concepts](#important-code-concepts)
- [Architectural Decisions](#architectural-decisions)
- [Data Model](#data-model)
- [Main User Flows](#main-user-flows)
- [Setup Instructions](#setup-instructions)
- [Available Scripts](#available-scripts)
- [Configuration Notes](#configuration-notes)
- [Environment Variables](#environment-variables)
- [Testing](#testing)
- [Deployment](#deployment)
- [Future Improvements](#future-improvements)
- [Learning Outcomes](#learning-outcomes)
- [Screenshots](#screenshots)
- [License](#license)

## About the Project
Space biology researchers deal with highly fragmented data across species, exposure types, and organ systems. This project was created to prototype a unified dashboard where researchers can explore this data through interactive knowledge graphs, compare studies, and query an AI assistant.

The application currently operates as a standalone frontend prototype. All data, including knowledge graph nodes, gene expression overlaps, and semantic search responses, are served from a local mock API service. This allows researchers to test the UI interactions and filter mechanisms without requiring a fully deployed database or active language model connection.

## Key Features
- **Global Data Filtering:** Researchers can filter the entire dashboard by species (e.g., Rattus Norvegicus, Mus Musculus), exposure type (e.g., Microgravity, Radiation), and organ system. This state is shared across multiple charts and the knowledge graph.
- **Interactive Knowledge Graph:** Uses Cytoscape.js to visualize relationships between studies, genes, and proteins. Users can click on "study" nodes to select them for direct comparison.
- **Study Comparison:** A dynamic table that populates when studies are selected from the knowledge graph, allowing side-by-side comparison of exposure duration and bone density changes.
- **Simulated Semantic Search:** A chat-based interface where users can ask research questions. The current implementation simulates a thinking delay and returns mock citations related to cardiovascular changes or hindlimb unloading based on keyword detection.
- **Reporting Workflow:** Includes controls for generating custom reports based on data type, exposure type, and duration. It also provides a drag-and-drop zone using `react-dropzone` for researchers to upload local CSV or JSON data files for future comparison features.

## Tech Stack
| Layer | Technology | Purpose |
|-------|------------|---------|
| Frontend | React / Vite / TypeScript | Builds the core component architecture and enforces type safety. |
| Styling | Tailwind CSS | Provides utility-based styling for rapid UI development matching the dark theme. |
| Visualization | Recharts / Cytoscape.js | Renders bar charts for bone density and interactive node graphs for study relationships. |
| State | React Context | Manages the global filter state and selected studies across the dashboard. |
| Build Tool | Vite | Handles local development serving and production bundling. |

## System Architecture
The application is structured as a client-side single-page application using HashRouter. The UI reads state from a centralized Context provider and requests data from an abstracted API service. Currently, the API service returns mock data after artificial delays, simulating a standard asynchronous data flow.

```txt
React Router (HashRouter)
  ↓
FilterContext (Global State)
  ↓
Dashboard & Components (KnowledgeGraph, SemanticSearch)
  ↓
Mock API Service (src/services/api.ts)
  ↓
Hardcoded Local Data
```

## Folder Structure
```txt
src/
  components/
    layout/         Header and Sidebar components
    ui/             Reusable base components like Card, Icons, and Select
    Dashboard.tsx   Main dashboard view containing charts and layout
    KnowledgeGraph.tsx Cytoscape graph implementation
    Reporting.tsx   Report generation and file upload UI
    SemanticSearch.tsx Chat interface for the AI assistant
  contexts/
    FilterContext.tsx Global state for species, exposure, and organ filters
  services/
    api.ts          Mock API functions simulating asynchronous data fetching
  App.tsx           Main application shell and routing setup
```

## Important Code Concepts
### Context-Driven Filtering
The `FilterContext` stores the active selections for species, exposure, and organ system. Components like `Dashboard` and `KnowledgeGraph` consume this context and re-fetch data from the mock API whenever the filters change.

### Asynchronous Mock API
The `services/api.ts` file acts as a stand-in for a real backend. It uses a `sleep` function to simulate network latency before returning static JSON data. This approach keeps the UI components isolated from the data source, meaning the migration to a real backend will only require replacing the internals of `api.ts`.

### Cytoscape Graph Integration
The `KnowledgeGraph` component wraps `react-cytoscapejs`. It defines custom tap event listeners to detect when a researcher clicks on a "study" node. Clicking a study updates the `selectedStudies` array in the `FilterContext`, which then triggers the `StudyComparisonTable` to display the selected data.

## Architectural Decisions
### HashRouter for Client-Side Routing
The project uses `HashRouter` instead of `BrowserRouter`. The codebase appears to use this approach to simplify static hosting deployments, avoiding the need to configure server-side rewrite rules for client-side routes.

### Local Mock Data Strategy
Given the current prototype stage, relying on a local `api.ts` file makes sense because it allows fast iteration on the charts, graph interactions, and chat UI without waiting for a database schema or external AI endpoints to be finalized. The tradeoff is that the search responses are limited to a few hardcoded keywords.

### Centralized Context for Dashboard State
The filter controls are separated from the charts that display the data. Using React Context (`FilterContext`) avoids deep prop drilling and ensures that when a filter changes, all relevant visualizations (like the Knowledge Graph and Bone Density Chart) update synchronously.

## Data Model
- **FilterState:** Tracks the currently selected `species`, `exposure`, and `organSystem` strings.
- **KnowledgeGraph Node:** Represents an entity in the graph. Nodes have an `id`, a `label`, and a `type` (e.g., 'study', 'gene', 'protein').
- **Message:** Used in the Semantic Search interface. It tracks the `id`, `author` ('user' or 'ai'), `text` content, and optional `citations` (array of id and text pairs).

## Main User Flows
### Filtering Research Data
1. The researcher selects a new species from the dropdowns on the Dashboard.
2. The `FilterContext` updates the global `filters` state.
3. The `KnowledgeGraph` and chart components detect the context change.
4. The components call the mock API, show a loading spinner, and render the new data.

### Selecting Studies for Comparison
1. The researcher views the Knowledge Graph and clicks on a specific study node (e.g., "Rat Bone Loss").
2. The `handleNodeTap` event fires, adding the study ID to `selectedStudies` in the Context.
3. The `StudyComparisonTable` reads the updated array and fetches the specific comparison metrics for those studies.

### Querying the AI Assistant
1. The researcher navigates to the Semantic Search view and types a question.
2. The UI appends the user's message to the local chat array and shows a loading state.
3. The mock API checks for keywords (e.g., "cardiovascular") and returns a simulated response with citations after a 1.5-second delay.

## Setup Instructions

### Prerequisites
- Node.js
- npm

### Installation
```bash
git clone <repository-url>
cd <repository-folder>
npm install
```

## Available Scripts
| Command | Description |
|---------|-------------|
| `npm run dev` | Starts the Vite development server |
| `npm run build` | Builds the application for production |
| `npm run preview` | Boots up a local static web server to preview the production build |

## Configuration Notes
- `vite.config.ts` configures Vite, setting the development server to run on port 3000 and binding to `0.0.0.0`. It also maps the `GEMINI_API_KEY` environment variable into `process.env` for future LLM integration.
- `tsconfig.json` configures TypeScript for a Vite + React setup, targeting ES2022 and enabling strict path aliases.
- Inline Tailwind configuration (in `index.html`) defines the specific NASA-themed color palette (`nasa-dark`, `nasa-blue`, etc.) used throughout the utility classes.

## Environment Variables
The application references the following environment variables for future implementation:
```env
GEMINI_API_KEY=
```
Currently, this key is mapped in the Vite config, but the semantic search logic is fully mocked and does not yet require a valid key to run locally.

## Testing
Automated tests are not currently included in the repository. Future testing implementations should focus on:
- Unit tests for the `FilterContext` state transitions.
- Component tests for the `KnowledgeGraph` node tap interactions.
- Mocking tests for the `services/api.ts` abstraction.

## Deployment
No deployment-specific configuration was found. Since this appears to be a standard Vite-based React frontend using HashRouter, it can generally be deployed to platforms such as Vercel, Netlify, Cloudflare Pages, or GitHub Pages using the `npm run build` output.

## Future Improvements
- **Real Backend Integration:** Replace the mock API with real HTTP requests to a Node/Python backend backed by a database.
- **Live LLM Search:** Connect the Semantic Search interface to the Gemini API using the provisioned environment variables to provide dynamic answers based on actual space biology literature.
- **File Upload Processing:** Connect the `react-dropzone` UI in the Reporting section to an endpoint that parses CSV/JSON files and integrates the uploaded data into the user's dashboard.
- **User Authentication:** Move away from the hardcoded "Dr. Emily Carter" profile and implement a real authentication flow to support multiple researchers saving their own items.

## Learning Outcomes
This project demonstrates how a complex, data-heavy dashboard can be structured cleanly on the frontend. It shows practical software engineering decisions, such as isolating data-fetching logic behind a service layer to unblock UI development, using Context for targeted state sharing, and integrating third-party visualization libraries like Cytoscape.js. The architecture is explicitly designed to be backend-ready, proving an understanding of how to build a scalable prototype before committing to heavy infrastructure.

## Screenshots

Screenshots can be added here to show the main dashboards, workflows, and role-specific views.

## License
License information has not been specified yet.
