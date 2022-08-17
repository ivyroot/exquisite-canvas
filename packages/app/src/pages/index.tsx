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
      <div className="h-36 bg-white">
        <div className="flex justify-center mt-8">
          <a
            href="https://twitter.com/ivyrootcode"
            className="mx-4"
            target="_none"
          >
            <img src="/twitter-logo-blue.png" width="60px"></img>
          </a>
          <a
            href="https://github.com/ivyroot/exquisite-canvas"
            className="mx-4"
            target="_none"
          >
            <img src="/github-3.svg" width="60px"></img>
          </a>
          <a href="https://twitter.com/xqstgfx" className="mx-4" target="_none">
            <img
              src="/xqst-gfx.jpeg"
              className="rounded-full"
              width="60px"
            ></img>
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
