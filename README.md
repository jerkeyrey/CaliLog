# CaliLog - Calorie Tracking Made Simple

CaliLog is a modern web application built with Next.js that helps users track their daily calorie intake and manage their fitness goals effectively.

## Features

- **User Authentication**: Secure Google OAuth sign-in
- **Personal Dashboard**: Customized dashboard showing daily calorie goals and progress
- **Food Diary**: Easy-to-use interface for logging meals and tracking calories
- **Goal Setting**: Set personalized fitness goals based on your metrics
- **Data Persistence**: Local storage for seamless user experience
- **Responsive Design**: Works perfectly on both desktop and mobile devices

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- NextAuth.js
- Local Storage for data persistence

## Getting Started

1. Clone the repository:

```bash
git clone <repository-url>
cd calilog
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env.local` file in the root directory:

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
calilog/
├── app/           # Next.js app directory
├── components/    # Reusable React components
├── utils/         # Utility functions and helpers
├── public/        # Static assets
└── types/         # TypeScript type definitions
```

## License

This project is licensed under the MIT License - see the LICENSE file for details
