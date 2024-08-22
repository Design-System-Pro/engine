import { convertFigmaVariablesToDesignTokens } from './converter';
import { InsertResourcesSchema } from '@ds-project/database/schema';

const designTokens = convertFigmaVariablesToDesignTokens([
  {
    defaultModeId: '0:0',
    hiddenFromPublishing: false,
    id: 'VariableCollectionId:0:3',
    key: '3f006b7a91efbc3c1e9d79f5401ebdd09757b762',
    modes: [
      {
        name: 'Mode 1',
        modeId: '0:0',
      },
    ],
    name: 'Primitives',
    remote: false,
    variableIds: [
      'VariableID:76:27',
      'VariableID:351:2',
      'VariableID:351:3',
      'VariableID:351:4',
      'VariableID:433:2',
      'VariableID:2221:8',
    ],
    variables: [
      {
        publishStatus: 'UNPUBLISHED',
        description: '',
        hiddenFromPublishing: false,
        name: 'color/background/primary',
        resolvedType: 'COLOR',
        valuesByMode: {
          '0:0': {
            r: 0,
            g: 0.03333333507180214,
            b: 1,
            a: 1,
          },
        },
        id: 'VariableID:76:27',
        key: '365bbe2de64765da1f475cc61fccda4049ea9f66',
        remote: false,
        scopes: ['ALL_SCOPES'],
        variableCollectionId: 'VariableCollectionId:0:3',
      },
      {
        publishStatus: 'UNPUBLISHED',
        description: '',
        hiddenFromPublishing: false,
        name: 'Radius',
        resolvedType: 'FLOAT',
        valuesByMode: {
          '0:0': 8,
        },
        id: 'VariableID:351:2',
        key: 'c781f1e74882b64abf921fd1c0dc9db56dace70a',
        remote: false,
        scopes: ['ALL_SCOPES'],
        variableCollectionId: 'VariableCollectionId:0:3',
      },
      {
        publishStatus: 'UNPUBLISHED',
        description: '',
        hiddenFromPublishing: false,
        name: 'Label',
        resolvedType: 'STRING',
        valuesByMode: {
          '0:0': 'Brand',
        },
        id: 'VariableID:351:3',
        key: 'c6832af95aafb2ddc52f1daf72a5ce87f92efdd8',
        remote: false,
        scopes: ['ALL_SCOPES'],
        variableCollectionId: 'VariableCollectionId:0:3',
      },
      {
        publishStatus: 'UNPUBLISHED',
        description: '',
        hiddenFromPublishing: false,
        name: 'Clicked',
        resolvedType: 'BOOLEAN',
        valuesByMode: {
          '0:0': true,
        },
        id: 'VariableID:351:4',
        key: 'debee2668b2391ac212e59d38f956ff32295556a',
        remote: false,
        scopes: ['ALL_SCOPES'],
        variableCollectionId: 'VariableCollectionId:0:3',
      },
      {
        publishStatus: 'UNPUBLISHED',
        description: '',
        hiddenFromPublishing: false,
        name: 'color/background/secondary',
        resolvedType: 'COLOR',
        valuesByMode: {
          '0:0': {
            r: 1,
            g: 1,
            b: 1,
            a: 1,
          },
        },
        id: 'VariableID:433:2',
        key: '45ae7151aa2ae85ba00a35335f27b4903b8c8e75',
        remote: false,
        scopes: ['ALL_SCOPES'],
        variableCollectionId: 'VariableCollectionId:0:3',
      },
      {
        publishStatus: 'UNPUBLISHED',
        description: '',
        hiddenFromPublishing: false,
        name: 'Number',
        resolvedType: 'FLOAT',
        valuesByMode: {
          '0:0': 16,
        },
        id: 'VariableID:2221:8',
        key: 'd9f849744bd7d5cf2e2a1e41e2bdb607421cec92',
        remote: false,
        scopes: ['LETTER_SPACING'],
        variableCollectionId: 'VariableCollectionId:0:3',
      },
    ],
  },
  {
    defaultModeId: '367:0',
    hiddenFromPublishing: false,
    id: 'VariableCollectionId:367:2',
    key: 'da800af164d583defb046c7bf6b786e59bca4682',
    modes: [
      {
        name: 'Mode 1',
        modeId: '367:0',
      },
    ],
    name: 'Semantic',
    remote: false,
    variableIds: ['VariableID:367:4', 'VariableID:1459:2'],
    variables: [
      {
        publishStatus: 'UNPUBLISHED',
        description: '',
        hiddenFromPublishing: false,
        name: 'button/active/background',
        resolvedType: 'COLOR',
        valuesByMode: {
          '367:0': {
            type: 'VARIABLE_ALIAS',
            id: 'VariableID:433:2',
          },
        },
        id: 'VariableID:367:4',
        key: '168249b4f64609dfa520b9bb67fb6cd32f6c679d',
        remote: false,
        scopes: ['ALL_SCOPES'],
        variableCollectionId: 'VariableCollectionId:367:2',
      },
      {
        publishStatus: 'UNPUBLISHED',
        description: '',
        hiddenFromPublishing: false,
        name: 'Color',
        resolvedType: 'COLOR',
        valuesByMode: {
          '367:0': {
            r: 1,
            g: 1,
            b: 1,
            a: 1,
          },
        },
        id: 'VariableID:1459:2',
        key: '026ed9aeb58f5cb86616ef4fd7f64a90e303adc4',
        remote: false,
        scopes: ['ALL_SCOPES'],
        variableCollectionId: 'VariableCollectionId:367:2',
      },
    ],
  },
  {
    defaultModeId: '1476:0',
    hiddenFromPublishing: true,
    id: 'VariableCollectionId:1476:2',
    key: '97a9ba6fa48acdfd2c2b6f24f47818771fef268f',
    modes: [
      {
        name: 'Mode 1',
        modeId: '1476:0',
      },
    ],
    name: '__config__',
    remote: false,
    variableIds: ['VariableID:1476:3'],
    variables: [
      {
        publishStatus: 'UNPUBLISHED',
        description: '',
        hiddenFromPublishing: true,
        name: 'fileId',
        resolvedType: 'STRING',
        valuesByMode: {
          '1476:0': 'c4258621-7ca8-42fb-9523-d0464bca95fa',
        },
        id: 'VariableID:1476:3',
        key: 'b915d19bef1d77054376fc4bd6e74ad66aa945d0',
        remote: false,
        scopes: [],
        variableCollectionId: 'VariableCollectionId:1476:2',
      },
    ],
  },
]);
const validDesignTokens = InsertResourcesSchema.pick({
  designTokens: true,
  name: true,
}).parse({ designTokens, name: 'Project DS' });

console.log('🧩 TOKENS', JSON.stringify(validDesignTokens, null, 2));
