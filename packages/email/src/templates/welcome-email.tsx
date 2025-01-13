import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Section,
  Text,
  Button,
  Hr,
} from '@react-email/components';

interface WelcomeEmailProps {
  username?: string;
  staticPathUrl?: string;
}

export const WelcomeEmail = ({
  username = 'there',
  staticPathUrl = '/static',
}: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`${staticPathUrl}/email-ds-logo.png`}
          width="100%"
          alt="DS Pro"
          style={logo}
        />
        <Text style={tertiary}>Welcome to DS Pro</Text>
        <Heading style={secondary}>
          Seamless Design Token Synchronization Awaits
        </Heading>

        <Section style={contentSection}>
          <Text style={paragraph}>Hi {username},</Text>
          <Text style={paragraph}>
            Thank you for joining DS Pro! I'm excited to help you streamline
            your design token workflow between Figma and GitHub. Let's get you
            started with the essentials.
          </Text>
        </Section>

        <Hr style={divider} />

        <Section style={contentSection}>
          <Text style={sectionTitle}>Set Up Your First Sync</Text>
          <Text style={paragraph}>
            Watch our quick setup guide to connect your Figma design tokens with
            your GitHub repository. It's easier than you think!
          </Text>
          <Button style={button} href="https://example.com/getting-started">
            Watch Setup Guide
          </Button>
        </Section>

        <Hr style={divider} />

        <Section style={contentSection}>
          <Text style={sectionTitle}>Book a Personal Demo</Text>
          <Text style={paragraph}>
            Want to ensure you're getting the most out of token synchronization?
            Let's hop on a quick call where I can show you our best practices
            and upcoming features like NPM registry publishing and one-click
            design system generation.
          </Text>
          <Button style={button} href="https://calendly.com/dspro/onboarding">
            Schedule Demo
          </Button>
        </Section>

        <Hr style={divider} />

        <Section style={contentSection}>
          <Text style={paragraph}>
            Have questions about setting up your token sync? Just reply to this
            email - I personally respond to every message and I'm here to help
            you succeed.
          </Text>
        </Section>

        <Text style={signature}>
          Looking forward to helping you sync,
          <br />
          Tomás
          <br />
          Creator of DS Pro
        </Text>
      </Container>
      <Text style={footer}>
        Sent by <Link href="https://getds.pro">DS Pro</Link>. Contact us at{' '}
        <Link href="mailto:tomas@getds.pro">tomas@getds.pro</Link>.
      </Text>
    </Body>
  </Html>
);

WelcomeEmail.PreviewProps = {
  username: 'John',
} as WelcomeEmailProps;

export default WelcomeEmail;

const main = {
  backgroundColor: '#ffffff',
  fontFamily: 'HelveticaNeue,Helvetica,Arial,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  border: '1px solid #eee',
  borderRadius: '5px',
  boxShadow: '0 5px 10px rgba(20,50,70,.2)',
  marginTop: '20px',
  maxWidth: '360px',
  margin: '0 auto',
  padding: '0px 16px 40px',
  overflow: 'hidden',
};

const logo = {
  margin: '0 auto',
};

const tertiary = {
  color: '#0a85ea',
  fontSize: '11px',
  fontWeight: 700,
  fontFamily: 'HelveticaNeue,Helvetica,Arial,sans-serif',
  height: '16px',
  letterSpacing: '0',
  lineHeight: '16px',
  margin: '16px 8px 8px 8px',
  textTransform: 'uppercase' as const,
  textAlign: 'center' as const,
};

const secondary = {
  color: '#000',
  display: 'inline-block',
  fontFamily: 'HelveticaNeue-Medium,Helvetica,Arial,sans-serif',
  fontSize: '20px',
  fontWeight: 500,
  lineHeight: '24px',
  marginBottom: '0',
  marginTop: '0',
  textAlign: 'center' as const,
};

const contentSection = {
  margin: '24px 0',
};

const sectionTitle = {
  color: '#000',
  fontSize: '15px',
  fontWeight: 700,
  fontFamily: 'HelveticaNeue,Helvetica,Arial,sans-serif',
  letterSpacing: '0',
  lineHeight: '23px',
  margin: '8px 0',
};

const paragraph = {
  color: '#444',
  fontSize: '15px',
  fontFamily: 'HelveticaNeue,Helvetica,Arial,sans-serif',
  letterSpacing: '0',
  lineHeight: '23px',
  margin: '8px 0',
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

const divider = {
  borderColor: '#eee',
  margin: '20px 0',
};

const signature = {
  ...paragraph,
  marginTop: '32px',
  textAlign: 'center' as const,
};

const footer = {
  color: '#000',
  fontSize: '12px',
  fontWeight: 800,
  letterSpacing: '0',
  lineHeight: '23px',
  margin: '0',
  marginTop: '20px',
  fontFamily: 'HelveticaNeue,Helvetica,Arial,sans-serif',
  textAlign: 'center' as const,
  textTransform: 'uppercase' as const,
};
