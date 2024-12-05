import { flattenTokens, unflattenTokens } from "./flatten-tokens";

describe("flattenTokens", () => {
  it("should flatten tokens", () => {
    expect(
      flattenTokens({
        theme: {
          "mode 1": {
            primary: {
              background: {
                default: {
                  $type: "color",
                  $value: "#18181be5",
                  $description: "Primary color used by many components",
                },
              },
            },
          },
        },
      }),
    ).toStrictEqual({
      "theme.mode 1.primary.background.default": {
        $type: "color",
        $value: "#18181be5",
        $description: "Primary color used by many components",
      },
    });
  });

  it("should restore design tokens structure", () => {
    expect(
      unflattenTokens({
        "theme.mode 1.primary.background.default": {
          $type: "color",
          $value: "#18181be5",
          $description: "Primary color used by many components",
        },
      }),
    ).toStrictEqual({
      theme: {
        "mode 1": {
          primary: {
            background: {
              default: {
                $type: "color",
                $value: "#18181be5",
                $description: "Primary color used by many components",
              },
            },
          },
        },
      },
    });
  });
});
