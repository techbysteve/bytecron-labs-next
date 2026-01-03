"use client";

import Giscus from "@giscus/react";

export default function GiscusComponent() {
  return (
    <Giscus
      id="comments"
      repo="techbysteve/bytecron-labs-next"
      repoId="R_kgDOP8JXTA"
      category="Announcements"
      categoryId="DIC_kwDOP8JXTM4C0hAH"
      mapping="title"
      term="Welcome to bytecron labs!"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="dark"
      lang="en"
      loading="lazy"
    />
  );
}
