import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";

import { useExampleNFTContractRead } from "../contracts";
import { ExquisiteCanvas } from "../ExquisiteCanvas";
import { Inventory } from "../Inventory";
import { MintButton } from "../MintButton";
import { useIsMounted } from "../useIsMounted";

const AboutPage: NextPage = () => {
  const isMounted = useIsMounted();

  return (
    <div>
      <ExquisiteCanvas />
      <div className="h-36 bg-white"></div>
    </div>
  );
};

export default AboutPage;
