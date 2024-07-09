import React from 'react';
import { 
    FaBuilding, FaHouse, FaHouseUser, FaPeopleRoof, FaWarehouse, FaCity, FaDoorOpen, FaCube, FaLayerGroup, FaCampground,
    FaSwimmer, FaDumbbell, FaParking, FaWifi, FaSnowflake, FaTshirt, FaShieldAlt, FaArrowAltCircleUp, FaPaw, FaChild,
    FaArchway, FaLeaf, FaFireAlt, FaBicycle, FaBriefcase, FaFilm, FaConcierge, FaTableTennis, FaHotTub, FaUmbrella,
    FaCarSide, FaWheelchair, FaRecycle, FaChargingStation, FaLaptop, FaPrayingHands, FaGamepad, FaBox, FaUserTie,
    FaTv, FaFirstAid, FaIron, FaDryer, FaFire, FaFireExtinguisher, FaWater, FaVideoCamera
  } from "react-icons/fa6";
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


export const types = [
    {
        name: "An entire place",
        description: "Tenants have the whole place to themselves",
        icon: <FaHouseUser />,
    },
    {
        name: "Room(s)",
        description: "Tenants have thier own rooms in a house,plus access to shared places",
        icon: <FaDoorOpen />,
    },
    {
        name: "A Shared Room",
        description: "Tenants sleep in a room or common area that maybe shared with you or others",
        icon: <FaPeopleRoof />,
    }
];


export const facilities = [
    {
      label: "Swimming Pool",
      icon: <FaSwimmer />
    },
    {
      label: "Gym",
      icon: <FaDumbbell />
    },
    {
      label: "Parking",
      icon: <FaParking />
    },
    {
      label: "Wi-Fi",
      icon: <FaWifi />
    },
    {
      label: "Air Conditioning",
      icon: <FaSnowflake />
    },
    {
      label: "Laundry",
      icon: <FaTshirt />
    },
    {
      label: "Security",
      icon: <FaShieldAlt />
    },
    {
      label: "Elevator",
      icon: <FaArrowAltCircleUp />
    },
    {
      label: "Pet Friendly",
      icon: <FaPaw />
    },
    {
      label: "Playground",
      icon: <FaChild />
    },
    {
      label: "Balcony",
      icon: <FaArchway />
    },
    {
      label: "Garden",
      icon: <FaLeaf />
    },
    {
      label: "BBQ Area",
      icon: <FaFireAlt />
    },
    {
      label: "Bike Storage",
      icon: <FaBicycle />
    },
    {
      label: "Business Center",
      icon: <FaBriefcase />
    },
    {
      label: "Cinema Room",
      icon: <FaFilm />
    },
    {
      label: "Concierge",
      icon: <FaConcierge />
    },
    {
      label: "Tennis Court",
      icon: <FaTableTennis />
    },
    {
      label: "Sauna",
      icon: <FaHotTub />
    },
    {
      label: "Roof Terrace",
      icon: <FaUmbrella />
    },
    {
      label: "Storage Units",
      icon: <FaWarehouse />
    },
    {
      label: "Visitor Parking",
      icon: <FaCarSide />
    },
    {
      label: "Wheelchair Access",
      icon: <FaWheelchair />
    },
    {
      label: "Recycling Facilities",
      icon: <FaRecycle />
    },
    {
      label: "Electric Car Charging",
      icon: <FaChargingStation />
    },
    {
      label: "Co-working Space",
      icon: <FaLaptop />
    },
    {
      label: "Yoga Studio",
      icon: <FaPrayingHands />
    },
    {
      label: "Game Room",
      icon: <FaGamepad />
    },
    {
      label: "Package Lockers",
      icon: <FaBox />
    },
    {
      label: "On-site Management",
      icon: <FaUserTie />
    },
    {
      label: "TV",
      icon: <FaTv />
    },
    {
      label: "First Aid Kit",
      icon: <FaFirstAid />
    },
    {
      label: "Hangers",
      icon: <FaTshirt />
    },
    {
      label: "Iron",
      icon: <FaIron />
    },
    {
      label: "Dryer",
      icon: <FaDryer />
    },
    {
      label: "Stove",
      icon: <FaFire />
    },
    {
      label: "Fire Extinguisher",
      icon: <FaFireExtinguisher />
    },
    {
      label: "Washer",
      icon: <FaWater />
    },
    {
      label: "CCTV",
      icon: <FaVideoCamera />
    }
  ];