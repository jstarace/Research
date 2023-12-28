import React from "react";
import { ProjectTable } from "@/components/projectTable";
import { Divider } from "@nextui-org/divider";
import { auth, currentUser } from "@clerk/nextjs";
import { title } from "@/components/primitives";

export default function ProjectsPage() {
  const { userId } = auth();

  return (
    <>
      <div className="flex justify-center items-center w-full">
        <h1 className={title()}>Current and past projects.</h1>
      </div>
      <Divider className="my-4 w-full" />
      <ProjectTable />
    </>
  );
}
