import axios from "./axios";

// Step 1: Create a link token (for bank connection UI)
// Backend must provide link_token or bank connect URL
export const createLinkToken = () => axios.post("/bank/link-token");

// Step 2: Exchange temporary token after user connects bank
export const exchangePublicToken = (publicToken) =>
  axios.post("/bank/exchange", { publicToken });

// Step 3: Sync transactions/accounts from connected bank
export const syncAccounts = () => axios.post("/bank/sync");
