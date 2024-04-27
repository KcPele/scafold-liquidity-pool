import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Address } from "../scaffold-eth";
import { useLiquidityContext } from "~~/hooks/liquidity/useLiquidityContext";
import { ILiquidity } from "~~/types/utils";

const LiquidityHistory = () => {
  const { GET_ALL_LIQUIDITY } = useLiquidityContext();
  const [liquidity, setLiquidity] = useState<ILiquidity[]>([]);
  useEffect(() => {
    const loadLiquidity = async () => {
      try {
        const liquidities = await GET_ALL_LIQUIDITY();
        console.log(liquidities);
        if (liquidities) {
          setLiquidity(liquidities);
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadLiquidity();
  }, []);
  return (
    <section>
      <div className="container">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="mCustomScrollbar scrollable-responsive-table overflow-y" data-mcs-theme="dark">
            <table className="pricing-tables-wrap-table-blurring">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Token A</th>
                  <th>Token B</th>
                  <th>Address A</th>
                  <th>Address B</th>
                  <th>Pool Address</th>
                  <th>Created </th>
                  <th>Transaction Hash</th>
                </tr>
              </thead>
              <tbody>
                {liquidity.map((item: any, index: number) => (
                  <tr
                    className="crumina-module crumina-pricing-table 
                    pricing-table--style-table-blurring c-brown"
                    key={index}
                  >
                    <td>{index + 1}</td>
                    <td>
                      <div className="pricing-thumb">
                        <Image
                          src={item.network === "80001" ? "/img/80001.png" : "/img/1.png"}
                          alt="chain logo"
                          width={50}
                          height={50}
                          className="woox-icon"
                        />
                        <h6 className="pricing-table">
                          {item.tokenA}
                          <span>{item.network === "80001" ? "Mumbia" : "Eth"}</span>
                        </h6>
                      </div>
                    </td>
                    <td>
                      <div className="currency-details-item">
                        <div className="value">{item.tokenB}</div>
                      </div>
                    </td>
                    <td>
                      <div className="currency-details-item">
                        <div className="value c-primary">
                          <Address address={item.tokenA_Address} />
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="currency-details-item">
                        <div className={`value ${index % 2 === 0 ? "c-green-success" : "c-red-light"}`}>
                          <Address address={item.tokenB_Address} />
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="currency-details-item">
                        <div className="value ">
                          <Address address={item.poolAddress} />
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="currency-details-item">
                        <div className="value ">{new Date(item.timeCreated * 1000).toDateString()}</div>
                      </div>
                    </td>
                    <td>
                      <Link
                        href={`${
                          item.network === "80001" ? "https://mumbai.polygonscan.com/tx" : "https://etherscan.io/tx"
                        }/${item.transactionHash}`}
                        target="_blank"
                        className="
                        btn btn--small btn--green-light"
                      >
                        Hash
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={8}>
                    Explore our liquidity marketplace with ease using our intuitive interface. Our table layout neatly
                    organizes essential information about each liquidity pool, including token pairs, addresses,
                    creation timestamps, and transaction hashes. With this transparent and accessible overview, you can
                    confidently navigate and participate in decentralized finance like never before
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiquidityHistory;
