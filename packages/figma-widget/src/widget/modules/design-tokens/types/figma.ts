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
