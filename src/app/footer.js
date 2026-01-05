import { Box, Container, SimpleGrid, Heading, Text, VStack, Link } from "@chakra-ui/react";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";
function Footer() {
    return (
        <Box bg="blue.900" color="white" mt={4}>
        <Container maxW="6xl" py={10}>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
            <Box>
              <Heading size="md" mb={3}>
                DanaAuto Finance
              </Heading>
              <Text fontSize="sm" color="whiteAlpha.800" mb={4}>
                DanaAuto Finance adalah platform yang mempertemukan pemodal dan
                nasabah, dengan proses cepat dan struktur pinjaman yang
                fleksibel.
              </Text>
              <Text fontSize="sm" color="whiteAlpha.700">
                Bekerja sama dengan lebih dari 15 pemodal untuk pembiayaan ulang
                kendaraan bermotor maupun pembiayaan perumahan.
              </Text>
            </Box>

            <Box>
              <Heading size="sm" mb={3}>
                Tinjauan
              </Heading>
              <VStack align="flex-start" spacing={1} fontSize="sm">
                <Link _hover={{ color: "blue.500", textDecoration: "none", transition: "all 0.2s" }} color="white" href="/tentang-kami">Tentang Kami</Link>
                <Link _hover={{ color: "blue.500", textDecoration: "none", transition: "all 0.2s" }} color="white" href="/privacy-policy">Privasi</Link>
              </VStack>
            </Box>

            <Box>
              <Heading size="sm" mb={3}>
                Kontak Kami
              </Heading>
              <VStack align="flex-start" spacing={1} fontSize="sm">
                <Link _hover={{ color: "blue.500", textDecoration: "none", transition: "all 0.2s" }} color="white" href="https://wa.me/62895418048787"><FaWhatsapp/>+62 895-4180-48787 </Link>
                <Link _hover={{ color: "blue.500", textDecoration: "none", transition: "all 0.2s" }} color="white" href="mailto:support@danaauto.finance"> <FaEnvelope/>support@danaauto.finance</Link>
                <Text>Mensana Tower Lantai 7 Unit I</Text>
                <Text>Jl Raya Kranggan, Jatisampurna, Kota Bekasi</Text>
                <Text>Jawa Barat 17435</Text>
              </VStack>
            </Box>
          </SimpleGrid>
        </Container>
        <Box borderTopWidth="1px" borderColor="whiteAlpha.300">
          <Container maxW="6xl" py={4}>
            <Text fontSize="xs" color="whiteAlpha.700" textAlign="center">
              Copyright © DanaAuto Finance 2025.
              All Rights Reserved.
            </Text>
          </Container>
        </Box>
      </Box>
    );
}

export default Footer;