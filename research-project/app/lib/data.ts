import { getXataClient } from "../../src/xata";

const xata = getXataClient();

export const fetchProjects = async () => {
  try {
    const projects = await xata.db.project_name.getAll();
    return projects;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching projects");
  }
};
