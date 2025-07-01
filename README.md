# Storybook Project

This repository contains a Next.js application for displaying interactive stories or content, complemented by Python scripts for automated content and image generation.

## Features

-   **Dynamic Content Display**: Utilizes MDX for rich, interactive content.
-   **Automated Image Generation**: Python scripts generate story-specific images.
-   **Theming Support**: Configurable themes for different visual experiences.

## Technologies Used

-   **Frontend**: Next.js, React
-   **Styling**: Tailwind CSS
-   **Content**: MDX (Markdown with JSX)
-   **Scripting**: Python

## Setup

To set up and run this project locally, follow these steps:

1.  **Clone the repository**:

    ```bash
    git clone <repository-url>
    cd storybook
    ```

2.  **Install Dependencies**:

    Navigate into the `app` directory and install the Node.js dependencies:

    ```bash
    cd app
    npm install
    cd ..
    ```

3.  **Run the Development Server**:

    From the root directory, start the Next.js development server:

    ```bash
    npm run dev
    ```

    The application will be accessible at `http://localhost:3000` (or another port if 3000 is in use).

## Content Generation

The Python scripts in the root directory are used to generate content and images for the Next.js application:

-   `create_blend_images.py`: Generates images related to consonant blends.
-   `create_blend_mdx_files.py`: Creates MDX files for consonant blend stories.
-   `create_placeholder_images.py`: Generates generic placeholder images.
-   `create_themed_placeholders.py`: Creates themed placeholder images.
-   `generate_single_image.py`: Generates a single image based on a prompt.
-   `generate_story_images.py`: Generates images for stories based on prompts.
-   `list_stories.py`: Lists available stories.

These scripts typically place generated assets in the `app/public/story-images/` and `app/public/content/` directories.

## Project Structure

-   `/app`: The main Next.js application.
-   `/app/public`: Static assets, including generated story images and content.
-   `/app/src`: Source code for the Next.js application.
-   `/app/src/app`: Next.js app router pages and layouts.
-   `/app/src/components`: Reusable React components.
-   `/app/src/lib`: Utility functions and libraries.
-   `/`: Python scripts for content generation and project-level configuration files.