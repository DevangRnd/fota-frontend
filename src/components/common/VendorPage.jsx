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
import useVendorStore from "../../store/vendorStore";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  DialogBody,
  DialogActionTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { PlusCircle } from "lucide-react";
import { Field } from "../ui/field";
const VendorPage = () => {
  const { fetchVendors, allVendors, btnLoading, addVendor, isLoading } =
    useVendorStore();
  const { projectId } = useParams();

  const ref = useRef();
  useEffect(() => {
    fetchVendors(projectId);
  }, []);
  const location = useLocation();

  const [newVendorName, setNewVendorName] = useState("");
  const handleAddVendor = async () => {
    await addVendor(newVendorName, projectId);
    await fetchVendors(projectId);
    setNewVendorName("");
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
        <DialogRoot initialFocusEl={() => ref.current}>
          <DialogTrigger asChild>
            <Button variant="surface" colorPalette={"blue"}>
              Add Vendor <PlusCircle />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Vendor</DialogTitle>
            </DialogHeader>
            <DialogBody pb="4">
              <Field label="Project Name">
                <Input
                  value={newVendorName}
                  onChange={(e) => setNewVendorName(e.target.value)}
                  ref={ref}
                  placeholder="Vendor Name Here.."
                />
              </Field>
            </DialogBody>
            <DialogFooter>
              <DialogActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </DialogActionTrigger>
              {btnLoading ? (
                <Button disabled>
                  <Spinner /> Adding Vendor
                </Button>
              ) : (
                <>
                  <Button
                    variant={"subtle"}
                    colorPalette={"green"}
                    onClick={handleAddVendor}
                  >
                    Add Vendor
                  </Button>
                </>
              )}
            </DialogFooter>
          </DialogContent>
        </DialogRoot>
        {allVendors.length === 0 ? (
          <Text textAlign={"center"} fontSize={"4xl"} fontWeight={"bold"}>
            No Vendors Here..
          </Text>
        ) : (
          <Flex flexDirection={"column"} gap={7}>
            <Text fontSize={"3xl"} fontWeight={"bold"}>
              All Vendors for {location.state.projectName}
              {`(${allVendors.length})`}
            </Text>

            <Box
              display={"grid"}
              gap={10}
              gridTemplateColumns={{
                base: "repeat(1,1fr)",
                lg: "repeat(3,1fr)",
              }}
            >
              {allVendors.map((vendor) => (
                <Card.Root
                  colorPalette={"blue"}
                  variant={"outline"}
                  key={vendor._id}
                  size={"lg"}
                >
                  <Card.Body gap={2}>
                    <Card.Title>{vendor.name}</Card.Title>
                  </Card.Body>
                  <Card.Footer>
                    <Button asChild variant={"surface"} size={"sm"}>
                      <Link
                        to={`/vendor/${vendor._id}/devices`}
                        state={{
                          vendorId: vendor._id,
                          vendorName: vendor.name,
                        }}
                      >
                        Go To Devices
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

export default VendorPage;
