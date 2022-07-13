import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";

import { Clock } from "../Clock";
import { useExampleNFTContractRead } from "../contracts";
import { Inventory } from "../Inventory";
import { MintButton } from "../MintButton";
import { PaletteSizer } from "../PaletteSizer";
import { useIsMounted } from "../useIsMounted";
import { Widget } from "../Widget";

const HomePage: NextPage = () => {
  const isMounted = useIsMounted();

  return (
    <div className="min-h-screen flex flex-col">
      <div className="p-2">
        <PaletteSizer />
      </div>
      <div>
        <Widget name="yes"></Widget>
      </div>
      <div className="flex-grow flex flex-col gap-4 items-center justify-center p-8 pb-[50vh]">
        <h1 className="text-4xl">px grid</h1>
        <p>text goes here</p>
      </div>
    </div>
  );
};

export default HomePage;
