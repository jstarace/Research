import React from "react";
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
  NavbarMenu,
  NavbarMenuToggle,
  NavbarMenuItem,
} from "@nextui-org/react";

function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    "Home",
    "Projects",
    "Publications",
    "About",
    "Special Thanks",
  ];

  return (
    <Navbar
      isBordered
      isBlurred
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="sm:hidden" justify="center">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>
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

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}` + "-" + `${index}`}>
            <Link
              className="W-full"
              href={index === 0 ? "/" : "/" + `${item}`}
              size="lg"
              onPress={() => setIsMenuOpen(false)}
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
        <Dropdown>
          <DropdownTrigger>
            <Button size="sm" radius="sm" variant="bordered">
              More Info
            </Button>
          </DropdownTrigger>
          <DropdownMenu>
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
      </NavbarMenu>
    </Navbar>
  );
}

export default NavigationBar;
