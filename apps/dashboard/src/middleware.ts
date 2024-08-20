import { authenticationMiddleware } from './lib/auth/middleware';
import { compose } from './lib/middleware/compose';
import { figmaMiddleware } from './lib/middleware/figma/middleware';

export default compose([figmaMiddleware, authenticationMiddleware]);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|api/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
