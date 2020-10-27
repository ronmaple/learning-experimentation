import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Menu } from "semantic-ui-react"

function MenuBar() {
  const [activeItem, setActiveItem] = useState("home")

  // this space for active item menu highlighting, but it doesn't seem needed,
  // and the tutorial code isn't good.

  const handleItemClick = (e, { name }) => setActiveItem(name)

  return (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item
        name="home"
        active={activeItem === "home"}
        onClick={handleItemClick}
        as={Link}
        to={"/"}
      />

      <Menu.Menu position="right">
        <Menu.Item
          name="register"
          active={activeItem === "register"}
          onClick={handleItemClick}
          as={Link}
          to="/register"
        />
        <Menu.Item
          name="login"
          active={activeItem === "login"}
          onClick={handleItemClick}
          as={Link}
          to="/login"
        />
        {/* <Menu.Item
          name="logout"
          active={activeItem === "logout"}
          onClick={handleItemClick}
          as={Link}
          to="/"
        /> */}
      </Menu.Menu>
    </Menu>
  )
}

export default MenuBar
