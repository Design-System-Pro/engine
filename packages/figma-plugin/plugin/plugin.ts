import { GetVars } from "./variables/main";

figma.showUI(__html__, { themeColors: true, height: 300 });

figma.ui.onmessage = async (msg) => {
  if (msg.type === "export-design-token-json") {
    await GetVars();
  }

  figma.closePlugin();
};
