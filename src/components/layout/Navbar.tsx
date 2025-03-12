import type { NavbarProps } from "@nextui-org/react";
import { useState, useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Divider,
} from "@nextui-org/react";
import { Button } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const menuItems = [
  { name: "Home", route: "/" },
  { name: "About", route: "/about" },
  { name: "Gallery", route: "/gallery" },
  { name: "My Trips", route: "/myTrips" },
  { name: "Flight Deals", route: "/flights" },
  { name: "Contact", route: "/contact" },
];

export default function NavbarLayout(props: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(menuItems[0].name);
  const location = useLocation();

  useEffect(() => {
    const currentRoute = menuItems.find(
      (item) => item.route === location.pathname
    );
    if (currentRoute) {
      setActiveItem(currentRoute.name);
    } else {
      setActiveItem("");
    }
  }, [location]);

  return (
    <Navbar
      shouldHideOnScroll
      isBlurred={false}
      {...props}
      classNames={{
        item: [
          "relative",
          "flex",
          "h-full",
          "items-center",
          "after:content-['']",
          "after:absolute",
          "after:bottom-0",
          "after:left-1/2",
          "after:right-1/2",
          "after:h-[2px]",
          "after:w-0",
          "after:bg-warning",
          "after:transition-all",
          "after:duration-300",
          "hover:after:left-0",
          "hover:after:right-0",
          "hover:after:w-full",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:w-full",
        ].join(" "),
      }}
      isBordered
      height="60px"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarBrand>
        <NavLink
          to="/"
          className="flex items-center gap-2"
          style={{ justifyContent: "center", width: "30%" }}
        >
          <img
            src="https://images.builderservices.io/s/cdn/v1.0/i/m?url=https%3A%2F%2Fstorage.googleapis.com%2Fproduction-hostgator-mexico-v1-0-4%2F534%2F297534%2FOszKu7tR%2Fc9930c02910c48f79abbd96f757f76c2&methods=resize%2C500%2C5000"
            alt="Logo Holbox Air"
            loading="lazy"
          />
        </NavLink>
      </NavbarBrand>

      <NavbarContent className="hidden md:flex" justify="center">
        {menuItems.map((item) => (
          <NavbarItem key={item.name}>
            <NavLink
              to={item.route}
              className={({ isActive }) =>
                isActive || activeItem === item.name
                  ? "text-warning font-bold"
                  : "text-default-500"
              }
            >
              {item.name}
            </NavLink>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <Button
          href="https://wa.me/529982756932"
          target="_blank"
          sx={{
            backgroundColor: "gray",
            color: "white",
            padding: "10px",
            gap: "10px",
            ":hover": { backgroundColor: "#25d366", color: "black" },
            textDecoration: "none",
          }}
        >
          <WhatsAppIcon />
          WhatsApp
        </Button>
      </NavbarContent>

      <NavbarMenuToggle className="text-default-400 md:hidden" />

      <NavbarMenu className="top-[calc(var(--navbar-height)_-_1px)] max-h-fit bg-default-200/50 pb-6 pt-6 shadow-medium backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <NavLink
              to={item.route}
              className={({ isActive }) =>
                isActive || activeItem === item.name
                  ? "text-warning font-bold"
                  : "text-default-500"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </NavLink>
            {index < menuItems.length - 1 && (
              <Divider className="bg-warning opacity-50" />
            )}
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
