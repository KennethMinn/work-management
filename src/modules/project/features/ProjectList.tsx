import { Box } from "@mantine/core";
import DataTable from "../../../components/DataTable";
import { useProjectColumns } from "../hooks/useProjectColumns";
import { useGetAllProjects } from "../hooks/useGetAllProjects";
import EmployeeCreateForm from "../components/ProjectCreateForm";

const ProjectList = () => {
  const columns = useProjectColumns();
  const { data: projects, isLoading } = useGetAllProjects();

  //if (isLoading) return <Text>Loading...</Text>;

  return (
    <Box>
      <EmployeeCreateForm />
      {isLoading ? (
        <div>table</div>
      ) : (
        <DataTable columns={columns} data={projects} />
      )}
    </Box>
  );
};

export default ProjectList;
