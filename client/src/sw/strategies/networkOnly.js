import { getFromNetwork } from './utils';

export async function networkOnly(request) {
  return await getFromNetwork(request);
}
