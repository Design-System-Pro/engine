var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/utils/get-figma-variables.ts
var getFigmaVariables;
var init_get_figma_variables = __esm({
  "src/utils/get-figma-variables.ts"() {
    "use strict";
    getFigmaVariables = async () => {
      const collections = await figma.variables.getLocalVariableCollectionsAsync();
      return await Promise.all(
        collections.map(
          async (variableCollection) => await Promise.all(
            variableCollection.variableIds.map(async (variableId) => {
              const variable = await figma.variables.getVariableByIdAsync(
                variableId
              );
              return variableCollection.modes.map(({ modeId }) => {
                const variableKeys = variable == null ? void 0 : variable.name.split("/");
                if (!variableKeys) {
                  throw new Error("Invalid variable name");
                }
                switch (variable == null ? void 0 : variable.resolvedType) {
                  case "COLOR":
                    return variableKeys.reduceRight((result, key) => {
                      if (Object.keys(result).length === 0) {
                        return {
                          [key]: { value: variable.valuesByMode[modeId] }
                        };
                      }
                      return { [key]: result };
                    }, {});
                  case "BOOLEAN":
                    return variableKeys.reduceRight((result, key) => {
                      if (Object.keys(result).length === 0) {
                        return {
                          [key]: { value: variable.valuesByMode[modeId] }
                        };
                      }
                      return { [key]: result };
                    }, {});
                  case "STRING":
                    return variableKeys.reduceRight((result, key) => {
                      if (Object.keys(result).length === 0) {
                        return {
                          [key]: { value: variable.valuesByMode[modeId] }
                        };
                      }
                      return { [key]: result };
                    }, {});
                  case "FLOAT":
                    return variableKeys.reduceRight((result, key) => {
                      if (Object.keys(result).length === 0) {
                        return {
                          [key]: { value: variable.valuesByMode[modeId] }
                        };
                      }
                      return { [key]: result };
                    }, {});
                  default:
                    console.log("unknown type", variable == null ? void 0 : variable.resolvedType);
                }
                return;
              });
            })
          )
        )
      );
    };
  }
});

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => GetVars
});
async function GetVars() {
  const variables = await getFigmaVariables();
  console.log("\u2728 Variables", variables);
  figma.closePlugin();
}
var init_main = __esm({
  "src/main.ts"() {
    "use strict";
    init_get_figma_variables();
  }
});

// <stdin>
var modules = { "src/main.ts--default": (init_main(), __toCommonJS(main_exports))["default"] };
var commandId = true ? "src/main.ts--default" : figma.command;
modules[commandId]();
