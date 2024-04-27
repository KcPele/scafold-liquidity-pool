import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import Link from "next/link";
import { RainbowKitCustomConnectButton } from "../scaffold-eth";
import { useAccount } from "wagmi";

const Header = ({
  setOpenAddPool,
  setOpenAllLiquidity,
}: {
  setOpenAddPool: Dispatch<SetStateAction<boolean>>;
  setOpenAllLiquidity: Dispatch<SetStateAction<boolean>>;
}) => {
  const { address } = useAccount();
  return (
    <header className="header " id="site-header">
      <div className="container">
        <div className="header-content-wrapper">
          <Link href="/">
            <Image src="/thumbnail.jpg" alt="header" width="50" height="50" />
          </Link>
          <nav id="primary-menu" className="primary-menu">
            <ul className="primary-menu-menu">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li className="menu-item-has-children" onClick={() => setOpenAddPool(true)}>
                <Link href="">Add Pool</Link>
              </li>
              <li className="menu-item-has-children" onClick={() => setOpenAllLiquidity(true)}>
                <Link href="">Add Liquidity</Link>
              </li>
              <li className="menu-item-has-children">
                <Link href="">Coin market</Link>
              </li>
              <li>
                <Link href="#tokenBuy">Buy Scaffold token</Link>
              </li>
              {address ? (
                <li>
                  {/* <Address address={address} />{" "} */}
                  <RainbowKitCustomConnectButton />
                </li>
              ) : (
                <li>
                  <RainbowKitCustomConnectButton />
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
