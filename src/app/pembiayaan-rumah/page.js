"use client";

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Button,
  HStack,
  Image,
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import AjukanModal from "../ajukanmodal";

export default function SecondaryHousingPage() {
    const [mounted, setMounted] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <Box bg="gray.50" minH="100vh">
      {/* Hero Section */}
      <Box
        bgImage="url('images/house-bg.jpg')" // taruh file di public
        bgPos="center"
        bgSize="cover"
        bgRepeat="no-repeat"
        color="white"
        textAlign="center"
      >
        <Container bg="rgba(0, 0, 0, 0.5)" p={6} h="300px" display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center">
          <Heading fontSize={{ base: "3xl", md: "5xl" }} mb={4}>
            Pembiayaan Sekunder Perumahan
          </Heading>
          <Text fontSize={{ base: "md", md: "lg" }} mb={6}>
            DanaAuto Finance (DAF) membantu Anda mendapatkan akses pembiayaan rumah
            sekunder dengan proses cepat, mudah, dan transparan.
          </Text>
          <Button bg="green.500" _hover={{ bg: "green.400" }} colorScheme="green" size="lg" borderRadius="full" onClick={() => {setModalOpen(true)}}>
            Ajukan Sekarang
          </Button>
        </Container>
      </Box>
        <AjukanModal isOpen={modalOpen} setOpen={setModalOpen}/>
      {/* Informasi Umum */}
      <Container maxW="6xl" py={{ base: 10, md: 20 }}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} alignItems="center">
          <Box>
            <Heading size="lg" mb={4}>
              Apa itu Pembiayaan Sekunder Perumahan?
            </Heading>
            <Text color="gray.700" mb={4}>
              Pembiayaan sekunder perumahan adalah produk pinjaman yang ditujukan
              untuk pembelian atau refinansi rumah yang sudah dimiliki. Dengan
              dukungan DanaAuto Finance, Anda bisa mengakses dana tambahan dengan
              jaminan properti yang ada.
            </Text>
            <Text color="gray.700">
              Proses cepat dan transparan, didukung oleh mitra lembaga keuangan
              terpercaya, sehingga Anda bisa fokus pada rencana rumah Anda.
            </Text>
          </Box>
          <Box>
            <Image
              src="images/house-img.jpg"
              alt="Ilustrasi pembiayaan rumah"
              borderRadius="2xl"
              boxShadow="md"
              w="100%"
              maxH="300px"
              objectFit="cover"
            />
          </Box>
        </SimpleGrid>
      </Container>

      {/* Persyaratan */}
      <Container maxW="4xl" py={{ base: 10, md: 20 }}>
        <Heading textAlign="center" mb={8}>
          Persyaratan Pinjaman
        </Heading>
        <VStack align="flex-start" spacing={4}>
          {[
            "Warga Negara Indonesia (WNI) usia minimum 21 tahun",
            "Dokumen identitas (KTP, KK)",
            "Dokumen properti (sertifikat rumah / IMB / PBB)",
            "Bukti penghasilan atau dokumen pendukung lainnya",
          ].map((item, index) => (
            <HStack key={index} align="start" spacing={3}>
              <FaCheckCircle color="#38A169" size={20} />
              <Text color="gray.700">{item}</Text>
            </HStack>
          ))}
        </VStack>
      </Container>

      {/* Keunggulan */}
      <Container maxW="6xl" py={{ base: 10, md: 20 }}>
        <Heading textAlign="center" mb={10}>
          Keunggulan DanaAuto Finance
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
          {[
            "Proses digital cepat dan transparan",
            "Mitra lembaga keuangan terpercaya",
            "Persetujuan pinjaman fleksibel sesuai kebutuhan",
          ].map((point, i) => (
            <Box
              key={i}
              p={6}
              bg="white"
              borderRadius="2xl"
              boxShadow="md"
              borderWidth="1px"
              borderColor="gray.100"
            >
              <Text color="gray.700">{point}</Text>
            </Box>
          ))}
        </SimpleGrid>
      </Container>

      {/* CTA Section */}
      <Box bg="green.600" py={{ base: 16, md: 24 }} textAlign="center" color="white">
        <Heading mb={4}>Ajukan Pembiayaan Sekarang</Heading>
        <Text mb={6}>Dapatkan proses cepat dan transparan untuk rumah idaman Anda.</Text>
        <Button colorScheme="green" size="lg" borderRadius="full">
          Ajukan Sekarang
        </Button>
      </Box>
    </Box>
  );
}
