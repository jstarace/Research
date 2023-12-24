import React from "react";
import { ProjectTable } from "@/components/ProjectTable";
// import { getXataClient } from "../../src/xata";
import { Divider } from "@nextui-org/divider";
import { auth, currentUser } from "@clerk/nextjs";
import { title } from "@/components/primitives";
import { Button } from "@nextui-org/button";

export default function ProjectsPage() {
  const { userId } = auth();
  return (
    <>
      <div className="flex justify-center items-center w-full">
        <h1 className={title()}>Current and past projects.</h1>
        <div className="ml-auto mt-4">
          {userId ? (
            <Button size="sm" radius="lg" color="primary" variant="ghost">
              Admin
            </Button>
          ) : null}
        </div>
      </div>
      <Divider className="my-4 w-full" />
      <ProjectTable />
    </>
  );
}

// export default async function ProjectsPage() {
//   const xataClient = getXataClient();
//   const projects = await xataClient.db.project_name.getMany();
//   const { userId } = auth();

//   return (
//     <>

/* <div className="flex justify-center items-center w-full">
<h1 className={title()}>Current and past projects.</h1>
<div className="ml-auto">
  {userId ? (
    <Button size="sm" radius="lg" color="primary" variant="ghost">
      Admin
    </Button>
  ) : null}
</div>
</div> */

//       <Divider className="my-4 w-full" />

//       <div className="flex justify-between">
//         <div>
//           <ul>
//             {projects.map((project) => (
//               <li className="mb-10" key={project.id}>
//                 {project.name}
//               </li>
//             ))}
//           </ul>
//         </div>
//         <Divider orientation="vertical" className="mx-4" />
//         <div>
//           <ul>
//             {projects.map((projects) => (
//               <li className="mb-10" key={projects.id}>
//                 {projects.description}
//               </li>
//             ))}
//           </ul>
//         </div>
//         <Divider orientation="vertical" className="mx-4" />
//         <div>
//           <ul>
//             {projects.map((projects) => (
//               <li className="mb-10" key={projects.id}>
//                 {String(projects.start_date)}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </>
//   );
// }
