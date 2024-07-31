import { SignUp } from "@clerk/clerk-react";

export default function SignUpPage() {
  return (
    <div className="sign-in-page">
      <SignUp path="/sign-up" />
    </div>
  );
}
