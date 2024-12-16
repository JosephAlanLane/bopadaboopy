import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Checking initial session:', session ? 'Session exists' : 'No session');
      if (session) {
        console.log('Redirecting to home due to existing session');
        navigate("/");
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, session ? 'Session exists' : 'No session');
      if (event === 'SIGNED_IN' && session) {
        console.log('User signed in, redirecting to home');
        navigate("/");
      }
    });

    return () => {
      console.log('Cleaning up auth subscription');
      subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Sign in to your account
          </h2>
        </div>
        <div className="mt-8 bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Auth
            supabaseClient={supabase}
            appearance={{ 
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#B91C1C',
                    brandAccent: '#991B1B',
                    brandButtonText: 'white',
                    defaultButtonBackground: '#1F2937',
                    defaultButtonBackgroundHover: '#374151',
                    inputBackground: '#374151',
                    inputText: 'white',
                    inputPlaceholder: '#9CA3AF',
                    dividerBackground: '#4B5563',
                  },
                },
              },
              className: {
                container: 'text-gray-100',
                label: 'text-gray-300',
                button: 'bg-gray-800 hover:bg-gray-700',
                input: 'bg-gray-700 text-white placeholder-gray-400',
              }
            }}
            theme="dark"
            providers={["google"]}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;