import {
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Skeleton
} from "@chakra-ui/react";
import { FilterIcon } from "@heroicons/react/solid";
import { Prs } from "lib/types";
import { ErrorWhileFetching } from "pages";
import { Dispatch, FC, SetStateAction } from "react";

type FilterProps = {
  filterSubject: string;
  setFilterSubject: Dispatch<SetStateAction<string>>;
};



export const Filter: FC<FilterProps> = ({ filterSubject, setFilterSubject }) => {

  const { loading, error, data} = { loading: false, error: null, data: { prs: { nodes: [], pageInfo: { hasNextPage: false, endCursor: "" } } } };

  if (loading) return <Skeleton w={100} h={"40px"} />;

  if (error || !data?.prs.nodes) {
    console.error("Error while fetching prs", error);
    return <ErrorWhileFetching />;
  }

  const prs = [];

  const subjects = Array.from(new Set(prs)).sort();

  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton
            isActive={isOpen}
            colorScheme={"twin"}
            as={Button}
            leftIcon={<Icon as={FilterIcon} />}
          >
            Filter
          </MenuButton>
          <MenuList>
            { filterSubject.length > 0 && (
              <>
              <MenuItem
              as={Button} w="60%" mx="auto" colorScheme="twin" variant="outline" onClick={() => setFilterSubject("")}>
                Clear
                </MenuItem>
              <MenuDivider />
              </>
            )}
            {subjects.map((subject) => {
              return (
                <MenuItem key={subject} color={ subject === filterSubject ? "twin.500" : ""} onClick={() => setFilterSubject(subject)}>{subject}</MenuItem>
              )
            })  }
          </MenuList>
        </>
      )}
    </Menu>
  );
};
