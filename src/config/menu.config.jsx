import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Badge } from "@panely/components"
import * as SolidIcon from "@fortawesome/free-solid-svg-icons"

/*
 * Menu Configuration
 * the object below is representation of the side navigation menu
 * there are some property you can use to customize your menu
 */

const MENU = [
  {
    title: "Dashboard",
    icon: () => <FontAwesomeIcon icon={SolidIcon.faDesktop} />,
    addon: () => <Badge variant="success">new</Badge>,
    link: "/"
  },
  {
    title: "Elements",
    section: true
  },
  {
    title: "Visitor",
    icon: () => <FontAwesomeIcon icon={SolidIcon.faDice} />,
    link: "/visitor"
  },
  {
    title: "User",
    icon: () => <FontAwesomeIcon icon={SolidIcon.faDice} />,
    child: [
      {
      title: "Add User",
      bullet: true,
      link: "/user/add"
      },
      {
      title: "Register User",
      bullet: true,
      link: "/user/register"
      },
      {
      title: "Approve User",
      bullet: true,
      link: "/user/approve"
      },
  ]
  },
  {
    title: "Content",
    icon: () => <FontAwesomeIcon icon={SolidIcon.faDice} />,
    child: [
      {
      title: "List Content",
      bullet: true,
      link: "/content"
      },
      {
      title: "Add Content",
      bullet: true,
      link: "/content/create"
      },
  ]

  },
]

export default MENU
