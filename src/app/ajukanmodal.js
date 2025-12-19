"use client";
import { Dialog, Portal, VStack, Field, Input, Button, Text } from "@chakra-ui/react";
import { IoIosSend } from "react-icons/io";
import { useState } from "react";

function AjukanModal({isOpen, setOpen}){
    const [nama, setNama] = useState("");
    const [kota, setKota] = useState("");
    const handleApplySubmit = () => {
        const baseUrl = "https://wa.me/6281289415350";
        const text = `Halo DanaAuto Finance, saya ingin mengajukan pembiayaan.\n\nNama: ${nama || "-"}\nKota: ${kota || "-"}\n\nMohon informasi lebih lanjut.`;
        const url = `${baseUrl}?text=${encodeURIComponent(text)}`;
        if (typeof window !== "undefined") {
          window.open(url, "_blank");
        }
      };
    return (
        <Dialog.Root open={isOpen} onOpenChange={(e) => setOpen(e.open)}>
        <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
            <Dialog.Content>
            <Dialog.Header>
                <Dialog.Title>Ajukan Pembiayaan</Dialog.Title>
            </Dialog.Header>

            <Dialog.Body pb={4}>
                <VStack spacing={4} align="stretch">
                <Field.Root>
                    <Field.Label>Nama Lengkap</Field.Label>
                    <Input
                    placeholder="Masukkan nama Anda"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    />
                </Field.Root>

                <Field.Root>
                    <Field.Label>Kota Domisili</Field.Label>
                    <Input
                    placeholder="Masukkan kota domisili Anda (contoh: Jakarta, Bekasi, Depok)"
                    value={kota}
                    onChange={(e) => setKota(e.target.value)}
                    />
                </Field.Root>

                <Text fontSize="xs" color="gray.500">
                    Data ini akan dikirim ke WhatsApp tim DanaAuto Finance agar kami dapat
                    menghubungi Anda dan memberikan penawaran terbaik.
                </Text>
                </VStack>
            </Dialog.Body>

            <Dialog.Footer>
                <Dialog.CloseTrigger asChild>
                <Button variant="ghost">x</Button>
                </Dialog.CloseTrigger>

                <Button colorScheme="blue" bg="green.500" color="white" _hover={{ bg: "green.600" }} onClick={handleApplySubmit}>
                <IoIosSend  /> Kirim
                </Button>
            </Dialog.Footer>
            </Dialog.Content>
        </Dialog.Positioner>
        </Portal>
    </Dialog.Root>
    );
}

export default AjukanModal;