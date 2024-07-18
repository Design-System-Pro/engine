import { GetVars } from "./variables/main";

figma.showUI(__html__, { themeColors: true, height: 300 });

figma.ui.onmessage = async (msg) => {
  if (msg.type === "ui-ready") {
    const tokens = await GetVars();
    figma.ui.postMessage({
      type: "export-design-token-json",
      tokens,
    });
  }
};
