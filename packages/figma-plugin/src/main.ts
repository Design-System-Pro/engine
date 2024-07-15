import { getFigmaVariables } from "./utils/get-figma-variables";

export default async function GetVars() {
  const variables = await getFigmaVariables();
  console.log("✨ Variables", variables);

  figma.closePlugin();
}
