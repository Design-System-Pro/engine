import { Github, Linkedin, Twitter } from 'lucide-react';

export function SocialLinks() {
  return (
    <footer className="flex space-x-4">
      <a
        href="https://twitter.com/tomasfrancisco"
        className="text-muted-foreground hover:text-primary"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Twitter className="h-5 w-5" />
        <span className="sr-only">Twitter</span>
      </a>
      <a
        href="https://github.com/tomasfrancisco"
        className="text-muted-foreground hover:text-primary"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Github className="h-5 w-5" />
        <span className="sr-only">GitHub</span>
      </a>
      <a
        href="https://linkedin.com/in/tomasfrancisco"
        className="text-muted-foreground hover:text-primary"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Linkedin className="h-5 w-5" />
        <span className="sr-only">LinkedIn</span>
      </a>
    </footer>
  );
}
