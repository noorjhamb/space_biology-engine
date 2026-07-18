# Space Biology Knowledge Engine: Frontend Integration Guide

## 1. Overview

This document explains how the React frontend is structured and how it communicates with the backend. Its purpose is to guide the process of replacing the current mock API calls with live HTTP requests to the production backend.

## 2. Project Structure

The key directories are:
-   `src/components`: Contains all React components, organized by feature (`layout`, `ui`, `Dashboard.tsx`, etc.).
-   `src/contexts`: Holds React Context providers for global state management.
-   `src/services`: Contains modules for external communications, most importantly the API service.

## 3. The API Service (`src/services/api.ts`)

This file is the **single point of contact** between the frontend application and the backend API. All data fetching logic is centralized here.

Currently, it contains mock functions that simulate network latency with `sleep()` and return hardcoded data.

### **How to Integrate the Live API**

To connect the frontend to the live backend, you only need to modify the functions within `src/services/api.ts`. You will replace the mock logic with `fetch` calls to the real API endpoints.

**Example: Modifying `getFilterOptions`**

**Current Mock Implementation:**
```typescript
export const getFilterOptions = async () => {
  await sleep(500); // Simulate network delay
  return MOCK_FILTER_OPTIONS; // Return hardcoded data
};
```

**Live API Implementation:**
```typescript
const API_BASE_URL = 'https://your-backend-api.com/api/v1'; // Use environment variables for this

export const getFilterOptions = async () => {
  const response = await fetch(`${API_BASE_URL}/filters`);
  if (!response.ok) {
    throw new Error('Failed to fetch filter options');
  }
  return await response.json();
};
```

This process should be repeated for all functions in the file, ensuring the `fetch` URLs and request bodies (for `POST` requests) match the specification in the `backend_implementation_guide.md`.

## 4. Global State Management (`src/contexts/FilterContext.tsx`)

The application uses React's Context API to manage state that needs to be shared across many components. This avoids "prop drilling" and simplifies state logic.

The `FilterContext` provides:
-   `filters`: An object containing the current values of the dashboard filters (species, exposure, organSystem).
-   `setFilters`: The function to update the filters object.
-   `selectedStudies`: An array of strings containing the IDs of the nodes selected in the Knowledge Graph.
-   `setSelectedStudies`: The function to update the selected studies.

### **How it Works:**

1.  **`FilterProvider`**: In `App.tsx`, the entire application is wrapped in `<FilterProvider>`. This makes the filter state available to all children.
2.  **Updating State**: Components like the `Select` dropdowns in `Dashboard.tsx` call `setFilters` when their value changes. The `KnowledgeGraph` component calls `setSelectedStudies` when a user clicks on a study node.
3.  **Consuming State**: Components like `Dashboard.tsx` and `KnowledgeGraph.tsx` use the `useContext(FilterContext)` hook to access the current `filters` and `selectedStudies`.
4.  **Triggering API Calls**: In `Dashboard.tsx`, a `useEffect` hook is set up to listen for changes to `filters` and `selectedStudies`. Whenever these values change, it triggers new API calls to fetch updated data for the charts and comparison table.

This reactive data flow is the core of the dashboard's interactivity. The backend should be prepared to handle frequent API calls as the user interacts with the filters and graph.
