"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { useEffect, useState } from "react";
import { fetchProjects } from "@/app/lib/data";

type Project = {
  description?: string | null | undefined;
  end_date?: Date | null | undefined;
  id?: String | null | undefined;
  name?: String | null | undefined;
  project_id?: Number | null | undefined;
  start_date?: Date | null | undefined;
  status?: String | null | undefined;
  xata?: {
    createdAt?: Date | null | undefined;
    updatedAt?: Date | null | undefined;
    version?: Number | null | undefined;
  };
}[];

export function ProjectTable() {
  const [project, setProject] = useState<Project | null>(null);
  const theProjects = async () => {
    let project: Project;
    fetchProjects()
      .then((data) => {
        //project = JSON.parse(data);
        project = data;
        if (project) setProject(project);
        console.log(project);
      })
      .catch((error) => {
        console.error("Failed to fetch projects:", error);
      });
  };
  useEffect(() => {
    theProjects();
  }, []);

  if (project) {
    return (
      <>
        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>NAME</TableColumn>
            <TableColumn>DESCRIPTION</TableColumn>
            <TableColumn>STATUS</TableColumn>
          </TableHeader>
          <TableBody>
            {project.map((project) => (
              <TableRow key={project.id?.toString()}>
                <TableCell>{project.name}</TableCell>
                <TableCell>{project.description}</TableCell>
                <TableCell>{project.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </>
    );
  }

  return (
    <>
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>ROLE</TableColumn>
          <TableColumn>STATUS</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell>Tony Reichert</TableCell>
            <TableCell>CEO</TableCell>
            <TableCell>Active</TableCell>
          </TableRow>
          <TableRow key="2">
            <TableCell>Zoey Lang</TableCell>
            <TableCell>Technical Lead</TableCell>
            <TableCell>Paused</TableCell>
          </TableRow>
          <TableRow key="3">
            <TableCell>Jane Fisher</TableCell>
            <TableCell>Senior Developer</TableCell>
            <TableCell>Active</TableCell>
          </TableRow>
          <TableRow key="4">
            <TableCell>William Howard</TableCell>
            <TableCell>Community Manager</TableCell>
            <TableCell>Vacation</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}
