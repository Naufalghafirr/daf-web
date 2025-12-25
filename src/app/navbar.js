import { Box, Container, Flex, HStack, Text, Link, Button, SimpleGrid, Heading, VStack, IconButton, Dialog} from "@chakra-ui/react";
import { FaWhatsapp, FaBars } from "react-icons/fa";
import { useState } from "react";
import { usePathname } from "next/navigation";
import AjukanModal from "./ajukanmodal";

function Navbar(){
    const [menuOpen, setMenuOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <>
        <AjukanModal isOpen={modalOpen} setOpen={setModalOpen} />

        {/* NAVBAR */}
        <Box
          as="header"
          position="sticky"
          top={0}
          zIndex={20}
          bg="white"
          boxShadow="sm"
        >
          <Container maxW="6xl">
            <Flex align="center" justify="space-between" py={3}>
              {/* LOGO */}
              <HStack spacing={3}>
                <Link href="#home" display="flex" alignItems="center" _hover={{ textDecoration: "none" }}>
                <Box>
                  <Text fontWeight="bold" fontSize="lg" color="green.600">
                    DanaAuto Finance
                  </Text>
                  <Text fontSize="xs" color="gray.600">
                    Pembiayaan Mobil & Rumah
                  </Text>
                </Box>
                </Link>
              </HStack>
  
              {/* MENU DESKTOP */}
              <HStack
                spacing={10}
                display={{ base: "none", md: "flex" }}
                align="center"
              >
                <Link href="#home" _hover={{ color: "green.600", textDecoration: "none", transition: "all 0.2s" }} >Home</Link>
                <Link href="#keunggulan_kami" _hover={{ color: "green.600", textDecoration: "none", transition: "all 0.2s" }} >Keunggulan Kami</Link>
                <Link href="#simulasi" _hover={{ color: "green.600", textDecoration: "none", transition: "all 0.2s" }} >
                  Simulasi
                </Link>
              </HStack>
  
              {/* CTA DESKTOP */}
              <HStack display={{ base: "none", md: "flex" }}>
                <Button
                  size="sm"
                  colorScheme="green"
                  bg="green.500"
                  color="white"
                  borderRadius="full"
                  onClick={() => { setModalOpen(true) }}
                  _hover={{ bg: "green.400" }}
                >
                  <FaWhatsapp /> &nbsp; Apply Sekarang
                </Button>
              </HStack>
  
              {/* HAMBURGER MOBILE */}
              <Button
                aria-label="Open menu"
                variant="ghost"
                display={{ base: "flex", md: "none" }}
                onClick={() => setMenuOpen(true)}
              >
                <FaBars />
              </Button>
            </Flex>
          </Container>
        </Box>
        
        {/* MOBILE MENU */}
        <Dialog.Root open={menuOpen} onOpenChange={(e) => setMenuOpen(e.open)}>
            <Dialog.Backdrop bg="rgba(0,0,0,0.4)" backdropFilter="blur(8px)" />
            <Dialog.Positioner>
            <Dialog.Content
                top={0} zIndex={10} width="full" maxW="100%"
                borderRadius="0" bg="white" px={6} py={6}
                transform="translateY(-100%)"
                _open={{ transform: "translateY(0)" }}
                transition="transform 0.35s ease-in-out"
            >
                <Dialog.CloseTrigger />
                <Dialog.Body>
                <VStack spacing={6} align="stretch" mt={10}>
                    <Link href="#home" _hover={{ color: "green.600", textDecoration: "none", transition: "all 0.2s" }} onClick={() => setMenuOpen(false)}>Home</Link>
                    <Link href="#keunggulan_kami" _hover={{ color: "green.600", textDecoration: "none", transition: "all 0.2s" }} onClick={() => setMenuOpen(false)}>Keunggulan Kami</Link>
                    <Link href="#simulasi" _hover={{ color: "green.600", textDecoration: "none", transition: "all 0.2s" }} onClick={() => setMenuOpen(false)}>Simulasi</Link>
                        <Button mt={6} colorScheme="green" borderRadius="full" onClick={() => { setMenuOpen(false); setModalOpen(true); }}>
                    <FaWhatsapp /> &nbsp; Apply Sekarang
                    </Button>
                </VStack>
                </Dialog.Body>
            </Dialog.Content>
            </Dialog.Positioner>
        </Dialog.Root>
        </>
    );  
}

export default Navbar;