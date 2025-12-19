"use client";

import { Box, Container, Heading, Text, VStack, Link } from "@chakra-ui/react";
import { useState, useEffect } from "react";

export default function PrivacyPolicy() {
    const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <Box bg="gray.50" minH="100vh" py={16}>
      <Container maxW="4xl">
        <Heading mb={6} fontSize={{ base: "2xl", md: "3xl" }} textAlign="center" color="green.600">
          Privacy Policy
        </Heading>

        <VStack align="stretch" spacing={6}>
          <Box>
            <Heading size="md" mb={2}>Informasi yang Kami Kumpulkan</Heading>
            <Text color="gray.700">
              DanaAuto Finance mengumpulkan informasi pribadi seperti nama, alamat, nomor telepon, email, dan data finansial Anda untuk memproses pengajuan pembiayaan serta meningkatkan layanan kami.
            </Text>
          </Box>

          <Box>
            <Heading size="md" mb={2}>Penggunaan Informasi</Heading>
            <Text color="gray.700">
              Informasi Anda digunakan untuk:
            </Text>
            <Text color="gray.700" ml={4}>
              • Memproses pengajuan pembiayaan.<br />
              • Memberikan informasi dan penawaran produk.<br />
              • Meningkatkan pengalaman pengguna di platform DAF.<br />
              • Memenuhi kewajiban hukum dan regulasi.
            </Text>
          </Box>

          <Box>
            <Heading size="md" mb={2}>Penyimpanan dan Keamanan</Heading>
            <Text color="gray.700">
              Kami menjaga keamanan data Anda dengan prosedur teknis dan administratif yang sesuai. Data akan disimpan selama diperlukan untuk tujuan pemrosesan dan sesuai peraturan yang berlaku.
            </Text>
          </Box>

          <Box>
            <Heading size="md" mb={2}>Berbagi Informasi</Heading>
            <Text color="gray.700">
              Data pribadi Anda tidak akan dijual. Kami hanya berbagi informasi dengan mitra lembaga keuangan resmi yang membantu proses pembiayaan dan sesuai persetujuan Anda.
            </Text>
          </Box>

          <Box>
            <Heading size="md" mb={2}>Hak Anda</Heading>
            <Text color="gray.700">
              Anda berhak untuk meminta akses, perbaikan, atau penghapusan data pribadi Anda. Untuk pertanyaan atau permintaan terkait data, hubungi kami di <strong>support@danaauto.finance</strong>.
            </Text>
          </Box>

          <Box>
            <Heading size="md" mb={2}>Perubahan Privacy Policy</Heading>
            <Text color="gray.700">
              DAF dapat memperbarui kebijakan ini sewaktu-waktu. Perubahan akan diberitahukan melalui website atau email resmi kami.
            </Text>
          </Box>

          <Box>
            <Heading size="md" mb={2}>Kontak</Heading>
            <Text color="gray.700">
              Untuk pertanyaan lebih lanjut, hubungi kami di: <br />
              Email: <Link _hover={{ color: "blue.500", textDecoration: "none"}} color="gray.700" href="mailto:support@danaauto.finance">support@danaauto.finance</Link> <br />
              Telepon: <Link _hover={{ color: "blue.500", textDecoration: "none", }} color="gray.700" href="https://wa.me/62895418048787">+62 895-4180-48787 </Link> <br />
              Alamat: Jl. Raya Kranggan No. 123, Kota Bekasi, Jawa Barat 17435
            </Text>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
