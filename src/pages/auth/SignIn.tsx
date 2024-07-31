import { SignIn } from "@clerk/clerk-react";

export default function SignInPage() {
  return (
    <div className="sign-in-page">
      <SignIn path="/sign-in" />
    </div>
  );
}
