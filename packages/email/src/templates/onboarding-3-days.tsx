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

interface Onboarding3DaysEmailProps {
  username?: string;
  staticPathUrl?: string;
}

export const Onboarding3DaysEmail = ({
  username = 'there',
  staticPathUrl = '/static',
}: Onboarding3DaysEmailProps) => (
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
        <Text style={tertiary}>The Future of Design Tokens</Text>
        <Heading style={secondary}>Help Shape What's Coming Next</Heading>

        <Section style={contentSection}>
          <Text style={paragraph}>Hi {username},</Text>
          <Text style={paragraph}>
            As one of our early users, I wanted to give you a sneak peek into
            what we're building next at DS Pro. Your feedback on these upcoming
            features would be incredibly valuable.
          </Text>
        </Section>

        <Hr style={divider} />

        <Section style={contentSection}>
          <Text style={sectionTitle}>Coming Soon: Direct NPM Publishing</Text>
          <Text style={paragraph}>
            Soon you'll be able to publish your design tokens directly to the
            NPM registry. Want early access? Join our Discord community to be
            the first to know when it's ready.
          </Text>
          <Button style={button} href="https://getds.pro/community">
            Join Discord Community
          </Button>
        </Section>

        <Hr style={divider} />

        <Section style={contentSection}>
          <Text style={sectionTitle}>Preview: One-Click Design Systems</Text>
          <Text style={paragraph}>
            We're working on generating complete design systems with a single
            click. Book a call to see an early demo and share your thoughts on
            what would make this feature perfect for your workflow.
          </Text>
          <Button style={button} href="https://go.getds.pro/intro-ds-pro">
            Book Preview & Share Feedback
          </Button>
        </Section>

        <Hr style={divider} />

        <Section style={contentSection}>
          <Text style={sectionTitle}>Need Help With Token Sync?</Text>
          <Text style={paragraph}>
            Still getting set up with the Figma to GitHub sync? Let's hop on a
            quick call to get you up and running, and I can show you some tips
            for managing your design tokens effectively.
          </Text>
          <Button style={button} href="https://calendly.com/dspro/onboarding">
            Schedule Quick Setup Call
          </Button>
        </Section>

        <Text style={signature}>
          Building the future together,
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

Onboarding3DaysEmail.PreviewProps = {
  username: 'John',
} as Onboarding3DaysEmailProps;

export default Onboarding3DaysEmail;

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
