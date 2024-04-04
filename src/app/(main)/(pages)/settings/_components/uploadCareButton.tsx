"use client";
import React, { useEffect, useRef, useState } from "react";
import * as LR from "@uploadcare/blocks";
import { PACKAGE_VERSION } from "@uploadcare/blocks";
import { useRouter } from "next/navigation";

LR.registerBlocks(LR);

type Props = {
  onUpload?: any;
};

const UploadCareButton = ({ onUpload }: Props) => {
  const router = useRouter();
  const [files, setFiles] = useState([]);
  const ctxProviderRef = useRef<
    typeof LR.UploadCtxProvider.prototype & LR.UploadCtxProvider
  >(null);

  useEffect(() => {
    const handleUpLoad = async (e: any) => {
      const file = onUpload(e.detail.cdnUrl);
      if (file) {
        router.refresh();
      }
    };

    ctxProviderRef.current.addEventListener(
      "file-upload-success",
      handleUpLoad
    );
  }, []);

  return (
    <div>
      <lr-config ctx-name="my-uploader" pubkey="5e6ccf308ecec9090ad1" />

      <lr-file-uploader-regular
        ctx-name="my-uploader"
        css-src={`https://cdn.jsdelivr.net/npm/@uploadcare/blocks@${PACKAGE_VERSION}/web/lr-file-uploader-regular.min.css`}
      />

      <lr-upload-ctx-provider ctx-name="my-uploader" ref={ctxProviderRef} />
    </div>
  );
};

export default UploadCareButton;
