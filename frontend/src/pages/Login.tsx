
import { AuthLayout } from "@/components/layout/AuthLayout";
import { LoginForm } from "@/components/auth/LoginForm";
import { PageTransition } from "@/components/layout/PageTransition";

const Login = () => {
  return (
    <PageTransition>
      <AuthLayout
        title="Welcome back"
        subtitle="Sign in to your Child Connect account"
      >
        <LoginForm />
      </AuthLayout>
    </PageTransition>
  );
};

export default Login;
