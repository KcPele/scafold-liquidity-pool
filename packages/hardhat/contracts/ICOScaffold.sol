//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;
import "./Scaffold.sol";
contract ICOScaffold {
	address admin;
	Scaffold public tokenContract;
	uint256 public tokenPrice;
	uint256 public tokensSold;

	event Sell(address _buyer, uint256 _amount);

	constructor(Scaffold _tokenContract, uint256 _tokenPrice) {
		admin = msg.sender;
		tokenContract = _tokenContract;
		tokenPrice = _tokenPrice;
	}

	function multiply(uint x, uint y) internal pure returns (uint z) {
		require(y == 0 || (z = x * y) / y == x);
	}

	function buyTokens(uint256 _numberOfTokens) public payable {
		require(
			msg.value >= multiply(_numberOfTokens, tokenPrice),
			"value sent must be greater than or equal to the token bought"
		);
		require(
			tokenContract.balanceOf(address(this)) >= _numberOfTokens,
			"token contract balance not enough"
		);
		require(
			tokenContract.transfer(msg.sender, _numberOfTokens),
			"transfer not successfull"
		);

		tokensSold += _numberOfTokens;

		emit Sell(msg.sender, _numberOfTokens);
	}
	function endSale() public {
		require(msg.sender == admin);
		require(
			tokenContract.transfer(
				admin,
				tokenContract.balanceOf(address(this))
			)
		);

		// Just transfer the balance to the admin
		payable(admin).transfer(address(this).balance);
	}
}
