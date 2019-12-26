import { addRequestToBackgroundSync } from '../onSync';
import { getFromNetwork } from './utils';

export async function networkOnlyWithBackgroundSync(request) {
  try {
    return await getFromNetwork(request);
  } catch {
    await addRequestToBackgroundSync(request);
  }
}
