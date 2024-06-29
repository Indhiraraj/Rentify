import React from 'react';
import { FaBuilding, FaHouse, FaWarehouse, FaCity, FaDoorOpen, FaCube, FaLayerGroup, FaCampground } from "react-icons/fa6";

// Array of property types with actual React Icons
export const categories = [
    {
        label: "Apartments",
        icon: <FaBuilding/>,
        image: "Categories/Apartment.jpg"
    },
    {
        label: "Houses",
        icon: <FaHouse />,
        image: "Categories/Home.jpg"
    },
    {
        label: "Condos",
        icon: <FaWarehouse />,
        image: "Categories/Condos.jpg"
    },
    {
        label: "Townhouses",
        icon: <FaCity />,
        image: "Categories/Town-house.jpg"
    },
    {
        label: "Studios",
        icon: <FaDoorOpen />,
        image: "Categories/Studios.jpg"
    },
    {
        label: "Lofts",
        icon: <FaCube />,
        image: "Categories/Lofts.jpg"
    },
    {
        label: "Duplexes",
        icon: <FaLayerGroup />,
        image: "Categories/duplex.jpg"
    },
    {
        label: "Villas",
        icon: <FaCampground />,
        image: "Categories/villa.jpg"
    }
];


