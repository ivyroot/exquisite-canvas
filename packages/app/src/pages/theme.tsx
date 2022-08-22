import type { NextPage } from "next";

import { CanvasLogo } from "../CanvasLogo";
import { CanvasSkin } from "../CanvasSkin";

const ThemePage: NextPage = () => {
  const itemNames = [
    "dropper",
    "dropper-active",
    "move-up",
    "move-down",
    "move-left",
    "move-right",
  ];

  const themeItems = itemNames.map((i) => {
    return (
      <div className="m-8">
        <div className="my-4">{i}:</div>
        <CanvasSkin item={i}></CanvasSkin>
      </div>
    );
  });

  return (
    <div className="bg-slate-800 text-blue-600">
      <div id="headerNav" className="flex flex-wrap justify-left">
        <div className="ml-6 my-2 w-20 sm:w-28">
          <a href="/">
            <CanvasLogo></CanvasLogo>
          </a>
        </div>
      </div>
      <h1 className="text-center text-2xl py-12">
        Exquisite Canvas Theme: Default
      </h1>
      <div className="flex flex-wrap items-center justify-center">
        <div className="w-20 sm:w-28">
          <div className="my-4">logo:</div>
          <CanvasLogo></CanvasLogo>
        </div>
        {themeItems}
      </div>
      <div className="h-screen bg-slate-800">
        <div className="flex justify-center mt-8">
          By
          <a
            href="https://twitter.com/michaelbelong"
            className="mx-1"
            target="_none"
          >
            @michaelbelong aka Mendicant Bias
          </a>
        </div>
      </div>
    </div>
  );
};

export default ThemePage;
