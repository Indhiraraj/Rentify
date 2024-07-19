import React from 'react';
import { FaArrowDownUpAcrossLine, FaBicycle, FaBolt, FaBox, FaBriefcase, FaBuilding, FaCampground, FaCar, FaChild, FaCity, FaCube, FaDoorOpen, FaDumbbell, FaFilm, FaFire, FaGamepad, FaHandsPraying, FaHotTubPerson, FaHouse, FaHouseUser, FaKitMedical, FaLaptop, FaLayerGroup, FaLeaf, FaPaw, FaPeopleRoof, FaPersonSwimming, FaRecycle, FaShield, FaShirt, FaSnowflake, FaSquareParking, FaTableTennisPaddleBall, FaTv, FaUmbrella, FaUser, FaUserTie, FaVideo, FaWarehouse, FaWater, FaWheelchair, FaWifi } from "react-icons/fa6";

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
  { label: "Swimming Pool", icon: <FaPersonSwimming /> },
  { label: "Gym", icon: <FaDumbbell /> },
  { label: "Parking", icon: <FaSquareParking /> },
  { label: "Wi-Fi", icon: <FaWifi /> },
  { label: "Air Conditioning", icon: <FaSnowflake /> },
  { label: "Laundry", icon: <FaShirt /> },
  { label: "Security", icon: <FaShield /> },
  { label: "Elevator", icon: <FaArrowDownUpAcrossLine /> },
  { label: "Pet Friendly", icon: <FaPaw /> },
  { label: "Playground", icon: <FaChild /> },
  { label: "Balcony", icon: <FaHouse /> },
  { label: "Garden", icon: <FaLeaf /> },
  { label: "BBQ Area", icon: <FaFire /> },
  { label: "Bike Storage", icon: <FaBicycle /> },
  { label: "Business Center", icon: <FaBriefcase /> },
  { label: "Cinema Room", icon: <FaFilm /> },
  { label: "Concierge", icon: <FaUser /> },
  { label: "Tennis Court", icon: <FaTableTennisPaddleBall /> },
  { label: "Sauna", icon: <FaHotTubPerson /> },
  { label: "Roof Terrace", icon: <FaUmbrella /> },
  { label: "Storage Units", icon: <FaWarehouse /> },
  { label: "Visitor Parking", icon: <FaCar /> },
  { label: "Wheelchair Access", icon: <FaWheelchair /> },
  { label: "Recycling Facilities", icon: <FaRecycle /> },
  { label: "Electric Car Charging", icon: <FaBolt /> },
  { label: "Co-working Space", icon: <FaLaptop /> },
  { label: "Yoga Studio", icon: <FaHandsPraying /> },
  { label: "Game Room", icon: <FaGamepad /> },
  { label: "Package Lockers", icon: <FaBox /> },
  { label: "On-site Management", icon: <FaUserTie /> },
  { label: "TV", icon: <FaTv /> },
  { label: "First Aid Kit", icon: <FaKitMedical /> },
  { label: "Hangers", icon: <FaShirt /> },
  { label: "Iron", icon: <FaShirt /> },
  { label: "Dryer", icon: <FaShirt /> },
  { label: "Stove", icon: <FaFire /> },
  { label: "Fire Extinguisher", icon: <FaFire /> },
  { label: "Washer", icon: <FaWater /> },
  { label: "CCTV", icon: <FaVideo /> }
];