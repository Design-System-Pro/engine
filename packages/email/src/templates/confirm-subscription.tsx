import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Text,
} from '@react-email/components';

interface ConfirmSubscriptionEmailProps {
  confirmationUrl: string;
  recipientEmail?: string;
}

export const ConfirmSubscriptionEmail = ({
  confirmationUrl = 'https://app.useplunk.com/subscribe/{{plunk_id}}',
  recipientEmail = 'there',
}: ConfirmSubscriptionEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Confirm your DS Pro subscription</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Confirm your subscription</Heading>

          <Text style={text}>Hi {recipientEmail}!</Text>

          <Text style={text}>Thanks for your interest in DS Pro Blog.</Text>
          <Text style={text}>
            I'm Tomás and as a Frontend Developer focused on accessibility and
            design systems, I write about my challenges and perspectives within
            the ecosystem.
          </Text>
          <Text style={text}>
            To start receiving updates once I publish new things in this space,
            please confirm your email:
          </Text>

          <Button style={button} href={confirmationUrl}>
            Confirm Subscription
          </Button>

          <Text style={footer}>
            Best regards,{'\n'}
            Tomás{'\n'}
            Creator of DS Pro
          </Text>

          <Hr style={hr} />

          <Text style={footerText}>
            Questions? Email me at{' '}
            <Link href="mailto:tomas@getds.pro" style={link}>
              tomas@getds.pro
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default ConfirmSubscriptionEmail;

const main = {
  backgroundColor: '#f4f4f5',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 24px 48px',
  maxWidth: '580px',
  backgroundColor: '#ffffff',
};

const h1 = {
  color: '#1f2937',
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '24px',
  padding: '16px',
  textAlign: 'center' as const,
};

const text = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'left' as const,
  margin: '24px 16px',
};

const button = {
  backgroundColor: '#0a85ea',
  borderRadius: '4px',
  color: '#fff',
  display: 'inline-block',
  fontFamily: 'HelveticaNeue,Helvetica,Arial,sans-serif',
  fontSize: '14px',
  fontWeight: 600,
  lineHeight: '40px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  width: '100%',
  margin: '16px 0',
};

const hr = {
  borderColor: '#e5e7eb',
  margin: '32px 16px',
};

const footer = {
  ...text,
  whiteSpace: 'pre-wrap' as const,
  marginBottom: '0',
};

const footerText = {
  color: '#6b7280',
  fontSize: '14px',
  lineHeight: '24px',
  textAlign: 'center' as const,
  margin: '16px 16px 0',
};

const link = {
  color: '#2563eb',
  textDecoration: 'underline',
};
