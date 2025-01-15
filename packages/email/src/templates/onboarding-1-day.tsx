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

interface Onboarding1DayEmailProps {
  username?: string;
  staticPathUrl?: string;
}

export const Onboarding1DayEmail = ({
  username = 'there',
  staticPathUrl = '/static',
}: Onboarding1DayEmailProps) => (
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
        <Text style={tertiary}>Ready to sync?</Text>
        <Heading style={secondary}>
          Let's Get Your Design Tokens Flowing
        </Heading>

        <Section style={contentSection}>
          <Text style={paragraph}>Hi {username},</Text>
          <Text style={paragraph}>
            I noticed you signed up for DS Pro yesterday. Have you had a chance
            to set up your first Figma to GitHub sync? If not, I'd love to help
            you get started and share some exciting updates about what's coming
            next.
          </Text>
        </Section>

        <Hr style={divider} />

        <Section style={contentSection}>
          <Text style={sectionTitle}>Quick Start Your Token Sync</Text>
          <Text style={paragraph}>
            In just 3 minutes, you can set up automated synchronization between
            your Figma design tokens and GitHub repository. Our quick start
            guide will show you exactly how.
          </Text>
          <Button style={button} href="https://go.getds.pro/walkthrough">
            Start 3-min Setup
          </Button>
        </Section>

        <Hr style={divider} />

        <Section style={contentSection}>
          <Text style={sectionTitle}>Coming Soon: More Integrations</Text>
          <Text style={paragraph}>
            We're working on direct NPM registry publishing and one-click design
            system generation. Want to learn more? Let's hop on a quick call
            where I can share our roadmap and get your input.
          </Text>
          <Button style={button} href="https://go.getds.pro/intro-ds-pro">
            Book 15-min Call
          </Button>
        </Section>

        <Hr style={divider} />

        <Section style={contentSection}>
          <Text style={paragraph}>
            Having trouble with the setup? Just hit reply - I personally respond
            to every email and I'm here to help you get your tokens syncing
            smoothly.
          </Text>
        </Section>

        <Text style={signature}>
          Here to help you sync,
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

Onboarding1DayEmail.PreviewProps = {
  username: 'John',
} as Onboarding1DayEmailProps;

export default Onboarding1DayEmail;

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
