// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GMNFT is ERC721Enumerable, Ownable {
    uint256 public nextTokenId;

    string public baseURI;

    mapping(address => bool) hasMinted;

    constructor(
        string memory _baseURI
    ) Ownable(msg.sender) ERC721("GM GM", "GM") {
        baseURI = _baseURI;
    }

    function mintGM() external {
        require(!hasMinted[msg.sender], "Already minted GM");

        uint256 tokenId = nextTokenId++;
        _safeMint(msg.sender, tokenId);

        hasMinted[msg.sender] = true;
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        require(tokenId < nextTokenId, "Nonexistent token");

        return string(abi.encodePacked(baseURI, "/", "gm", ".json"));
    }

    function setBaseURI(string memory newBaseURI) external onlyOwner {
        baseURI = newBaseURI;
    }
}
