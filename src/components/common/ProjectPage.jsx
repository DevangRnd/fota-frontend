import "../../backgroundAnimation.css";
import {
  Button,
  Flex,
  Text,
  Input,
  Card,
  Box,
  Spinner,
} from "@chakra-ui/react";
import useProjectStore from "../../store/projectStore";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { Field } from "../ui/field";

import {
  DialogBody,
  DialogActionTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  DialogCloseTrigger,
} from "../ui/dialog";
import { PlusCircle } from "lucide-react";
const ProjectPage = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const ref = useRef(null);

  const { allProjects, fetchProjects, addProject, btnLoading, isLoading } =
    useProjectStore();

  const [newProjectName, setNewProjectName] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleAddProject = async () => {
    await addProject(newProjectName);
    await fetchProjects();
    setDialogOpen(false);
  };
  if (isLoading) {
    return (
      <Box h={"100dvh"} display={"grid"} placeItems={"center"}>
        <Spinner size={"xl"} />
      </Box>
    );
  }
  return (
    <Box position="relative" overflow="hidden">
      <div className="area">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <Flex
        h={"100dvh"}
        w={"80%"}
        mx={"auto"}
        flexDirection={"column"}
        py={10}
        gap={5}
      >
        <DialogRoot
          open={dialogOpen}
          onOpenChange={(e) => setDialogOpen(e.open)}
          initialFocusEl={() => ref.current}
        >
          <DialogTrigger asChild>
            <Button variant="surface" colorPalette={"blue"}>
              Add Project <PlusCircle />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Project</DialogTitle>
            </DialogHeader>
            <DialogBody pb="4">
              <Field label="Project Name">
                <Input
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  ref={ref}
                  placeholder="Project Name Here.."
                />
              </Field>
            </DialogBody>
            <DialogFooter>
              <DialogActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </DialogActionTrigger>
              {btnLoading ? (
                <Button disabled>
                  <Spinner /> Adding Project
                </Button>
              ) : (
                <>
                  <Button
                    variant={"subtle"}
                    colorPalette={"blue"}
                    onClick={handleAddProject}
                  >
                    Add
                  </Button>
                </>
              )}
            </DialogFooter>
            <DialogCloseTrigger />
          </DialogContent>
        </DialogRoot>
        {allProjects.length === 0 ? (
          <Text>No Projects Here..</Text>
        ) : (
          <Flex flexDirection={"column"} gap={7}>
            <Text fontSize={"3xl"} fontWeight={"bold"}>
              All Projects
            </Text>

            <Box
              display={"grid"}
              gap={10}
              gridTemplateColumns={"repeat(3,1fr)"}
            >
              {allProjects.map((project) => (
                <Card.Root
                  colorPalette={"blue"}
                  variant={"outline"}
                  key={project._id}
                  size={"lg"}
                >
                  <Card.Body gap={2}>
                    <Card.Title
                      display={"flex"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      {project.name}
                    </Card.Title>
                  </Card.Body>
                  <Card.Footer>
                    <Button variant={"surface"} asChild size={"sm"}>
                      <Link
                        to={`/${project._id}/all-vendors`}
                        state={{ projectName: project.name }}
                      >
                        Go To Project
                      </Link>
                    </Button>
                  </Card.Footer>
                </Card.Root>
              ))}
            </Box>
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

export default ProjectPage;
