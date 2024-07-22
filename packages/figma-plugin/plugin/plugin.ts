import { GetVars } from './variables/main';

figma.showUI(__html__, { themeColors: true, height: 300 });

figma.ui.onmessage = async (msg) => {
  switch (msg.type) {
    case 'ui-ready': {
      const tokens = await GetVars();
      figma.ui.postMessage({
        type: 'export-design-token-json',
        tokens,
      });

      const githubToken = await figma.clientStorage.getAsync('gh-token');
      if (githubToken) {
        figma.ui.postMessage({
          type: 'github-token',
          token: githubToken,
        });
      }
      break;
    }

    case 'store-github-token': {
      console.log('saved the github token', msg.token);
      figma.clientStorage.setAsync('gh-token', msg.token);
      break;
    }

    case 'delete-github-token': {
      console.log('removed the github token');
      figma.clientStorage.deleteAsync('gh-token');
      break;
    }
  }
};
