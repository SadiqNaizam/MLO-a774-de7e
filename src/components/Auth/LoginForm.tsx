import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';

const loginFormSchema = z.object({
  username: z.string().min(1, { message: "Username is required." }),
  // Example of more specific username validation (e.g., if it should be an email):
  // username: z.string().email({ message: "Please enter a valid email address." }).min(1, { message: "Email is required." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

interface LoginFormProps {
  className?: string;
  onLoginSuccess?: (data: LoginFormValues) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ className, onLoginSuccess }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [apiError, setApiError] = React.useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    setIsLoading(true);
    setApiError(null);
    
    // Simulate API call
    try {
      console.log("Login form submitted with:", data);
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

      // Mock API response: Replace with actual API call logic
      // For demonstration purposes, let's assume a specific username/password for success
      if (data.username === "testuser" && data.password === "password123") {
        if (onLoginSuccess) {
          onLoginSuccess(data);
        } else {
          // Fallback behavior if no onLoginSuccess handler is provided
          alert(`Login Successful! Welcome, ${data.username}`);
        }
        form.reset(); // Reset form fields on successful login
      } else {
        setApiError("Invalid username or password. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setApiError("An unexpected error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-6 w-full", className)}
    >
      <h2 className="text-3xl font-bold text-card-foreground">
        Log in
      </h2>
      
      <div className="flex flex-col gap-4">
        <div>
          <Input
            id="username"
            type="text"
            placeholder="Username"
            aria-label="Username"
            {...form.register("username")}
            disabled={isLoading}
            className={cn(
              "h-12 px-3 py-2 text-sm", // Standard input height and padding
              form.formState.errors.username && "border-destructive focus-visible:ring-destructive"
            )}
          />
          {form.formState.errors.username && (
            <p className="text-sm text-destructive mt-1">
              {form.formState.errors.username.message}
            </p>
          )}
        </div>
        
        <div>
          <Input
            id="password"
            type="password"
            placeholder="Password"
            aria-label="Password"
            {...form.register("password")}
            disabled={isLoading}
            className={cn(
              "h-12 px-3 py-2 text-sm",
              form.formState.errors.password && "border-destructive focus-visible:ring-destructive"
            )}
          />
          {form.formState.errors.password && (
            <p className="text-sm text-destructive mt-1">
              {form.formState.errors.password.message}
            </p>
          )}
        </div>
      </div>

      {apiError && (
        <div className="bg-destructive/10 p-3 rounded-md">
          <p className="text-sm text-destructive text-center">
            {apiError}
          </p>
        </div>
      )}
      
      <Button type="submit" className="w-full h-12 text-base font-semibold" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Logging in...
          </>
        ) : (
          "Log in"
        )}
      </Button>
      
      <div className="text-center">
        <Button variant="link" asChild className="text-sm text-primary hover:text-primary/90 px-0 h-auto py-1 font-normal">
            {/* In a real SPA, this would likely use Link from react-router-dom */}
            <a href="#signup">or, sign up</a>
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
