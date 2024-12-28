use alloy_primitives::{Address, U256};
use alloy_sol_types::sol;
use core::marker::PhantomData;
use stylus_sdk::{block, evm, msg, prelude::*};

pub trait FoodScanTokenParams {
    const NAME: &'static str;
    const SYMBOL: &'static str;
    const DECIMALS: u8;
}

sol_storage! {
    pub struct FoodScanToken<T> {
        mapping(address => uint256) balances;
        mapping(address => mapping(address => uint256)) allowances;
        mapping(address => uint256) last_claim;
        uint256 total_supply;
        PhantomData<T> phantom;
    }
}
// Declare events and Solidity error types
sol! {
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    error InsufficientBalance(address from, uint256 have, uint256 want);
    error InsufficientAllowance(address owner, address spender, uint256 have, uint256 want);
    error CooldownNotExpired(address user, uint256 lastClaim, uint256 currentTime);
}

#[derive(SolidityError)]
pub enum FoodScanTokenError {
    InsufficientBalance(InsufficientBalance),
    InsufficientAllowance(InsufficientAllowance),
    CooldownNotExpired(CooldownNotExpired),
}

// Constants
const CLAIM_AMOUNT: U256 = U256::from_limbs([0xDE0B6B3A7640000u64, 0x0u64, 0u64, 0u64]); 
const CLAIM_COOLDOWN: U256 = U256::from_limbs([86400u64, 0u64, 0u64, 0u64]); // 24 hours


impl<T: FoodScanTokenParams> FoodScanToken<T> {
    pub fn constructor(&mut self) {
        let total_supply =U256::from_limbs([0xDE0B6B3A7640000u64, 0x0u64, 0u64, 0u64]); // 1,000,000 tokens
        self.total_supply.set(total_supply);
        self.balances.insert(msg::sender(), total_supply);
        evm::log(Transfer {
            from: Address::ZERO,
            to: msg::sender(),
            value: total_supply,
        });
    }

    fn _transfer(&mut self, from: Address, to: Address, value: U256) -> Result<bool, Vec<u8>> {
        if to == Address::ZERO {
            return Err(FoodScanTokenError::InsufficientBalance(InsufficientBalance {
                from,
                have: U256::ZERO,
                want: value,
            }).into());
        }
        
        let from_balance = self.balances.get(from);
        if from_balance < value {
            return Err(FoodScanTokenError::InsufficientBalance(InsufficientBalance {
                from,
                have: from_balance,
                want: value,
            }).into());
        }
        
        self.balances.insert(from, from_balance - value);
        self.balances.insert(to, self.balances.get(to) + value);
        
        evm::log(Transfer {
            from,
            to,
            value,
        });
        Ok(true)
    }
}
#[public]
impl<T: FoodScanTokenParams> FoodScanToken<T> {
    pub fn name() -> String {
        T::NAME.into()
    }

    pub fn symbol() -> String {
        T::SYMBOL.into()
    }

    pub fn decimals() -> u8 {
        T::DECIMALS
    }

    pub fn total_supply(&self) -> U256 {
        self.total_supply.get()
    }

    pub fn balance_of(&self, account: Address) -> U256 {
        self.balances.get(account)
    }

    pub fn transfer(&mut self, to: Address, amount: U256) -> Result<bool, Vec<u8>> {
        self._transfer(msg::sender(), to, amount)
    }

    pub fn allowance(&self, owner: Address, spender: Address) -> U256 {
        self.allowances.get(owner).get(spender)
    }

    pub fn approve(&mut self, spender: Address, amount: U256) -> Result<bool, Vec<u8>> {
        self.allowances.setter(msg::sender()).insert(spender, amount);
        evm::log(Approval {
            owner: msg::sender(),
            spender,
            value: amount,
        });
        Ok(true)
    }

    pub fn transfer_from(
        &mut self,
        from: Address,
        to: Address,
        amount: U256,
    ) -> Result<bool, Vec<u8>> {
        let current_allowance = self.allowances.get(from).get(msg::sender());
        if current_allowance < amount {
            return Err(FoodScanTokenError::InsufficientAllowance(InsufficientAllowance {
                owner: from,
                spender: msg::sender(),
                have: current_allowance,
                want: amount,
            }).into());
        }
        
        self.allowances.setter(from).insert(msg::sender(), current_allowance - amount);
        self._transfer(from, to, amount)
    }

    pub fn claim_from_faucet(&mut self) -> Result<bool, Vec<u8>> {
        let claimer = msg::sender();
        let last_claim_time = self.last_claim.get(claimer);
        let current_time = U256::from(block::timestamp());
        
        if current_time < last_claim_time + CLAIM_COOLDOWN {
            return Err(FoodScanTokenError::CooldownNotExpired(CooldownNotExpired {
                user: claimer,
                lastClaim: last_claim_time,
                currentTime: current_time,
            }).into());
        }

        self.last_claim.insert(claimer, current_time);
        self._mint(claimer, CLAIM_AMOUNT)
    }

    pub fn can_claim_from_faucet(&self, account: Address) -> bool {
        let last_claim_time = self.last_claim.get(account);
        let current_time = U256::from(block::timestamp());
        current_time >= last_claim_time + CLAIM_COOLDOWN
    }

    /// Mints new tokens and assigns them to the specified account
    pub fn mint(&mut self, account: Address, amount: U256) -> Result<bool, FoodScanTokenError> {
        self._mint(account, amount).map_err(|_| FoodScanTokenError::InsufficientBalance(
            InsufficientBalance { 
                from: Address::ZERO, 
                have: U256::ZERO, 
                want: amount 
            }
        ))
    }
}

impl<T: FoodScanTokenParams> FoodScanToken<T> {
    fn _mint(&mut self, account: Address, amount: U256) -> Result<bool, Vec<u8>> {
        if account == Address::ZERO {
            return Err(FoodScanTokenError::InsufficientBalance(InsufficientBalance {
                from: account,
                have: U256::ZERO,
                want: amount,
            }).into());
        }
        
        let new_total_supply = self.total_supply.get() + amount;
        self.total_supply.set(new_total_supply);
        self.balances.insert(account, self.balances.get(account) + amount);
        
        evm::log(Transfer {
            from: Address::ZERO,
            to: account,
            value: amount,
        });
        Ok(true)
    }
}
