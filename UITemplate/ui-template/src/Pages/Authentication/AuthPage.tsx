import LoginForm from "../../Components/LoginForm";
import RegisterForm from "../../Components/RegisterForm";

function AuthPage() {
  return (
    <div className="grid md:grid-cols-2 gap-6 p-8">
      <LoginForm />
      <RegisterForm />
    </div>
  );
}

export default AuthPage;
