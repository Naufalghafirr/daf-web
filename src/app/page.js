"use client";
import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  SimpleGrid,
  Button,
  Input,
  Field,
  Slider,
  VStack,
  Flex,
  Link,
  HStack,
  Dialog,
  Portal,
  Accordion,
} from "@chakra-ui/react";

import { FaCar } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";
import AjukanModal from "./ajukanmodal";
export default function Home() {
  
  const [modalOpen, setModalOpen] = useState(false);
  const [pinjaman, setPinjaman] = useState(null);
  const [bunga, setBunga] = useState(null);
  const [tenor, setTenor] = useState(null);
  const [cicilan, setCicilan] = useState(null);

  const [whyDanaAutoFinance, setWhyDanaAutoFinance] = useState([
    {
      title: "Proses Digital",
      desc: "Proses digital tanpa kertas termasuk verifikasi panggilan dan penyerahan dokumen secara daring.",
    },
    {
      title: "Banyak Pilihan Mitra",
      desc: "Penawaran pinjaman dari lebih dari 10 mitra lembaga keuangan dengan beragam pilihan.",
    },
    {
      title: "Persetujuan Cepat",
      desc: "Lengkapi aplikasi untuk mendapatkan pencairan pinjaman cepat, mulai dari 48 jam*.",
    },
    {
      title: "Transparansi Lengkap",
      desc: "Semua syarat & ketentuan ditampilkan di muka agar Anda tetap terinformasi di setiap langkah.",
    },
  ]);
  
  const [mounted, setMounted] = useState(false);
  const hitungCicilan = () => {
    const r = bunga / 12 / 100;
    const n = tenor;
  
    if (!pinjaman || !bunga || !tenor) return;
  
    const c = (pinjaman * r) / (1 - Math.pow(1 + r, -n));
    setCicilan(c);
  };

  useEffect(() => {
    setMounted(true);

    if (pinjaman && bunga && tenor) {
      hitungCicilan();
    }else{
      setCicilan(null);
    }

  }, [pinjaman, bunga, tenor]);
  if (!mounted) return null;
  return (
    <Box bg="green.100" minH="100vh">
      <Box
        bg="green.100"
        color="white"
        py={{ base: 16, md: 24 }}
        id="home"
      >
        <Container maxW="6xl">
          <SimpleGrid
            columns={{ base: 1, md: 2 }}
            spacing={10}
            alignItems="center"
          >
            <Box textAlign={{ base: "center", md: "left" }}>
              <Text
                fontSize="sm"
                letterSpacing="wide"
                mb={2}
                opacity={0.9}
                color="green.600"
              >
                DanaAuto Finance — Pembiayaan Mobil
              </Text>
              <Heading
                fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                mb={4}
                color="black"
                lineHeight="short"
              >
                Pembiayaan Mobil Lengkap:
                <br />
                Baru, Bekas, dan Refinance
              </Heading>
              <Text fontSize={{ base: "md", md: "lg" }} color="black" mb={8} opacity={0.95}>
                Bunga terbaik, pilihan tenor beragam, dan proses digital yang
                cepat, mudah, serta aman. Ajukan pembiayaan atau refinance
                kendaraan Anda tanpa harus berhenti berkendara.
              </Text>
              <VStack
                spacing={6}
                align={{ base: "center", md: "flex-start" }}
              >
                <Flex display="flex" gap={4} flexWrap="wrap" direction={{ base: "column", md: "row" }}>
                  <Button
                    colorScheme="orange"
                    size="lg"
                    borderRadius="full"
                    onClick={() => setModalOpen(true)}
                    _hover={{ bg: "blackAlpha.400" }}
                  >
                    <FaHouse />
                    Kredit Multiguna
                  </Button>
                  <Button
                    variant="outline"
                    colorScheme="green"
                    size="lg"
                    borderRadius="full"
                    onClick={() => setModalOpen(true)}
                    _hover={{ bg: "green.200" }}
                    bg="green.500"
                    color="white"
                  >
                    <FaCar />
                    Kredit Mobil Baru
                  </Button>
                </Flex>
                <Text fontSize="sm" color="gray.700">
                  Proses cepat & transparan, didukung mitra lembaga keuangan
                  terdaftar dan diawasi OJK.
                </Text>
              </VStack>
            </Box>

            <Box display={{ base: "none", md: "block" }} textAlign="center">
              <Box
                bg="whiteAlpha.200"
                borderRadius="2xl"
                p={6}
                backdropFilter="blur(6px)"
                borderWidth="1px"
                borderColor="whiteAlpha.400"
              >
                <Image
                  src="https://images.pexels.com/photos/97075/pexels-photo-97075.jpeg"
                  alt="Ilustrasi pembiayaan kendaraan"
                  mx="auto"
                  maxH="260px"
                  w="100%"
                  objectFit="cover"
                  borderRadius="xl"
                />
              </Box>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>
    
    <AjukanModal isOpen={modalOpen} setOpen={setModalOpen} />
      {/* Mitra Keuangan */}
      {/* <Container maxW="6xl" py={16}>
        <Heading textAlign="center" mb={4} fontSize="2xl">
          Mitra Lembaga Keuangan
        </Heading>
        <Text textAlign="center" color="gray.600" mb={10}>
          Terhubung dengan berbagai lembaga pembiayaan terpercaya untuk
          memberikan Anda pilihan terbaik.
        </Text>
        <Box
          bg="white"
          borderRadius="2xl"
          p={{ base: 6, md: 8 }}
          boxShadow="sm"
        >
          <SimpleGrid
            columns={{ base: 3, md: 6 }}
            spacing={{ base: 4, md: 8 }}
            alignItems="center"
          > */}
            {/* Ganti src dengan logo yang sesuai */}
            {/* {[
              "adira-finance",
              "mega-finance",
              "bfi-finance",
              "kredit-plus",
              "mandiri-utama-finance",
              "mizuho",
              "mnc-finance",
              "mofi",
              "smart-finance",
              "true-finance",
              "wom-finance",
              "nsc-finance",
            ].map((name) => (
              <Image
                key={name}
                src={`/logos/${name}.png`}
                alt={name}
                mx="auto"
                boxSize="60px"
                objectFit="contain"
                filter="grayscale(100%)"
                opacity={0.85}
                _hover={{
                  filter: "none",
                  opacity: 1,
                  transform: "scale(1.05)",
                }}
                transition="all 0.2s"
              />
            ))} */}
          {/* </SimpleGrid>
        </Box>
      </Container> */}

      {/* Fitur */}
      <Box bg="white" py={16} id="keunggulan_kami">
        <Container maxW="6xl" pt={5}>
          <Heading textAlign="center" mb={4} fontSize="2xl">
            Kenapa DanaAuto Finance?
          </Heading>
          <Text textAlign="center" color="gray.600" mb={10}>
            Proses digital dari awal hingga akhir, banyak penawaran pinjaman,
            persetujuan cepat, dan transparansi penuh di setiap langkah.
          </Text>
          <SimpleGrid columns={{ base: 1, md: 4 }} spacing={8}>
            {[
              ...whyDanaAutoFinance,
            ].map((item) => (
              <Box
                key={item.title}
                p={7}
                m={2}
                bg="gray.50"
                rounded="xl"
                boxShadow="sm"
                borderWidth="1px"
                borderColor="gray.100"
                _hover={{ boxShadow: "md", transform: "translateY(-3px)" }}
                transition="all 0.2s"
              >
                <Heading size="md" mb={3}>
                  {item.title}
                </Heading>
                <Text color="gray.600">{item.desc}</Text>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Form Estimasi */}
      <Container maxW="lg" py={16} id="simulasi">
        <Box
          bg="white"
          borderRadius="2xl"
          p={{ base: 6, md: 8 }}
          boxShadow="lg"
          borderWidth="1px"
          borderColor="gray.100"
        >
          <Heading textAlign="center" mb={3} fontSize="2xl">
            Hitung cicilan Anda
          </Heading>
          <Text textAlign="center" color="gray.600" mb={6} fontSize="sm">
            Masukkan jumlah pinjaman, bunga, dan tenor untuk melihat estimasi
            cicilan bulanan Anda.
          </Text>
          <VStack spacing={6}>
            <Field.Root>
              <Field.Label>Jumlah Pinjaman</Field.Label>
              <Input type="number" min={0} placeholder="Masukkan jumlah pinjaman" value={pinjaman} onChange={(e) => setPinjaman(e.target.value)} />
            </Field.Root>
            <Field.Root>
              <Field.Label>Bunga</Field.Label>
              <Input type="number" placeholder="Masukkan bunga" value={bunga} onChange={(e) => setBunga(e.target.value)} />
            </Field.Root>
            <Field.Root>
              <Field.Label>Tenor</Field.Label>
              <Input type="number" placeholder="Masukkan tenor" value={tenor} onChange={(e) => setTenor(e.target.value)} />
            </Field.Root>
          </VStack>
          {cicilan && (
            <>
            <Box
              w="full"
              p={4}
              mt={4}
              bg="blue.50"
              borderRadius="xl"
              borderWidth="1px"
              borderColor="blue.100"
            >
              <Text fontSize="sm" color="blue.700">
                Estimasi Cicilan / Bulan
              </Text>
              <Text fontSize="2xl" fontWeight="bold" color="blue.900">
                Rp {Math.round(cicilan).toLocaleString("id-ID")}
              </Text>
            </Box>
            <Box w="full" p={4} mt={4} bg="blue.50" borderRadius="xl" borderWidth="1px" borderColor="blue.100">
              <Text fontSize="sm" color="blue.700">
                Total Pembayaran:
                <Text fontSize="2xl" fontWeight="bold" color="blue.900">
                  Rp {Math.round(cicilan * tenor).toLocaleString("id-ID")}
                </Text>
                <Text fontSize="sm" color="blue.700">
                (Rp {Math.round(cicilan).toLocaleString("id-ID")} x {tenor} bulan)
                </Text>
                <Text fontSize="sm" color="blue.700">
                Total Bunga: Rp {Math.round(cicilan * tenor * bunga / 100).toLocaleString("id-ID")}
                </Text>
              </Text>
            </Box>
            </>
          )}

        </Box>
      </Container>

      {/* Cara Kerja */}
      <Box bg="gray.50" py={16}>
        <Container maxW="5xl">
          <Heading textAlign="center" mb={4} fontSize="2xl">
            Bagaimana Cara Saya Ajukan?
          </Heading>
          <Text textAlign="center" color="gray.600" mb={10}>
            Ikuti langkah-langkah berikut untuk mendapatkan penawaran pinjaman
            terbaik dan tetap berkendara dengan nyaman.
          </Text>
          <SimpleGrid columns={{ base: 1, md: 4 }} spacing={8}>
            {[
              "Bagikan detail dasar dan sediakan dokumen dasar kendaraan serta data pribadi Anda.",
              "Tentukan persyaratan pinjaman sesuai kebutuhan dalam batas yang disetujui.",
              "Serahkan koordinasi kepada kami dan mitra lembaga keuangan untuk proses lebih lanjut.",
              "Terima penawaran pinjaman paling menguntungkan, akses dana, dan tetap kendarai kendaraan Anda.",
            ].map((step, i) => (
              <Box key={i} textAlign="center">
                <Box
                  mx="auto"
                  mb={4}
                  w={12}
                  h={12}
                  borderRadius="full"
                  bg="blue.600"
                  color="white"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontWeight="bold"
                  fontSize="lg"
                  boxShadow="md"
                >
                  {i + 1}
                </Box>
                <Text color="gray.700">{step}</Text>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Jaminan Penawaran Terbaik */}
      <Box bg="white" py={16}>
        <Container maxW="4xl">
          <Heading textAlign="center" mb={4} fontSize="2xl">
            Jaminan Penawaran Terbaik
          </Heading>
          <Text textAlign="center" color="gray.600" mb={10}>
            DanaAuto Finance bekerja sama dengan pemodal terdaftar dan diawasi OJK
            untuk memastikan Anda mendapatkan penawaran yang aman dan
            menguntungkan.
          </Text>
          <SimpleGrid columns={{ base: 1, md: 3 }}  spacing={8}>
            {[
              "Financier terdaftar dan diawasi OJK.",
              "Pinjaman yang cair hingga 1 Miliar Rupiah*.",
              "Dipercaya oleh ratusan agen dan pelanggan di berbagai daerah.",
            ].map((point) => (
              <Box
                key={point}
                p={6}
                m={2}
                bg="gray.50"
                rounded="xl"
                borderWidth="1px"
                borderColor="gray.100"
              >
                <Text color="gray.700">{point}</Text>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Testimonial */}
      <Container maxW="6xl" py={16}>
        <Heading textAlign="center" mb={4} fontSize="2xl">
          Testimonial
        </Heading>
        <Text textAlign="center" color="gray.600" mb={10}>
          Apa pendapat pelanggan tentang kami.
        </Text>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          {[
            {
              quote:
                "Dana cepat cair, proses sangat mudah. Terima kasih DanaAuto Finance!",
              name: "Budi Santoso",
              car: "Toyota Avanza",
            },
            {
              quote:
                "Proses cepat, mobil tetap bisa digunakan. Sangat puas dengan pelayanannya.",
              name: "Rina Sari",
              car: "Honda Brio",
            },
            {
              quote:
                "Cepat dan praktis, tanpa ribet. Sangat direkomendasikan untuk kebutuhan dana darurat.",
              name: "Agus Pratama",
              car: "Suzuki Ertiga",
            },
            {
              quote:
                "Mobil tetap bisa dipakai, dan dana cair cepat. Layanan benar-benar membantu.",
              name: "Siti Nuraini",
              car: "Daihatsu Xenia",
            },
          ].map((item) => (
            <Box
              key={item.name + item.car}
              p={7}
              m={2}
              bg="white"
              rounded="2xl"
              boxShadow="md"
              borderWidth="1px"
              borderColor="gray.100"
            >
              <Text color="gray.700" mb={4}>
                “{item.quote}”
              </Text>
              <Text fontWeight="semibold" color="gray.900">
                {item.name}
              </Text>
              <Text fontSize="sm" color="gray.500">
                {item.car}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Container>

      {/* Persyaratan & Dokumen */}
      <Box bg="gray.50" py={16}>
        <Container maxW="6xl">
          <Heading textAlign="center" mb={4} fontSize="2xl">
            Persyaratan pinjaman & dokumen yang diperlukan
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} mt={8}>
            <Box
              p={7}
              bg="white"
              rounded="2xl"
              m={2}
              boxShadow="sm"
              borderWidth="1px"
              borderColor="gray.100"
            >
              <Heading size="md" mb={4}>
                Persyaratan 👍
              </Heading>
              <VStack align="flex-start" spacing={2}>
                {["WNI", "Minimal usia 21 tahun", "Memiliki penghasilan tetap", "Dokumen pendukung lainnya"].map(
                  (item) => (
                    <Text key={item} color="gray.700">
                      • {item}
                    </Text>
                  )
                )}
              </VStack>
            </Box>
            <Box
              p={7}
              bg="white"
              rounded="2xl"
              m={2}
              boxShadow="sm"
              borderWidth="1px"
              borderColor="gray.100"
            >
              <Heading size="md" mb={4}>
                Dokumen 📃
              </Heading>
              <VStack align="flex-start" spacing={2}>
                {[
                  "KTP",
                  "KTP Pasangan (jika sudah menikah)",
                  "Kartu Keluarga (KK)",
                  "STNK & dokumen kendaraan terkait",
                ].map((item) => (
                  <Text key={item} color="gray.700">
                    • {item}
                  </Text>
                ))}
              </VStack>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* FAQ singkat */}
      <Box bg="white" py={16}>
        <Container maxW="6xl">
          <Heading textAlign="center" mb={4} fontSize="2xl">
            Pertanyaan yang Sering Diajukan
          </Heading>
          <Accordion.Root multiple collapsible>
            {[
              {
                q: "Apa itu Kredit Multiguna?",
                a: "Produk pinjaman dengan agunan/jaminan, misalnya kendaraan. Besar pinjaman disesuaikan dengan nilai jaminan yang Anda miliki.",
              },
              {
                q: "Berapa nilai mobil saya yang dapat saya pinjam?",
                a: "Melalui layanan seperti DanaAuto Finance, Anda umumnya dapat meminjam hingga sekitar 80–85% dari nilai taksiran mobil Anda.",
              },
              {
                q: "Berapa lama proses persetujuan dan pencairan?",
                a: "Setelah dokumen lengkap, persetujuan biasanya memakan waktu beberapa hari kerja, dan dana segera dicairkan setelah disetujui.",
              },
              {
                q: "Apakah saya tetap dapat menggunakan kendaraan saya?",
                a: "Ya, kendaraan tetap dapat digunakan selama masa pinjaman, sementara BPKB dijadikan agunan oleh pemodal.",
              },
            ].map((item, index) => (
              <Accordion.Item key={index} _hover={{ bg: "gray.100" }} p={3} value={index.toString()}>
                <Accordion.ItemTrigger>
                  <Text fontWeight="semibold" color="gray.900">
                    {item.q}
                  </Text>
                </Accordion.ItemTrigger>

                <Accordion.ItemContent>
                  <Text color="gray.700" pt={2}>
                    {item.a}
                  </Text>
                </Accordion.ItemContent>
              </Accordion.Item>
            ))}
          </Accordion.Root>

        </Container>
      </Box>
      
    </Box>
  );
};
