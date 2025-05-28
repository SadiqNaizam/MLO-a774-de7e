import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/Auth/LoginForm';

// This interface should match the structure of LoginFormValues 
// inferred from loginFormSchema in LoginForm.tsx to ensure type compatibility
// for the onLoginSuccess callback.
interface LoginFormSubmitData {
  username: string;
  password: string; // password is part of the form data, even if not directly used in this handler
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = (data: LoginFormSubmitData) => {
    console.log('Login successful on page. Username:', data.username);
    // In a real application, this is where you would typically handle 
    // setting authentication tokens, updating user state, and then navigating.

    // Provide feedback to the user before navigating.
    // Note: If onLoginSuccess is provided to LoginForm, its internal success alert is skipped.
    alert(`Welcome back, ${data.username}! You will be redirected to your dashboard.`);

    // Navigate to a different route, e.g., a user dashboard.
    // This assumes a route like '/dashboard' is set up in your router configuration.
    navigate('/dashboard'); 
  };

  return (
    // Overall page layout: centered content on a background color.
    // Conforms to Layout Requirements: "overall": { "definition": "justify-center items-center min-h-screen bg-background" }
    <div className="flex justify-center items-center min-h-screen bg-background p-4">
      {/* 
        Form card container: defines the card's appearance and padding.
        Conforms to Layout Requirements for "formCard": "bg-surface rounded-md shadow-lg p-6"
        - Using 'bg-card' (white) as per tailwind.config.ts, matching visual and CSS variables for surface color.
        - Using 'rounded-lg' for slightly more rounded corners (var(--radius) = 0.375rem) which fits image better than 'rounded-md'.
        - 'shadow-xl' for a more pronounced shadow that matches the image's depth.
        - 'w-full max-w-md' makes the card responsive and caps its width on larger screens.
        - 'p-6 sm:p-8' provides internal padding for the LoginForm, ensuring space around the form elements.
        The "flex flex-col gap-6" from "formCard.layout" is implemented by LoginForm itself for its internal elements.
      */}
      <div className="w-full max-w-md bg-card rounded-lg shadow-xl p-6 sm:p-8">
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      </div>
    </div>
  );
};

export default LoginPage;
