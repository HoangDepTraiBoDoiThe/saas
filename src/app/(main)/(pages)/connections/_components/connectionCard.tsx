import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Connection, ConnectionTypes } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  cardObj: Connection;
  className?: string;
};

const ConnectionCard = (props: Props) => {
  const {
    title,
    image,
    connectionKey,
    description,
    slackSpecial,
    alwaysTrue,
    accessTokenKey,
  } = props.cardObj;

  return (
    <div className={`${props.className} `}>
      <Card className="w-full flex items-center justify-between">
        <CardHeader className="flex flex-col gap-4">
          <Image src={image} width={30} height={30} alt={title} />
          <div>
            <CardTitle className="text-xl font-semibold">
              {title || ""}
            </CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </CardHeader>
        <div className="p-6">
          <Button>
            <Link
              href={
                title === "Slack"
                  ? process.env.NEXT_PUBLIC_NOTION_REDIRECT_URL || ""
                  : title === "Notion"
                  ? process.env.NEXT_PUBLIC_SLACK_REDIRECT_URL || ""
                  : title === "Discord"
                  ? process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URL || ""
                  : process.env.NEXT_PUBLIC_GOOGLE_DRIVE_REDIRECT_URL || ""
              }
            >
              Connect
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ConnectionCard;
