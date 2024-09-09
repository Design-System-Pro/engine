import { Variables } from '../../components/variables';
import { useVariablesActions } from './variables.actions';

export function VariablesSync() {
  const { syncVariables, isReady, lastSyncedAt } = useVariablesActions();

  if (!isReady) {
    return null;
  }

  return (
    <Variables
      onSyncVariablesClick={syncVariables}
      lastSyncedAt={lastSyncedAt}
    />
  );
}
