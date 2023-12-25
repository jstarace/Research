import { getXataClient } from "@/src/xata";
const xata = getXataClient();

export const refreshAccess = async (prop: string) => {
  try {
    const aLResults = await xata.search.all(prop, {
      tables: [
        {
          table: "project_members",
          target: ["user_c_id"],
        },
      ],
    });
    if (aLResults)
      try {
        const projResults = await xata.db.project_name.select(["id"]).getAll();
        if (projResults) {
          const missingProjects: string[] = [];
          projResults.forEach((project) => {
            if (
              !aLResults.records.some(
                (record) => record.record.project_x_id === project.id
              )
            ) {
              // Take action if project.id does not exist in aLResults.records
              missingProjects.push(project.id);
            }
          });
          // how do I loop through missingProjects in an async function?
          missingProjects.forEach(async (project) => {
            try {
              const newRecord = await xata.db.project_members.create({
                project_x_id: project,
                user_c_id: prop,
              });
            } catch (error) {
              console.log(error);
              throw new Error("Error adding access for user");
            }
          });
        }
      } catch (error) {
        console.log(error);
        throw new Error("Error fetching projects");
      }
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching accessLists");
  }
};
