"use client";

import { useEffect } from "react";
import { title } from "@/components/primitives";

export default function ReviewPaperAdminPage() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cse.google.com/cse.js?cx=51bc2f4d283784e3a";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cse.google.com/cse.js?cx=51bc2f4d283784e3a";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <div>
        <h1 className={title()}>Review Paper</h1>
      </div>
      <div className="gcse-search">
        <div className="gcse-search"></div>
      </div>
    </>
  );
}
