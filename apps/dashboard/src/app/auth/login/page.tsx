import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@ds-project/components';
import { MagicLinkForm } from './_components';

export default function Page() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">
          <h1>Login</h1>
        </CardTitle>
        <CardDescription>
          <p>Enter your email below to login to your account.</p>
        </CardDescription>
      </CardHeader>
      <MagicLinkForm />
    </Card>
  );
}
