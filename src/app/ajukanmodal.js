"use client";
import { Dialog, Portal, VStack, Field, Input, Button, Text, Textarea } from "@chakra-ui/react";
import { IoIosSend } from "react-icons/io";
import { useState, useEffect } from "react";

function AjukanModal({isOpen, setOpen, modalData}){
    const [nama, setNama] = useState("");
    const [kota, setKota] = useState("");
    const [noHp, setNoHp] = useState("");
    const [email, setEmail] = useState("");
    const [mobilDituju, setMobilDituju] = useState("");
    const [pertanyaan, setPertanyaan] = useState("");
    const [withCarData, setWithCarData] = useState(false);
    
    // Search states
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        if (modalData) {
            setWithCarData(modalData.withCarData);
            if (modalData.withCarData && modalData.carData) {
                const carInfo = modalData.carData;
                setMobilDituju(`${carInfo.mobil} (Pinjaman: Rp ${carInfo.pinjaman?.toLocaleString("id-ID")}, Tenor: ${carInfo.tenor} bulan, Cicilan: Rp ${carInfo.cicilan?.toLocaleString("id-ID")}/bulan)`);
                setPertanyaan(`Saya tertarik dengan pembiayaan mobil ${carInfo.mobil} dengan detail:\n• Pinjaman: Rp ${carInfo.pinjaman?.toLocaleString("id-ID")}\n• Tenor: ${carInfo.tenor} bulan\n• Cicilan: Rp ${carInfo.cicilan?.toLocaleString("id-ID")}/bulan\n\nMohon informasi lebih lanjut.`);
            }
        }
    }, [modalData]);

    // Search cities
    useEffect(() => {
        if (searchQuery.length < 2) {
            setSearchResults([]);
            setShowSearchResults(false);
            return;
        }

        const searchCities = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
                const data = await response.json();
                setSearchResults(data);
                setShowSearchResults(true);
            } catch (error) {
                console.error('Error searching cities:', error);
                setSearchResults([]);
            } finally {
                setLoading(false);
            }
        };

        const timeoutId = setTimeout(searchCities, 300);
        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    const handleCitySelect = (city) => {
        const cityName = city.display_name.split(',')[0];
        setKota(cityName);
        setSearchQuery(cityName);
        setShowSearchResults(false);
        setSearchResults([]);
    };
    
    const handleApplySubmit = () => {
        const baseUrl = "https://wa.me/6281289415350";
        
        let text = "";
        if (withCarData) {
            text = `🚗 *Form Ajukan Pembiayaan - DanaAuto Finance*

👤 *Data Pribadi:*
• Nama Lengkap: ${nama || "-"}
• Kota Domisili: ${kota || "-"}
• No. HP: ${noHp || "-"}
• Email: ${email || "-"}

🚙 *Data Kendaraan & Simulasi:*
${modalData?.carData ? `• Mobil: ${modalData.carData.mobil}
• Pinjaman: Rp ${modalData.carData.pinjaman?.toLocaleString("id-ID")}
• Tenor: ${modalData.carData.tenor} bulan
• Cicilan: Rp ${modalData.carData.cicilan?.toLocaleString("id-ID")}/bulan` : mobilDituju || "-"}

💬 *Pertanyaan/Pesan:*
${pertanyaan || "-"}

---
Form ini dikirim dari hasil simulasi website DanaAuto Finance. Mohon segera diproses dan follow up ke customer. Terima kasih!`;
        } else {
            text = `📝 *Form Pengajuan - DanaAuto Finance*

👤 *Data Pribadi:*
• Nama Lengkap: ${nama || "-"}
• Kota Domisili: ${kota || "-"}
• No. HP: ${noHp || "-"}
• Email: ${email || "-"}

💬 *Pertanyaan/Pengajuan:*
${pertanyaan || "-"}

---
Form ini dikirim melalui website DanaAuto Finance. Mohon segera diproses dan follow up ke customer. Terima kasih!`;
        }
        
        const url = `${baseUrl}?text=${encodeURIComponent(text)}`;
        if (typeof window !== "undefined") {
          window.open(url, "_blank");
        }
      };
      
    const handleClose = () => {
        setOpen(false);
        // Reset form
        setNama("");
        setKota("");
        setSearchQuery("");
        setNoHp("");
        setEmail("");
        setMobilDituju("");
        setPertanyaan("");
        setWithCarData(false);
        setShowSearchResults(false);
        setSearchResults([]);
    };
    
    return (
        <Dialog.Root open={isOpen} onOpenChange={(e) => !e.open && handleClose()}>
        <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
            <Dialog.Content>
            <Dialog.Header>
                <Dialog.Title>
                    {withCarData ? "🚗 Ajukan Pembiayaan Ini" : "📝 Ajukan Pertanyaan"}
                </Dialog.Title>
            </Dialog.Header>

            <Dialog.Body pb={4}>
                <VStack spacing={4} align="stretch">
                <Field.Root>
                    <Field.Label>Nama Lengkap *</Field.Label>
                    <Input
                    placeholder="Masukkan nama lengkap Anda"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    />
                </Field.Root>

                <Field.Root>
                    <Field.Label>Kota Domisili *</Field.Label>
                    <div style={{ position: "relative" }}>
                        <Input
                        placeholder="Ketik nama kota..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => searchQuery.length >= 2 && setShowSearchResults(true)}
                        onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
                        />
                        {showSearchResults && (
                            <div style={{
                                position: "absolute",
                                top: "100%",
                                left: 0,
                                right: 0,
                                background: "white",
                                border: "1px solid #e2e8f0",
                                borderRadius: "8px",
                                maxHeight: "200px",
                                overflowY: "auto",
                                zIndex: 1000,
                                boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
                            }}>
                                {loading ? (
                                    <div style={{ padding: "12px", color: "#718096" }}>Mencari...</div>
                                ) : searchResults.length > 0 ? (
                                    searchResults.map((city, index) => (
                                        <div
                                            key={index}
                                            onClick={() => handleCitySelect(city)}
                                            style={{
                                                padding: "12px",
                                                cursor: "pointer",
                                                borderBottom: "1px solid #f7fafc",
                                                fontSize: "14px"
                                            }}
                                            onMouseOver={(e) => e.currentTarget.style.background = "#f7fafc"}
                                            onMouseOut={(e) => e.currentTarget.style.background = "white"}
                                        >
                                            {city.display_name}
                                        </div>
                                    ))
                                ) : searchQuery.length >= 2 ? (
                                    <div style={{ padding: "12px", color: "#718096" }}>Kota tidak ditemukan</div>
                                ) : null}
                            </div>
                        )}
                    </div>
                </Field.Root>

                <Field.Root>
                    <Field.Label>No. WhatsApp *</Field.Label>
                    <Input
                    placeholder="Masukkan nomor WhatsApp aktif Anda"
                    value={noHp}
                    onChange={(e) => setNoHp(e.target.value)}
                    />
                </Field.Root>

                <Field.Root>
                    <Field.Label>Email</Field.Label>
                    <Input
                    type="email"
                    placeholder="Masukkan email Anda (opsional)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </Field.Root>

                {!withCarData && (
                    <Field.Root>
                        <Field.Label>Mobil yang Dituju (opsional)</Field.Label>
                        <Input
                        placeholder="Contoh: Toyota Avanza, Honda Civic, dll"
                        value={mobilDituju}
                        onChange={(e) => setMobilDituju(e.target.value)}
                        />
                    </Field.Root>
                )}

                <Field.Root>
                    <Field.Label>{withCarData ? "Pesan Tambahan" : "Pertanyaan atau Pengajuan"} *</Field.Label>
                    <Textarea
                    placeholder={withCarData ? "Ada pertanyaan tambahan tentang simulasi ini?" : "Ada pertanyaan atau permintaan khusus? Tulis di sini..."}
                    value={pertanyaan}
                    onChange={(e) => setPertanyaan(e.target.value)}
                    rows={3}
                    />
                </Field.Root>

                <Text fontSize="xs" color="gray.500" bg="gray.50" p={3} borderRadius="md">
                    📋 Data ini akan dikirim ke WhatsApp tim DanaAuto Finance agar kami dapat menghubungi Anda dan memberikan penawaran terbaik. Pastikan data yang Anda masukkan sudah benar.
                </Text>
                </VStack>
            </Dialog.Body>

            <Dialog.Footer>
                <Dialog.CloseTrigger asChild>
                <Button variant="ghost" colorScheme="gray">Batal</Button>
                </Dialog.CloseTrigger>

                <Button 
                    colorScheme="green" 
                    bg="green.500" 
                    color="white" 
                    _hover={{ bg: "green.600" }} 
                    onClick={handleApplySubmit}
                    leftIcon={<IoIosSend />}
                    isDisabled={!nama || !kota || !noHp || (!withCarData && !pertanyaan)}
                >
                    Kirim ke WhatsApp
                </Button>
            </Dialog.Footer>
            </Dialog.Content>
        </Dialog.Positioner>
        </Portal>
    </Dialog.Root>
    );
}

export default AjukanModal;