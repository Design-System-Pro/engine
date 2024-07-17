import { getFigmaVariables } from "./utils/get-figma-variables";

export async function GetVars() {
  const variables = await getFigmaVariables();
  console.log("✨ Variables", JSON.stringify(variables, null, 2));
  return variables;
}
