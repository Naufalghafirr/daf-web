"use client";
import { Box, Container, Heading, Text, SimpleGrid, VStack, HStack } from "@chakra-ui/react";
import { FaHandshake, FaBolt, FaShieldAlt, FaChartLine } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function TentangKami() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <Box bg="gray.50" minH="100vh">
      {/* Hero */}
      <Box bgImage="url('images/bg-about.jpg')"  bgSize="cover" bgPosition="center" bgRepeat="no-repeat" color="white" >
        <Container 
        bg="rgba(0,0,0,0.4)" 
        maxW="100%" 
        textAlign="center"
        borderRadius="2xl"
        p={6}
        h="300px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        >
          <Heading fontSize={{ base: "3xl", md: "4xl" }} mb={4}>
            Tentang DanaAuto Finance
          </Heading>
          <Text fontSize={{ base: "md", md: "lg" }} maxW="3xl" mx="auto" opacity={0.95}>
            Platform pembiayaan kendaraan dan properti yang menghubungkan Anda dengan
            berbagai mitra lembaga keuangan terpercaya secara cepat, aman, dan transparan.
          </Text>
        </Container>
      </Box>

      {/* Tentang Perusahaan */}
      <Container maxW="6xl" py={{ base: 8, md: 16 }}>
        <SimpleGrid
            columns={{ base: 1, md: 2 }}
            spacing={{ base: 8, md: 16 }} // lebih lega di desktop
            alignItems="start"
        >
            <Box
            p={{ base: 2, md: 6 }} // padding dalam box
            m={{ base: 0, md: 0 }}
            >
            <Heading size={{ base: "md", md: "lg" }} mb={4}>
                Siapa Kami
            </Heading>
            <Text color="gray.700" mb={4}>
                DanaAuto Finance adalah brand pembiayaan yang berfokus pada solusi dana
                berbasis agunan kendaraan dan properti. Kami hadir untuk membantu
                masyarakat mendapatkan akses pembiayaan dengan proses yang lebih sederhana
                dan efisien.
            </Text>
            <Text color="gray.700">
                Dengan dukungan teknologi digital dan jaringan mitra pembiayaan yang luas,
                kami memastikan setiap pengajuan diproses secara profesional, transparan,
                dan sesuai regulasi yang berlaku.
            </Text>
            </Box>

            <Box
            bg="white"
            p={{ base: 4, md: 8 }} // lebih luas di desktop
            m={{ base: 0, md: 0 }}
            rounded="2xl"
            boxShadow="sm"
            borderWidth="1px"
            >
            <VStack align="flex-start" spacing={4}>
                <Text fontWeight="semibold">Fokus Layanan:</Text>
                <Text>• Pembiayaan mobil baru & bekas</Text>
                <Text>• Refinance / dana multiguna BPKB</Text>
                <Text>• Pembiayaan properti (rumah)</Text>
                <Text>• Konsultasi & simulasi cicilan</Text>
            </VStack>
            </Box>
        </SimpleGrid>
        </Container>


      {/* Nilai & Keunggulan */}
      <Box bg="white" py={16}>
        <Container maxW="6xl">
          <Heading textAlign="center" mb={4} fontSize="2xl">
            Nilai yang Kami Pegang
          </Heading>
          <Text textAlign="center" color="gray.600" mb={10} maxW="3xl" mx="auto">
            Kami berkomitmen memberikan pengalaman pembiayaan terbaik dengan
            mengutamakan kecepatan, keamanan, dan kepercayaan.
          </Text>

          <SimpleGrid columns={{ base: 1, md: 4 }} spacing={8}>
            {[{
              icon: FaBolt,
              title: "Cepat",
              desc: "Proses pengajuan dan persetujuan yang efisien dengan dukungan sistem digital.",
            },{
              icon: FaShieldAlt,
              title: "Aman",
              desc: "Bekerja sama dengan mitra pembiayaan terdaftar dan diawasi OJK.",
            },{
              icon: FaHandshake,
              title: "Terpercaya",
              desc: "Transparansi penuh tanpa biaya tersembunyi di setiap proses.",
            },{
              icon: FaChartLine,
              title: "Solutif",
              desc: "Pilihan penawaran yang disesuaikan dengan kebutuhan finansial Anda.",
            }].map((item) => (
              <Box
                key={item.title}
                p={7}
                m={2}
                bg="gray.50"
                rounded="xl"
                borderWidth="1px"
                borderColor="gray.100"
                textAlign="center"
                _hover={{ boxShadow: "md", transform: "translateY(-4px)" }}
                transition="all 0.2s"
              >
                <Box fontSize="32px" color="green.600" mb={3}>
                  <item.icon />
                </Box>
                <Heading size="md" mb={2}>{item.title}</Heading>
                <Text color="gray.600" fontSize="sm">{item.desc}</Text>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Visi & Misi */}
      <Container maxW="5xl" py={16}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 4, md: 10 }}>
          <Box bg="white" p={8} m={{ base: 4, md: 2 }} rounded="2xl" boxShadow="sm" borderWidth="1px">
            <Heading size="md" mb={3}>Visi</Heading>
            <Text color="gray.700">
              Menjadi platform pembiayaan terpercaya yang memudahkan masyarakat
              Indonesia dalam mengakses solusi dana secara cepat, aman, dan transparan.
            </Text>
          </Box>
          <Box bg="white" p={8} m={{ base: 4, md: 2 }} rounded="2xl" boxShadow="sm" borderWidth="1px">
            <Heading size="md" mb={3}>Misi</Heading>
            <VStack align="flex-start" spacing={2} color="gray.700">
              <Text>• Menghadirkan proses pembiayaan yang sederhana dan digital.</Text>
              <Text>• Memberikan pilihan mitra dan penawaran terbaik.</Text>
              <Text>• Menjaga transparansi dan kepercayaan pelanggan.</Text>
              <Text>• Mendukung inklusi keuangan yang bertanggung jawab.</Text>
            </VStack>
          </Box>
        </SimpleGrid>
      </Container>

      <Box
        my={12}
        h="1px"
        bg="gray.200"
        />

      {/* Penutup */}
      <Container maxW="4xl" py={12} textAlign="center">
        <Heading size="md" mb={3}>DanaAuto Finance</Heading>
        <Text color="gray.600">
          Partner terpercaya Anda untuk solusi pembiayaan kendaraan dan properti.
          Kami siap membantu Anda melangkah lebih jauh dengan proses yang aman dan profesional.
        </Text>
      </Container>
    </Box>
  );
}
