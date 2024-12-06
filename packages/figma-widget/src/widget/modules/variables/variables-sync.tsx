import { Variables } from '../../components/variables';
import { useVariablesActions } from './variables.actions';

export function VariablesSync() {
  const { syncVariables, injectVariables, isReady, lastSyncedAt } =
    useVariablesActions();

  if (!isReady) {
    return null;
  }

  return (
    <Variables
      onSyncVariablesClick={syncVariables}
      onInjectVariableClick={injectVariables}
      lastSyncedAt={lastSyncedAt}
    />
  );
}
