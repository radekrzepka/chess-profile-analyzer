# Chess Profile Analyzer

A Next.js application for analyzing chess openings performance for Lichess.org players

## Table of Contents

- [Chess Profile Analyzer](#chess-profile-analyzer)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Key Features](#key-features)
  - [Technologies Used](#technologies-used)
    - [Frontend Technologies](#frontend-technologies)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation and Setup](#installation-and-setup)

## Overview

Chess Profile Analyzer is a web application that helps chess players analyze their game performance on Lichess.org. The app focuses on identifying which chess openings provide the best results for a player and provides insights into their strengths and weaknesses.

By analyzing past games, the app helps players:

-  Understand which openings they perform best with
-  Track their rating progression over time
-  Identify patterns in their gameplay

The application uses the Lichess API to fetch game data and performs statistical analysis to provide actionable insights for chess improvement.

[Live Demo](https://chess-profile-analyzer.vercel.app/)

![Screnshot from app](./readme-images/app-1.png)
![Screnshot from app](./readme-images/app-2.png)
![Screnshot from app](./readme-images/app-3.png)

## Key Features

-  **Opening Analysis**: Identifies the most successful and frequently played openings for a given player
-  **Performance Metrics**: Calculates win rates and rating changes for each opening
-  **Game Filtering**: Filter analysis by game type, time control, and piece color
-  **Rating History**: Visualizes rating progress over time with interactive charts
-  **Game History**: Browse and review past games with details on openings played
-  **User Profile Stats**: Displays comprehensive profile statistics and metrics
-  **Responsive Design**: Works seamlessly on both desktop and mobile devices

## Technologies Used

### Frontend Technologies

-  **Framework**: Next.js 13 (App Router) with TypeScript
-  **State Management**: React Hooks and Context API
-  **Data Fetching**: React Query (TanStack Query) for efficient API interaction
-  **Form Handling**: React Hook Form with Zod validation
-  **Styling**:
   -  Tailwind CSS for utility-first styling
-  **User Experience**:
   -  React Hot Toast for notifications
   -  React Spinners for loading states
-  **Date Handling**: date-fns for date manipulation and formatting

## Getting Started

### Prerequisites

-  Node.js 16.8 or later
-  npm or yarn
-  A modern web browser

### Installation and Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/chess-profile-analyzer.git
   ```

2. Navigate to the project directory:

   ```bash
   cd chess-profile-analyzer
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

6. Enter a Lichess.org username and configure your analysis preferences to start analyzing chess performance.
