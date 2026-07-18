# Space Biology Knowledge Engine: Unimplemented Features

This document outlines all features that are currently present in the user interface but are not fully functional. They are placeholders that require backend implementation and frontend integration to be activated.

## 1. User Authentication & Profile

-   **Location**: `Header.tsx`
-   **Description**: The user profile section (showing "Dr. Emily Carter") is static. A full authentication system is required.
-   **Required Backend Work**:
    -   User registration and login endpoints (`/auth/register`, `/auth/login`).
    -   Session management (e.g., JWT tokens).
    -   A protected endpoint (`/users/me`) to get the current user's data.

## 2. Global Search Bar

-   **Location**: `Header.tsx`
-   **Description**: The main search bar in the header is a non-functional input field. It's intended for searching across all data types (publications, experiments, genes).
-   **Required Backend Work**:
    -   An endpoint (`/search/global`) that accepts a query string.
    -   This endpoint should search across multiple data sources (Neo4j, Vector DB, etc.) and return a structured list of results with types (e.g., { type: 'study', data: {...} }, { type: 'gene', data: {...} }).

## 3. Notifications

-   **Location**: `Header.tsx`
-   **Description**: The bell icon is a placeholder button. It should eventually display user-specific notifications.
-   **Required Backend Work**:
    -   A notification system/service.
    -   Endpoints to fetch (`GET /notifications`) and mark notifications as read (`POST /notifications/read`).

## 4. Save & View Saved Items

-   **Location**: `Dashboard.tsx` (Save Comparison button), `Sidebar.tsx` (Saved Items link).
-   **Description**: The "Save Comparison" button currently only logs to the console. The "Saved Items" page is a placeholder. This feature allows users to save specific comparisons for later review.
-   **Required Backend Work**:
    -   An endpoint to save a comparison for the logged-in user (`POST /comparisons`), taking study IDs and filter context as payload.
    -   An endpoint to retrieve all saved comparisons for a user (`GET /comparisons`).

## 5. Export View

-   **Location**: `Dashboard.tsx` (Export View button).
-   **Description**: This button is intended to export the current view of the Study Comparison table, potentially as a CSV or PDF. It currently only logs to the console.
-   **Required Backend Work**:
    -   An endpoint (`POST /export/comparison`) that takes the comparison data as a payload and returns a file (e.g., CSV).

## 6. Custom Report Generation

-   **Location**: `Reporting.tsx`
-   **Description**: The "Generate Report" button on the reporting page is a placeholder. It should trigger a process to generate a more detailed report based on the selected parameters.
-   **Required Backend Work**:
    -   An endpoint (`POST /reports/generate`) that accepts the report parameters (data type, exposure, organ system, duration).
    -   The backend would process this request, aggregate data, and return either structured JSON for display or a generated file (e.g., PDF).

## 7. Compare Your Research (File Upload)

-   **Location**: `Reporting.tsx`
-   **Description**: The drag-and-drop component allows users to select a file, but the file is not actually uploaded or processed. This is a major feature for allowing users to compare their own data against the knowledge base.
-   **Required Backend Work**:
    -   A file upload endpoint (`POST /research/compare-upload`) that accepts CSV or JSON files.
    -   Complex backend logic to parse the uploaded file, identify key data points, and run a comparison analysis against the data in the main database.
    -   The endpoint should return a structured result of the comparison.

## 8. Settings & Help Pages

-   **Location**: `Sidebar.tsx`
-   **Description**: The "Settings" and "Help & Support" links in the sidebar currently lead to nowhere (or would 404 if routes were not protected). These pages need to be created.
-   **Required Backend Work**:
    -   Potentially an endpoint to save user settings (`POST /users/me/settings`).
    -   The Help page could be static, but could also be powered by a CMS or a simple backend endpoint.

## 9. Microphone Input for Semantic Search

-   **Location**: `SemanticSearch.tsx`
-   **Description**: The microphone icon in the chat input is a non-functional button.
-   **Required Frontend Work**:
    -   Integrate the Web Speech API (`SpeechRecognition`) to capture user voice and convert it to text.
    -   Populate the input field with the transcribed text.
-   **Required Backend Work**: No direct backend work needed unless a server-side speech-to-text service is preferred for higher accuracy.
