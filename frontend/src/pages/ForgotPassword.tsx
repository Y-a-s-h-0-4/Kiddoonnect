
import { AuthLayout } from "@/components/layout/AuthLayout";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";
import { PageTransition } from "@/components/layout/PageTransition";

const ForgotPassword = () => {
  return (
    <PageTransition>
      <AuthLayout
        title="Reset password"
        subtitle="We'll email you a link to reset your password"
      >
        <ForgotPasswordForm />
      </AuthLayout>
    </PageTransition>
  );
};

export default ForgotPassword;
