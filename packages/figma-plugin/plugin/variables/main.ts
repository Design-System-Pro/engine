import { getFigmaVariables } from "./utils/get-figma-variables";

export async function GetVars() {
  const variables = await getFigmaVariables();
  return variables;
}
