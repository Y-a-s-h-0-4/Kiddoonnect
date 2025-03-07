
import { AuthLayout } from "@/components/layout/AuthLayout";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { PageTransition } from "@/components/layout/PageTransition";

const Register = () => {
  return (
    <PageTransition>
      <AuthLayout
        title="Create an account"
        subtitle="Sign up for Child Connect"
      >
        <RegisterForm />
      </AuthLayout>
    </PageTransition>
  );
};

export default Register;
