import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";

export const SidebarData = [
    {
        title: "About Us",
        path: "/about-us",
        icon: <AiIcons.AiFillHome />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,

        // subNav: [
        // {
        // 	title: "Our Aim",
        // 	path: "/about-us/aim",
        // 	icon: <IoIcons.IoIosPaper />,
        // },
        // {
        // 	title: "Our Vision",
        // 	path: "/about-us/vision",
        // 	icon: <IoIcons.IoIosPaper />,
        // },
        // ],
    },
    {
        title: "Services",
        path: "/services",
        icon: <IoIcons.IoIosPaper />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,

        subNav: [
            {
                title: "Assam",
                path: "/services/services1",
                icon: <IoIcons.IoIosPaper />,
                cName: "sub-nav",
            },
            {
                title: "Bihar",
                path: "/services/services2",
                icon: <IoIcons.IoIosPaper />,
                cName: "sub-nav",
            },
            {
                title: "Uttar Pradesh",
                path: "/services/services3",
                icon: <IoIcons.IoIosPaper />,
            },
        ],
    },
    {
        title: "Contact Us",
        path: "/contact",
        icon: <FaIcons.FaPhone />,
    },

    {
        title: "Our Team",
        path: "/team",
        icon: <IoIcons.IoMdHelpCircle />,
    },
];
