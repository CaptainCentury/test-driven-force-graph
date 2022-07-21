import React from "react";
import { ToggleList } from "./components/toggle-list";

export const ToggleListDemo = () => {
  return (
    <>
      <h1>ToggleList example</h1>
      <ToggleList items={["a", "b", "c"]} />
    </>
  );
};
