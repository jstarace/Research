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
import { fetchAccessLists } from "@/app/lib/accessLists";
import { refreshAccess } from "@/app/lib/refreshAccess";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  //Link,
  Image,
} from "@nextui-org/react";
import React from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@nextui-org/button";
import Link from "next/link";

type Project = {
  description?: string | null | undefined;
  end_date?: Date | null | undefined;
  id?: String | null | undefined;
  name?: String | null | undefined;
  project_id?: Number | null | undefined;
  start_date?: Date | null | undefined;
  status?: String | null | undefined;
  adminPages?: Boolean | null | undefined;
  xata?: {
    createdAt?: Date | null | undefined;
    updatedAt?: Date | null | undefined;
    version?: Number | null | undefined;
  };
}[];

type AccessList = {
  approved?: Boolean | null | undefined;
  id?: String | null | undefined;
  project_x_id?: String | null | undefined;
  user_c_id?: String | null | undefined;
  xata?: {
    createdAt?: Date | null | undefined;
    updatedAt?: Date | null | undefined;
    version?: Number | null | undefined;
  };
}[];

export function ProjectTable() {
  const [project, setProject] = useState<Project | null>(null);
  const [accessList, setAccessList] = useState<AccessList | null>(null);
  const { user, isLoaded } = useUser();

  const theAccessLists = async () => {
    let accessList: AccessList;
    fetchAccessLists()
      .then((data) => {
        accessList = data;
        if (accessList) setAccessList(accessList);
      })
      .catch((error) => {
        console.error("Failed to fetch access lists:", error);
      });
  };
  useEffect(() => {
    theAccessLists();
  }, []);

  const theProjects = async () => {
    let project: Project;
    fetchProjects()
      .then((data) => {
        //project = JSON.parse(data);
        project = data;
        if (project) setProject(project);
      })
      .catch((error) => {
        console.error("Failed to fetch projects:", error);
      });
  };

  const clerkId = async () => {};

  useEffect(() => {
    theProjects();
  }, []);

  useEffect(() => {
    if (user) {
      refreshAccess(user.id);
    }
  }, [user]);

  if (project) {
    return (
      <>
        <Table
          onRowAction={(key) => console.log(key)}
          color="primary"
          selectionMode="single"
          defaultSelectedKeys={[-1]}
          aria-label="A table of projects I've worked on or am working on"
        >
          <TableHeader>
            <TableColumn>NAME</TableColumn>
            <TableColumn>DESCRIPTION</TableColumn>
            <TableColumn>STATUS</TableColumn>
            <TableColumn>START DATE</TableColumn>
            <TableColumn>{""}</TableColumn>
          </TableHeader>
          <TableBody>
            {project.map((project) => (
              <TableRow key={project.id?.toString()}>
                <TableCell>{project.name}</TableCell>
                <TableCell>{project.description}</TableCell>
                <TableCell>{project.status}</TableCell>
                <TableCell>
                  {new Date(
                    project.start_date ?? "10/07/1979"
                  ).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {isLoaded &&
                  project.adminPages &&
                  user &&
                  accessList &&
                  accessList.some(
                    (access) =>
                      access.project_x_id === project.id &&
                      access.user_c_id === user.id
                  ) ? (
                    <Link
                      href={`../projects/admin/${project.id}`}
                      prefetch={false}
                    >
                      <Button
                        size="sm"
                        radius="lg"
                        color="primary"
                        variant="ghost"
                      >
                        Admin
                      </Button>
                    </Link>
                  ) : (
                    ""
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </>
    );
  }

  return (
    <>
      <Table aria-label="Example empty table">
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>DESCRIPTION</TableColumn>
          <TableColumn>STATUS</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"Loading Projects"}>{[]}</TableBody>
      </Table>
    </>
  );
}
