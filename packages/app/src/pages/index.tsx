import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";

import { useExampleNFTContractRead } from "../contracts";
import { DemoCanvas } from "../DemoCanvas";
import { Inventory } from "../Inventory";
import { MintButton } from "../MintButton";
import { useIsMounted } from "../useIsMounted";

const HomePage: NextPage = () => {
  const isMounted = useIsMounted();

  return (
    <div>
      <DemoCanvas />
      <div className="h-36 bg-white"></div>
    </div>
  );
};

export default HomePage;
