import { addRequestToBackgroundSync } from '../onSync';
import { getFromNetwork } from './utils';

export async function networkOnlyWithBackgroundSync(request) {
  try {
    return await getFromNetwork(request.clone());
  } catch {
    await addRequestToBackgroundSync(request);
    return new Response();
  }
}
