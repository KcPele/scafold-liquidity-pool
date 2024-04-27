//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract Scaffold {
	string public name = "Scaffold";
	string public symbol = "SFD";
	string public standard = "Scaffold v.0.1";
	uint256 public totalSupply;
	address public ownerOfContract;
	uint256 public _userId;

	address[] public holderToken;

	event Transfer(address indexed _from, address indexed _to, uint256 _value);
	event Approval(
		address indexed _owner,
		address indexed _spender,
		uint256 _value
	);

	mapping(address => TokenHolderInfo) public tokenHolderInfos;
	struct TokenHolderInfo {
		uint256 _tokenId;
		address _from;
		address _to;
		uint256 _totalToken;
		bool _tokenHolder;
	}
	mapping(address => uint256) public balanceOf;
	mapping(address => mapping(address => uint256)) public allowance;

	constructor(uint256 _initialSupply) {
		ownerOfContract = msg.sender;
		balanceOf[msg.sender] = _initialSupply;
		totalSupply = _initialSupply;
	}

	function inc() internal {
		_userId++;
	}

	function transfer(
		address _to,
		uint256 _value
	) public returns (bool success) {
		require(
			balanceOf[msg.sender] >= _value,
			"value must be less than balance"
		);
		inc();
		balanceOf[msg.sender] -= _value;
		balanceOf[_to] += _value;
		TokenHolderInfo storage tokenHolderInfo = tokenHolderInfos[_to];
		tokenHolderInfo._from = msg.sender;
		tokenHolderInfo._to = _to;
		tokenHolderInfo._totalToken = _value;
		tokenHolderInfo._tokenHolder = true;
		tokenHolderInfo._tokenId = _userId;
		holderToken.push(_to);
		emit Transfer(msg.sender, _to, _value);

		return true;
	}

	function approve(
		address _spender,
		uint256 _value
	) public returns (bool success) {
		allowance[msg.sender][_spender] = _value;

		emit Approval(msg.sender, _spender, _value);
		return true;
	}

	function transferFrom(
		address _from,
		address _to,
		uint256 _value
	) public returns (bool success) {
		require(_value <= balanceOf[_from], "value must be less than balance");
		require(
			_value <= allowance[_from][msg.sender],
			"value must be less than allowed balance"
		);

		balanceOf[_from] -= _value;
		balanceOf[_to] += _value;
		allowance[_from][msg.sender] -= _value;

		emit Transfer(_from, _to, _value);
		return true;
	}

	function getTokenHolderData(
		address _holder
	) public view returns (TokenHolderInfo memory) {
		return tokenHolderInfos[_holder];
	}

	function getTokenHolder() public view returns (address[] memory) {
		return holderToken;
	}
}
