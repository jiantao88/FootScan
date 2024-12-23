import { ethers } from 'ethers';
import { getContract } from 'thirdweb';
import { CONTRACT_ADDRESSES } from '@/constants/contracts';

export async function claimTokens(signer: ethers.Signer) {
  try {
    const contract = await getContract(CONTRACT_ADDRESSES.token);
    const tx = await contract.call('claimFromFaucet');
    await tx.wait();
    return true;
  } catch (error) {
    console.error('Error claiming tokens:', error);
    return false;
  }
}

export async function getTokenBalance(address: string) {
  try {
    const contract = await getContract(CONTRACT_ADDRESSES.token);
    const balance = await contract.call('balanceOf', [address]);
    return balance;
  } catch (error) {
    console.error('Error getting token balance:', error);
    return ethers.BigNumber.from(0);
  }
}

export async function canClaimTokens(address: string) {
  try {
    const contract = await getContract(CONTRACT_ADDRESSES.token);
    const canClaim = await contract.call('canClaimFromFaucet', [address]);
    return canClaim;
  } catch (error) {
    console.error('Error checking if can claim tokens:', error);
    return false;
  }
}
