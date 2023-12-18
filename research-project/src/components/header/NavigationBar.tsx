import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
} from "@nextui-org/react";

function NavigationBar() {
  return (
    <Navbar>
      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        <NavbarItem isActive>
          <Link color="foreground" href="/">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/Projects">
            Projects
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/Publications">
            Publications
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/About">
            About
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/SpecialThanks">
            Special Thanks
          </Link>
        </NavbarItem>
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                radius="sm"
                variant="light"
              >
                More Info
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="More Information"
            className="w-[340px]"
            itemClasses={{ base: "gap-6" }}
          >
            <DropdownItem
              key="linkedIn"
              description="Check out my LinkedIn Profile"
              href="https://www.linkedin.com/in/jason-starace-66b69b58"
              target="blank"
            >
              LinkedIn
            </DropdownItem>
            <DropdownItem
              key="github"
              description="Check out the repos that are public"
              href="https://github.com/jstarace"
              target="blank"
            >
              GitHub
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Log In
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default NavigationBar;
