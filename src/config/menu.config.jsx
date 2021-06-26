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
    title: "Apartement",
    icon: () => <FontAwesomeIcon icon={SolidIcon.faDice} />,
    child: [
      {
      title: "Add Master",
      bullet: true,
      link: "/apartement/master/add"
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
  {
    title: "Banner",
    icon: () => <FontAwesomeIcon icon={SolidIcon.faDice} />,
    child: [
      {
      title: "List Banner",
      bullet: true,
      link: "/banner"
      }
  ]

  },
  {
    title: "Ticket",
    icon: () => <FontAwesomeIcon icon={SolidIcon.faDice} />,
    child: [
      {
      title: "List Ticket",
      bullet: true,
      link: "/ticket"
      },
      {
      title: "Add Ticket",
      bullet: true,
      link: "/ticket/add"
      }
  ]

  },
  {
    title: "Invoice",
    icon: () => <FontAwesomeIcon icon={SolidIcon.faDice} />,
    child: [
      {
      title: "List Invoice",
      bullet: true,
      link: "/invoice"
      },
      {
      title: "Add Invoice",
      bullet: true,
      link: "/invoice/add"
      },
  ]

  },
]

export default MENU
