#![cfg_attr(not(feature = "export-abi"), no_main)]
extern crate alloc;

pub mod token;

use alloy_primitives::U256;
use stylus_sdk::{msg, prelude::*};
use token::{FoodScanToken, FoodScanTokenError, FoodScanTokenParams};

pub struct TokenParams;

impl FoodScanTokenParams for TokenParams {
    const NAME: &'static str = "FoodScan Token";
    const SYMBOL: &'static str = "FOOD";
    const DECIMALS: u8 = 18;
}

sol_storage! {
    #[entrypoint]
    pub struct TokenContract {
        #[borrow]
        FoodScanToken<TokenParams> token;
    }
}

#[public]
#[inherit(FoodScanToken<TokenParams>)]
impl TokenContract {
    /// Mints tokens
    pub fn mint(&mut self, value: U256) -> Result<(), FoodScanTokenError> {
        self.token.mint(msg::sender(), value)?;
        Ok(())
    }
}
