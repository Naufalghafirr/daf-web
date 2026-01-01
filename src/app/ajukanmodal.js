"use client";
import { Dialog, Portal, VStack, Field, Input, Button, Text, Textarea, Select } from "@chakra-ui/react";
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
    
    // Vehicle form states
    const [jenisKendaraan, setJenisKendaraan] = useState("");
    const [merkKendaraan, setMerkKendaraan] = useState("");
    const [typeKendaraan, setTypeKendaraan] = useState("");
    const [platNomor, setPlatNomor] = useState("");
    const [tahunKendaraan, setTahunKendaraan] = useState("");
    
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

*Data Pribadi:*
• Nama Lengkap: ${nama || "-"}
• Kota Domisili: ${kota || "-"}
• No. HP: ${noHp || "-"}
• Email: ${email || "-"}

*Data Kendaraan & Simulasi:*
${modalData?.carData ? `• Mobil: ${modalData.carData.mobil}
• Pinjaman: Rp ${modalData.carData.pinjaman?.toLocaleString("id-ID")}
• Tenor: ${modalData.carData.tenor} bulan` : mobilDituju || "-"}

${jenisKendaraan ? `
*Data Kendaraan Manual:*
• Jenis Kendaraan: ${jenisKendaraan === "mobil" ? "Mobil" : "Motor"}
• Merk: ${merkKendaraan || "-"}
• Type: ${typeKendaraan || "-"}
• Plat Nomor: ${platNomor || "-"}
• Tahun: ${tahunKendaraan || "-"}` : ""}

*Pertanyaan/Pesan:*
${pertanyaan || "-"}

---
Form ini dikirim dari hasil simulasi website DanaAuto Finance. Mohon segera diproses dan follow up ke customer. Terima kasih!`;
        } else {
            text = `📝 *Form Pengajuan - DanaAuto Finance*

*Data Pribadi:*
• Nama Lengkap: ${nama || "-"}
• Kota Domisili: ${kota || "-"}
• No. HP: ${noHp || "-"}
• Email: ${email || "-"}

${jenisKendaraan ? `*Data Kendaraan:*
• Jenis Kendaraan: ${jenisKendaraan === "mobil" ? "Mobil" : "Motor"}
• Merk: ${merkKendaraan || "-"}
• Type: ${typeKendaraan || "-"}
• Plat Nomor: ${platNomor || "-"}
• Tahun: ${tahunKendaraan || "-"}` : ""}*Pertanyaan/Pengajuan:*
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
        // Reset vehicle form
        setJenisKendaraan("");
        setMerkKendaraan("");
        setTypeKendaraan("");
        setPlatNomor("");
        setTahunKendaraan("");
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

                <Field.Root>
                    <Field.Label>Pilih jenis kendaraan</Field.Label>
                    <select
                        value={jenisKendaraan}
                        onChange={(e) => setJenisKendaraan(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "8px 12px",
                            border: "1px solid #e2e8f0",
                            borderRadius: "6px",
                            fontSize: "14px",
                            backgroundColor: "white",
                            outline: "none",
                            transition: "border-color 0.2s"
                        }}
                        onFocus={(e) => e.target.style.borderColor = "#3182ce"}
                        onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
                    >
                        <option value="">Pilih</option>
                        <option value="mobil">Mobil</option>
                        <option value="motor">Motor</option>
                    </select>
                </Field.Root>

                {jenisKendaraan && (
                    <>
                        <Field.Root>
                            <Field.Label>Merk Kendaraan *</Field.Label>
                            <Input
                                placeholder={jenisKendaraan === "mobil" ? "Contoh: Toyota, Honda, Mitsubishi" : "Contoh: Honda, Yamaha, Suzuki"}
                                value={merkKendaraan}
                                onChange={(e) => setMerkKendaraan(e.target.value)}
                            />
                        </Field.Root>

                        <Field.Root>
                            <Field.Label>Type Kendaraan *</Field.Label>
                            <Input
                                placeholder={jenisKendaraan === "mobil" ? "Contoh: Avanza, Civic, Pajero" : "Contoh: Beat, Nmax, Vixion"}
                                value={typeKendaraan}
                                onChange={(e) => setTypeKendaraan(e.target.value)}
                            />
                        </Field.Root>

                        <Field.Root>
                            <Field.Label>Plat Nomor *</Field.Label>
                            <Input
                                placeholder="Contoh: B 1234 ABC atau DK 5678 XYZ"
                                value={platNomor}
                                onChange={(e) => setPlatNomor(e.target.value)}
                            />
                        </Field.Root>

                        <Field.Root>
                            <Field.Label>Tahun Kendaraan *</Field.Label>
                            <select
                                value={tahunKendaraan}
                                onChange={(e) => setTahunKendaraan(e.target.value)}
                                style={{
                                    width: "100%",
                                    padding: "8px 12px",
                                    border: "1px solid #e2e8f0",
                                    borderRadius: "6px",
                                    fontSize: "14px",
                                    backgroundColor: "white",
                                    outline: "none",
                                    transition: "border-color 0.2s"
                                }}
                                onFocus={(e) => e.target.style.borderColor = "#3182ce"}
                                onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
                            >
                                <option value="">Pilih tahun</option>
                                {Array.from({ length: 35 }, (_, i) => {
                                    const year = new Date().getFullYear() - i;
                                    return <option key={year} value={year}>{year}</option>;
                                })}
                            </select>
                        </Field.Root>
                    </>
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
                    isDisabled={!nama || !kota || !noHp || (!withCarData && !pertanyaan) || (jenisKendaraan && (!merkKendaraan || !typeKendaraan || !platNomor || !tahunKendaraan))}
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