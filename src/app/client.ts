import { createThirdwebClient } from "thirdweb";

// Replace this with your client ID string
// refer to https://portal.thirdweb.com/typescript/v5/client on how to get a client ID
const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "";

if (!clientId) {
  console.error("Warning: NEXT_PUBLIC_THIRDWEB_CLIENT_ID not found in environment variables");
}

export const client = createThirdwebClient({
  clientId: clientId,
});
