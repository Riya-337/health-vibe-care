import { handler as nitroHandler } from '../.output/server/index.mjs';

export const config = {
  runtime: 'nodejs',
};

export default function handler(req, res) {
  return nitroHandler(req, res);
}
