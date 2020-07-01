import SignUpForm from '../components/forms/SignUpForm';
import AuthSideBarLayout from '../components/layouts/AuthSideBarLayout';

function SignUpPage() {
  return (
    <AuthSideBarLayout>
      <SignUpForm handleSubmit={e => console.log(e)} />
    </AuthSideBarLayout>
  );
}

export default SignUpPage;
