"use client";

import { 
  ChakraProvider, 
  Box, 
  Container, 
  Flex, 
  HStack, 
  Text, Link, Button, SimpleGrid, Heading, VStack, IconButton, Dialog} from "@chakra-ui/react";
import { system } from "./theme";
import { FaWhatsapp, FaBars } from "react-icons/fa";
import { useState, useEffect } from "react";
import Navbar from "./navbar";
import Footer from "./footer";

export function Providers({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return <ChakraProvider value={system}>
    <Box>
      <Navbar />
      {children}
      <Footer />
    </Box>
    </ChakraProvider>;
}
