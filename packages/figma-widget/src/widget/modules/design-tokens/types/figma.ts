export type FigmaExtractedVariable = Omit<
  Variable,
  | keyof PluginDataMixin
  | 'getPublishStatusAsync'
  | 'resolveForConsumer'
  | 'setValueForMode'
  | 'remove'
  | 'setVariableCodeSyntax'
  | 'removeVariableCodeSyntax'
  | 'codeSyntax'
> & {
  publishStatus?: PublishStatus;
};

export type FigmaExtractedVariableCollection = Omit<
  VariableCollection,
  | keyof PluginDataMixin
  | 'getPublishStatusAsync'
  | 'remove'
  | 'removeMode'
  | 'addMode'
  | 'renameMode'
> & {
  variables: FigmaExtractedVariable[];
};
