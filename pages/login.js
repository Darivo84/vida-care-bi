import LoginForm from '../components/forms/LoginForm';
import AuthSideBarLayout from '../components/layouts/AuthSideBarLayout';

function LoginFormPage() {
  return (
    <AuthSideBarLayout>
      <LoginForm handleSubmit={e => console.log(e)} />
    </AuthSideBarLayout>
  );
}

export default LoginFormPage;
