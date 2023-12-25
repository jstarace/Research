import { getXataClient } from "@/src/xata";
const xata = getXataClient();

// export async function getServerSideProps() {
//   const accessList = await xata.db.project_members.getMany();
//   console.log(accessList);

//   return {
//     props: { accessList }, // will be passed to the page component as props
//   };
// }

export const fetchAccessLists = async () => {
  try {
    const accessLists = await xata.db.project_members
      .filter({ approved: true })
      .getAll();
    return accessLists;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching accessLists");
  }
};
