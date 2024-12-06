import { collapseTokens } from './collapse-tokens';

describe('collapse tokens', () => {
  it('collapses tokens', async () => {
    expect(
      await collapseTokens({
        group1: {
          group2: {
            group3: {
              group4: {
                token4: {
                  $type: 'color',
                  $value: '#fafafa',
                },
              },
              token3: {
                $type: 'boolean',
                $value: false,
              },
            },
            token2: {
              $type: 'string',
              $value: 'value',
            },
          },
          token1: {
            $type: 'number',
            $value: 1,
          },
        },
      })
    ).toMatchInlineSnapshot(`
      {
        "group1.group2.group3.group4.token4": {
          "$type": "color",
          "$value": {
            "alpha": 1,
            "channels": [
              0.9803921568627451,
              0.9803921568627451,
              0.9803921568627451,
            ],
            "colorSpace": "srgb",
          },
          "group": {
            "id": "group1.group2.group3.group4",
            "tokens": [
              "group1.group2.group3.group4.token4",
            ],
          },
          "id": "group1.group2.group3.group4.token4",
          "mode": {
            ".": {
              "$type": "color",
              "$value": {
                "alpha": 1,
                "channels": [
                  0.9803921568627451,
                  0.9803921568627451,
                  0.9803921568627451,
                ],
                "colorSpace": "srgb",
              },
              "id": "group1.group2.group3.group4.token4",
              "source": {
                "loc": undefined,
                "node": {
                  "loc": {
                    "end": {
                      "column": 12,
                      "line": 9,
                      "offset": 165,
                    },
                    "start": {
                      "column": 21,
                      "line": 6,
                      "offset": 90,
                    },
                  },
                  "members": [
                    {
                      "loc": {
                        "end": {
                          "column": 29,
                          "line": 7,
                          "offset": 120,
                        },
                        "start": {
                          "column": 13,
                          "line": 7,
                          "offset": 104,
                        },
                      },
                      "name": {
                        "loc": {
                          "end": {
                            "column": 20,
                            "line": 7,
                            "offset": 111,
                          },
                          "start": {
                            "column": 13,
                            "line": 7,
                            "offset": 104,
                          },
                        },
                        "type": "String",
                        "value": "$type",
                      },
                      "type": "Member",
                      "value": {
                        "loc": {
                          "end": {
                            "column": 29,
                            "line": 7,
                            "offset": 120,
                          },
                          "start": {
                            "column": 22,
                            "line": 7,
                            "offset": 113,
                          },
                        },
                        "type": "String",
                        "value": "color",
                      },
                    },
                    {
                      "loc": {
                        "end": {
                          "column": 32,
                          "line": 8,
                          "offset": 153,
                        },
                        "start": {
                          "column": 13,
                          "line": 8,
                          "offset": 134,
                        },
                      },
                      "name": {
                        "loc": {
                          "end": {
                            "column": 21,
                            "line": 8,
                            "offset": 142,
                          },
                          "start": {
                            "column": 13,
                            "line": 8,
                            "offset": 134,
                          },
                        },
                        "type": "String",
                        "value": "$value",
                      },
                      "type": "Member",
                      "value": {
                        "loc": {
                          "end": {
                            "column": 32,
                            "line": 8,
                            "offset": 153,
                          },
                          "start": {
                            "column": 23,
                            "line": 8,
                            "offset": 144,
                          },
                        },
                        "type": "String",
                        "value": "#fafafa",
                      },
                    },
                  ],
                  "type": "Object",
                },
              },
            },
          },
          "originalValue": {
            "$type": "color",
            "$value": "#fafafa",
          },
          "source": {
            "loc": undefined,
            "node": {
              "loc": {
                "end": {
                  "column": 12,
                  "line": 9,
                  "offset": 165,
                },
                "start": {
                  "column": 21,
                  "line": 6,
                  "offset": 90,
                },
              },
              "members": [
                {
                  "loc": {
                    "end": {
                      "column": 29,
                      "line": 7,
                      "offset": 120,
                    },
                    "start": {
                      "column": 13,
                      "line": 7,
                      "offset": 104,
                    },
                  },
                  "name": {
                    "loc": {
                      "end": {
                        "column": 20,
                        "line": 7,
                        "offset": 111,
                      },
                      "start": {
                        "column": 13,
                        "line": 7,
                        "offset": 104,
                      },
                    },
                    "type": "String",
                    "value": "$type",
                  },
                  "type": "Member",
                  "value": {
                    "loc": {
                      "end": {
                        "column": 29,
                        "line": 7,
                        "offset": 120,
                      },
                      "start": {
                        "column": 22,
                        "line": 7,
                        "offset": 113,
                      },
                    },
                    "type": "String",
                    "value": "color",
                  },
                },
                {
                  "loc": {
                    "end": {
                      "column": 32,
                      "line": 8,
                      "offset": 153,
                    },
                    "start": {
                      "column": 13,
                      "line": 8,
                      "offset": 134,
                    },
                  },
                  "name": {
                    "loc": {
                      "end": {
                        "column": 21,
                        "line": 8,
                        "offset": 142,
                      },
                      "start": {
                        "column": 13,
                        "line": 8,
                        "offset": 134,
                      },
                    },
                    "type": "String",
                    "value": "$value",
                  },
                  "type": "Member",
                  "value": {
                    "loc": {
                      "end": {
                        "column": 32,
                        "line": 8,
                        "offset": 153,
                      },
                      "start": {
                        "column": 23,
                        "line": 8,
                        "offset": 144,
                      },
                    },
                    "type": "String",
                    "value": "#fafafa",
                  },
                },
              ],
              "type": "Object",
            },
          },
        },
        "group1.group2.group3.token3": {
          "$type": "boolean",
          "$value": false,
          "group": {
            "id": "group1.group2.group3",
            "tokens": [
              "group1.group2.group3.group4.token4",
              "group1.group2.group3.token3",
            ],
          },
          "id": "group1.group2.group3.token3",
          "mode": {
            ".": {
              "$type": "boolean",
              "$value": false,
              "id": "group1.group2.group3.token3",
              "source": {
                "loc": undefined,
                "node": {
                  "loc": {
                    "end": {
                      "column": 10,
                      "line": 14,
                      "offset": 262,
                    },
                    "start": {
                      "column": 19,
                      "line": 11,
                      "offset": 195,
                    },
                  },
                  "members": [
                    {
                      "loc": {
                        "end": {
                          "column": 29,
                          "line": 12,
                          "offset": 225,
                        },
                        "start": {
                          "column": 11,
                          "line": 12,
                          "offset": 207,
                        },
                      },
                      "name": {
                        "loc": {
                          "end": {
                            "column": 18,
                            "line": 12,
                            "offset": 214,
                          },
                          "start": {
                            "column": 11,
                            "line": 12,
                            "offset": 207,
                          },
                        },
                        "type": "String",
                        "value": "$type",
                      },
                      "type": "Member",
                      "value": {
                        "loc": {
                          "end": {
                            "column": 29,
                            "line": 12,
                            "offset": 225,
                          },
                          "start": {
                            "column": 20,
                            "line": 12,
                            "offset": 216,
                          },
                        },
                        "type": "String",
                        "value": "boolean",
                      },
                    },
                    {
                      "loc": {
                        "end": {
                          "column": 26,
                          "line": 13,
                          "offset": 252,
                        },
                        "start": {
                          "column": 11,
                          "line": 13,
                          "offset": 237,
                        },
                      },
                      "name": {
                        "loc": {
                          "end": {
                            "column": 19,
                            "line": 13,
                            "offset": 245,
                          },
                          "start": {
                            "column": 11,
                            "line": 13,
                            "offset": 237,
                          },
                        },
                        "type": "String",
                        "value": "$value",
                      },
                      "type": "Member",
                      "value": {
                        "loc": {
                          "end": {
                            "column": 26,
                            "line": 13,
                            "offset": 252,
                          },
                          "start": {
                            "column": 21,
                            "line": 13,
                            "offset": 247,
                          },
                        },
                        "type": "Boolean",
                        "value": false,
                      },
                    },
                  ],
                  "type": "Object",
                },
              },
            },
          },
          "originalValue": {
            "$type": "boolean",
            "$value": false,
          },
          "source": {
            "loc": undefined,
            "node": {
              "loc": {
                "end": {
                  "column": 10,
                  "line": 14,
                  "offset": 262,
                },
                "start": {
                  "column": 19,
                  "line": 11,
                  "offset": 195,
                },
              },
              "members": [
                {
                  "loc": {
                    "end": {
                      "column": 29,
                      "line": 12,
                      "offset": 225,
                    },
                    "start": {
                      "column": 11,
                      "line": 12,
                      "offset": 207,
                    },
                  },
                  "name": {
                    "loc": {
                      "end": {
                        "column": 18,
                        "line": 12,
                        "offset": 214,
                      },
                      "start": {
                        "column": 11,
                        "line": 12,
                        "offset": 207,
                      },
                    },
                    "type": "String",
                    "value": "$type",
                  },
                  "type": "Member",
                  "value": {
                    "loc": {
                      "end": {
                        "column": 29,
                        "line": 12,
                        "offset": 225,
                      },
                      "start": {
                        "column": 20,
                        "line": 12,
                        "offset": 216,
                      },
                    },
                    "type": "String",
                    "value": "boolean",
                  },
                },
                {
                  "loc": {
                    "end": {
                      "column": 26,
                      "line": 13,
                      "offset": 252,
                    },
                    "start": {
                      "column": 11,
                      "line": 13,
                      "offset": 237,
                    },
                  },
                  "name": {
                    "loc": {
                      "end": {
                        "column": 19,
                        "line": 13,
                        "offset": 245,
                      },
                      "start": {
                        "column": 11,
                        "line": 13,
                        "offset": 237,
                      },
                    },
                    "type": "String",
                    "value": "$value",
                  },
                  "type": "Member",
                  "value": {
                    "loc": {
                      "end": {
                        "column": 26,
                        "line": 13,
                        "offset": 252,
                      },
                      "start": {
                        "column": 21,
                        "line": 13,
                        "offset": 247,
                      },
                    },
                    "type": "Boolean",
                    "value": false,
                  },
                },
              ],
              "type": "Object",
            },
          },
        },
        "group1.group2.token2": {
          "$type": "string",
          "$value": "value",
          "group": {
            "id": "group1.group2",
            "tokens": [
              "group1.group2.group3.group4.token4",
              "group1.group2.group3.token3",
              "group1.group2.token2",
            ],
          },
          "id": "group1.group2.token2",
          "mode": {
            ".": {
              "$type": "string",
              "$value": "value",
              "id": "group1.group2.token2",
              "source": {
                "loc": undefined,
                "node": {
                  "loc": {
                    "end": {
                      "column": 8,
                      "line": 19,
                      "offset": 350,
                    },
                    "start": {
                      "column": 17,
                      "line": 16,
                      "offset": 288,
                    },
                  },
                  "members": [
                    {
                      "loc": {
                        "end": {
                          "column": 26,
                          "line": 17,
                          "offset": 315,
                        },
                        "start": {
                          "column": 9,
                          "line": 17,
                          "offset": 298,
                        },
                      },
                      "name": {
                        "loc": {
                          "end": {
                            "column": 16,
                            "line": 17,
                            "offset": 305,
                          },
                          "start": {
                            "column": 9,
                            "line": 17,
                            "offset": 298,
                          },
                        },
                        "type": "String",
                        "value": "$type",
                      },
                      "type": "Member",
                      "value": {
                        "loc": {
                          "end": {
                            "column": 26,
                            "line": 17,
                            "offset": 315,
                          },
                          "start": {
                            "column": 18,
                            "line": 17,
                            "offset": 307,
                          },
                        },
                        "type": "String",
                        "value": "string",
                      },
                    },
                    {
                      "loc": {
                        "end": {
                          "column": 26,
                          "line": 18,
                          "offset": 342,
                        },
                        "start": {
                          "column": 9,
                          "line": 18,
                          "offset": 325,
                        },
                      },
                      "name": {
                        "loc": {
                          "end": {
                            "column": 17,
                            "line": 18,
                            "offset": 333,
                          },
                          "start": {
                            "column": 9,
                            "line": 18,
                            "offset": 325,
                          },
                        },
                        "type": "String",
                        "value": "$value",
                      },
                      "type": "Member",
                      "value": {
                        "loc": {
                          "end": {
                            "column": 26,
                            "line": 18,
                            "offset": 342,
                          },
                          "start": {
                            "column": 19,
                            "line": 18,
                            "offset": 335,
                          },
                        },
                        "type": "String",
                        "value": "value",
                      },
                    },
                  ],
                  "type": "Object",
                },
              },
            },
          },
          "originalValue": {
            "$type": "string",
            "$value": "value",
          },
          "source": {
            "loc": undefined,
            "node": {
              "loc": {
                "end": {
                  "column": 8,
                  "line": 19,
                  "offset": 350,
                },
                "start": {
                  "column": 17,
                  "line": 16,
                  "offset": 288,
                },
              },
              "members": [
                {
                  "loc": {
                    "end": {
                      "column": 26,
                      "line": 17,
                      "offset": 315,
                    },
                    "start": {
                      "column": 9,
                      "line": 17,
                      "offset": 298,
                    },
                  },
                  "name": {
                    "loc": {
                      "end": {
                        "column": 16,
                        "line": 17,
                        "offset": 305,
                      },
                      "start": {
                        "column": 9,
                        "line": 17,
                        "offset": 298,
                      },
                    },
                    "type": "String",
                    "value": "$type",
                  },
                  "type": "Member",
                  "value": {
                    "loc": {
                      "end": {
                        "column": 26,
                        "line": 17,
                        "offset": 315,
                      },
                      "start": {
                        "column": 18,
                        "line": 17,
                        "offset": 307,
                      },
                    },
                    "type": "String",
                    "value": "string",
                  },
                },
                {
                  "loc": {
                    "end": {
                      "column": 26,
                      "line": 18,
                      "offset": 342,
                    },
                    "start": {
                      "column": 9,
                      "line": 18,
                      "offset": 325,
                    },
                  },
                  "name": {
                    "loc": {
                      "end": {
                        "column": 17,
                        "line": 18,
                        "offset": 333,
                      },
                      "start": {
                        "column": 9,
                        "line": 18,
                        "offset": 325,
                      },
                    },
                    "type": "String",
                    "value": "$value",
                  },
                  "type": "Member",
                  "value": {
                    "loc": {
                      "end": {
                        "column": 26,
                        "line": 18,
                        "offset": 342,
                      },
                      "start": {
                        "column": 19,
                        "line": 18,
                        "offset": 335,
                      },
                    },
                    "type": "String",
                    "value": "value",
                  },
                },
              ],
              "type": "Object",
            },
          },
        },
        "group1.token1": {
          "$type": "number",
          "$value": 1,
          "group": {
            "id": "group1",
            "tokens": [
              "group1.group2.group3.group4.token4",
              "group1.group2.group3.token3",
              "group1.group2.token2",
              "group1.token1",
            ],
          },
          "id": "group1.token1",
          "mode": {
            ".": {
              "$type": "number",
              "$value": 1,
              "id": "group1.token1",
              "source": {
                "loc": undefined,
                "node": {
                  "loc": {
                    "end": {
                      "column": 6,
                      "line": 24,
                      "offset": 422,
                    },
                    "start": {
                      "column": 15,
                      "line": 21,
                      "offset": 372,
                    },
                  },
                  "members": [
                    {
                      "loc": {
                        "end": {
                          "column": 24,
                          "line": 22,
                          "offset": 397,
                        },
                        "start": {
                          "column": 7,
                          "line": 22,
                          "offset": 380,
                        },
                      },
                      "name": {
                        "loc": {
                          "end": {
                            "column": 14,
                            "line": 22,
                            "offset": 387,
                          },
                          "start": {
                            "column": 7,
                            "line": 22,
                            "offset": 380,
                          },
                        },
                        "type": "String",
                        "value": "$type",
                      },
                      "type": "Member",
                      "value": {
                        "loc": {
                          "end": {
                            "column": 24,
                            "line": 22,
                            "offset": 397,
                          },
                          "start": {
                            "column": 16,
                            "line": 22,
                            "offset": 389,
                          },
                        },
                        "type": "String",
                        "value": "number",
                      },
                    },
                    {
                      "loc": {
                        "end": {
                          "column": 18,
                          "line": 23,
                          "offset": 416,
                        },
                        "start": {
                          "column": 7,
                          "line": 23,
                          "offset": 405,
                        },
                      },
                      "name": {
                        "loc": {
                          "end": {
                            "column": 15,
                            "line": 23,
                            "offset": 413,
                          },
                          "start": {
                            "column": 7,
                            "line": 23,
                            "offset": 405,
                          },
                        },
                        "type": "String",
                        "value": "$value",
                      },
                      "type": "Member",
                      "value": {
                        "loc": {
                          "end": {
                            "column": 18,
                            "line": 23,
                            "offset": 416,
                          },
                          "start": {
                            "column": 17,
                            "line": 23,
                            "offset": 415,
                          },
                        },
                        "type": "Number",
                        "value": 1,
                      },
                    },
                  ],
                  "type": "Object",
                },
              },
            },
          },
          "originalValue": {
            "$type": "number",
            "$value": 1,
          },
          "source": {
            "loc": undefined,
            "node": {
              "loc": {
                "end": {
                  "column": 6,
                  "line": 24,
                  "offset": 422,
                },
                "start": {
                  "column": 15,
                  "line": 21,
                  "offset": 372,
                },
              },
              "members": [
                {
                  "loc": {
                    "end": {
                      "column": 24,
                      "line": 22,
                      "offset": 397,
                    },
                    "start": {
                      "column": 7,
                      "line": 22,
                      "offset": 380,
                    },
                  },
                  "name": {
                    "loc": {
                      "end": {
                        "column": 14,
                        "line": 22,
                        "offset": 387,
                      },
                      "start": {
                        "column": 7,
                        "line": 22,
                        "offset": 380,
                      },
                    },
                    "type": "String",
                    "value": "$type",
                  },
                  "type": "Member",
                  "value": {
                    "loc": {
                      "end": {
                        "column": 24,
                        "line": 22,
                        "offset": 397,
                      },
                      "start": {
                        "column": 16,
                        "line": 22,
                        "offset": 389,
                      },
                    },
                    "type": "String",
                    "value": "number",
                  },
                },
                {
                  "loc": {
                    "end": {
                      "column": 18,
                      "line": 23,
                      "offset": 416,
                    },
                    "start": {
                      "column": 7,
                      "line": 23,
                      "offset": 405,
                    },
                  },
                  "name": {
                    "loc": {
                      "end": {
                        "column": 15,
                        "line": 23,
                        "offset": 413,
                      },
                      "start": {
                        "column": 7,
                        "line": 23,
                        "offset": 405,
                      },
                    },
                    "type": "String",
                    "value": "$value",
                  },
                  "type": "Member",
                  "value": {
                    "loc": {
                      "end": {
                        "column": 18,
                        "line": 23,
                        "offset": 416,
                      },
                      "start": {
                        "column": 17,
                        "line": 23,
                        "offset": 415,
                      },
                    },
                    "type": "Number",
                    "value": 1,
                  },
                },
              ],
              "type": "Object",
            },
          },
        },
      }
    `);
  });
});
