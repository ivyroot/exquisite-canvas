import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";

import { useExampleNFTContractRead } from "../contracts";
import { Inventory } from "../Inventory";
import { MintButton } from "../MintButton";
import { useIsMounted } from "../useIsMounted";

const AboutPage: NextPage = () => {
  const isMounted = useIsMounted();

  return (
    <div>
      <div>About the canvas</div>
      <div className="h-36 bg-white"></div>
    </div>
  );
};

export default AboutPage;
