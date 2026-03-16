import axios from 'axios';

const ACCOUNT_URL = import.meta.env.VITE_ACCOUNT_URL || 'http://localhost:50053';
const WALLET_URL = import.meta.env.VITE_WALLET_URL || 'http://localhost:50054';
const RISK_URL = import.meta.env.VITE_RISK_URL || 'http://localhost:50055';
const GATEWAY_URL = import.meta.env.VITE_GATEWAY_URL || 'http://localhost:8080';

export const accountApi = axios.create({ baseURL: ACCOUNT_URL, timeout: 10000 });
export const walletApi = axios.create({ baseURL: WALLET_URL, timeout: 10000 });
export const riskApi = axios.create({ baseURL: RISK_URL, timeout: 10000 });
export const gatewayApi = axios.create({ baseURL: GATEWAY_URL, timeout: 10000 });
