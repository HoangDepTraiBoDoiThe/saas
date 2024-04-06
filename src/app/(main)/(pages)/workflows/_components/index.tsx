import React from "react";
import Workflow from "./workFlow";

type Props = {};

const Workflows = async (props: Props) => {
  return (
    <div className="relative flex flex-col gap-4">
      <section className="flex flex-col m-2">
        <Workflow name="Work flow" description="Test" id="123" publish />
      </section>
    </div>
  );
};

export default Workflows;
