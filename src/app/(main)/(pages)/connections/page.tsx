import { CONNECTIONS } from "@/lib/constant";
import React from "react";
import ConnectionCard from "./_components/connectionCard";

type Props = { [key: string]: string | undefined };

const page = (props: Props) => {
  return (
    <div className="flex flex-col gap-4 relative">
      <h1 className="text-4xl sticky top-0 z-[10] p-6 bg-background/50 backdrop-blur-lg flex items-center border-b">
        Connections
      </h1>
      <div className="p-6 relative flex flex-col gap-4">
        <section className="flex flex-col gap-4 text-muted-foreground">
          Connect all your apps directly from here. You may need to connect
          these apps regularly to refresh verification.
        </section>
        <div className="grid lg:grid-cols-2 gap-2">
          {CONNECTIONS.map((connection, index) => (
            <ConnectionCard className="" key={index} cardObj={connection} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
