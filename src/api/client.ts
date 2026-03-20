import axios from 'axios';

function getGatewayUrl(): string {
  const host = window.location.hostname;
  if (host.startsWith('cex-admin.')) {
    return `${window.location.protocol}//cex-api.${host.slice(10)}`;
  }
  return import.meta.env.VITE_GATEWAY_URL || 'http://localhost:8080';
}

const BASE = getGatewayUrl();

export const accountApi = axios.create({ baseURL: BASE, timeout: 10000 });
export const walletApi = axios.create({ baseURL: BASE, timeout: 10000 });
export const riskApi = axios.create({ baseURL: BASE, timeout: 10000 });
export const gatewayApi = axios.create({ baseURL: BASE, timeout: 10000 });
