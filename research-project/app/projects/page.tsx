import React from "react";
import { ProjectTable } from "@/components/ProjectTable";
import { Divider } from "@nextui-org/divider";
import { auth, currentUser } from "@clerk/nextjs";
import { title } from "@/components/primitives";
//import { Button } from "@nextui-org/button";

export default function ProjectsPage() {
  const { userId } = auth();

  return (
    <>
      <div className="flex justify-center items-center w-full">
        <h1 className={title()}>Current and past projects.</h1>
        {/* <div className="ml-auto mt-4">
          {userId ? (
            <Button size="sm" radius="lg" color="primary" variant="ghost">
              Admin
            </Button>
          ) : null}
        </div> */}
      </div>
      <Divider className="my-4 w-full" />
      <ProjectTable />
    </>
  );
}
