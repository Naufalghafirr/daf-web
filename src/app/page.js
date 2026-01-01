"use client";

import { useState, useEffect } from "react";
import { Spinner } from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  FaBolt,
  FaUsers,
  FaCheck,
  FaShieldAlt,
  FaClipboardList,
  FaCoins,
  FaCogs,
  FaCarSide,
  FaPhoneAlt,
  FaHome,
  FaArrowRight,
  FaFileAlt,
} from "react-icons/fa";
import AjukanModal from "./ajukanmodal.js";
import carData from "./assets/car-data.json";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [pinjaman, setPinjaman] = useState("");
  const [bunga] = useState(0.76);
  const [tenor, setTenor] = useState("");
  const [cicilan, setCicilan] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [openFaq, setOpenFaq] = useState([]);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [highlight, setHighlight] = useState(-1);
  const [selectedIdx, setSelectedIdx] = useState(-1);
  const [loading, setLoading] = useState(false);

  const [openRegion, setOpenRegion] = useState(false);
  const [focused, setFocused] = useState(false);

  // Car selection states
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedCar, setSelectedCar] = useState(null);
  const [carBrands, setCarBrands] = useState([]);
  const [carTypes, setCarTypes] = useState([]);
  const [carModels, setCarModels] = useState([]);
  const [loadingCars, setLoadingCars] = useState(false);

  // Focus states for dropdowns
  const [brandFocused, setBrandFocused] = useState(false);
  const [typeFocused, setTypeFocused] = useState(false);
  const [modelFocused, setModelFocused] = useState(false);

  // Initialize car data from car-data.json
  useEffect(() => {
    const initializeCarData = () => {
      try {
        setLoadingCars(true);
        
        // Extract brands from car-data.json
        const brands = carData.brands.map((brand) => ({
          id: brand.brand,
          name: brand.brand,
          logo: brand.brand_info?.logo || "🚗",
          info: brand.brand_info
        }));
        
        setCarBrands(brands.sort((a, b) => a.name.localeCompare(b.name)));
      } catch (error) {
        console.error("Error initializing car data:", error);
      } finally {
        setLoadingCars(false);
      }
    };

    initializeCarData();
  }, []);

  // Fetch types when brand is selected
  useEffect(() => {
    if (selectedBrand) {
      const fetchCarTypes = () => {
        try {
          setLoadingCars(true);
          
          // Find selected brand data
          const selectedBrandData = carData.brands.find(b => b.brand === selectedBrand);
          if (!selectedBrandData) {
            setCarTypes([]);
            return;
          }
          
          // Extract types from car-data.json
          const types = selectedBrandData.types.map((type, index) => ({
            id: `${selectedBrand}-${type.type}`,
            name: type.type,
            models: type.models
          }));
          
          setCarTypes(types);
          setCarModels([]);
        } catch (error) {
          console.error("Error fetching car types:", error);
        } finally {
          setLoadingCars(false);
        }
      };

      fetchCarTypes();
    }
  }, [selectedBrand]);

  // Fetch models when type is selected
  useEffect(() => {
    if (selectedBrand && selectedType) {
      const fetchCarModels = () => {
        try {
          setLoadingCars(true);
          
          // Find selected type to get the models
          const selectedTypeData = carTypes.find(t => t.id === selectedType);
          if (!selectedTypeData || !selectedTypeData.models) {
            setCarModels([]);
            return;
          }
          
          // Extract models from car-data.json
          const models = selectedTypeData.models.map((model, index) => {
            // Parse price range to get average price
            const priceRange = model.price_new.split('-');
            const minPrice = parseInt(priceRange[0].replace(/\D/g, ''));
            const maxPrice = priceRange[1] ? parseInt(priceRange[1].replace(/\D/g, '')) : minPrice;
            const avgPrice = Math.floor((minPrice + maxPrice) / 2);
            
            return {
              id: `${selectedBrand}-${selectedTypeData.name}-${model.model}`,
              name: model.model,
              price: avgPrice,
              price_range: model.price_new,
              market_price_used: model.market_price_used,
              description: model.description,
              specs: model.specs,
              image: "🚗"
            };
          });
          
          setCarModels(models);
        } catch (error) {
          console.error("Error fetching car models:", error);
        } finally {
          setLoadingCars(false);
        }
      };

      fetchCarModels();
    }
  }, [selectedBrand, selectedType, carTypes]);

  // Handle brand selection
  const handleBrandSelect = (brandId) => {
    setSelectedBrand(brandId);
    setSelectedType("");
    setSelectedCar(null);
    setPinjaman("");
    setCicilan(null);
    setTenor("");
  };

  // Handle type selection
  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setSelectedCar(null);
    setPinjaman("");
    setCicilan(null);
    setTenor("");
  };

  // Handle car selection
  const handleCarSelect = (car) => {
    setSelectedCar(car);
    setPinjaman(""); // Kosongkan awalnya
    setCicilan(null);
    setTenor("");
  };

  // Handle maksimal pinjaman
  const handleMaxPinjaman = () => {
    if (selectedCar) {
      const maxPinjaman = Math.floor(selectedCar.price * 0.8);
      setPinjaman(maxPinjaman.toString());
    }
  };

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
    } else {
      setCicilan(null);
    }

    if (!query) {
      setSearchResults([]);
      return;
    }

    const fetchResults = setTimeout(async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        setSearchResults(data);
        
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(fetchResults);
  }, [pinjaman, bunga, tenor, query]);

  const handleSelect = (item) => {
    setQuery(item.display_name);
    setSearchResults([]);
    setOpenRegion(false);
    setSelectedIdx(-1);
  };

  const selectAddress = (e) => {
    if (!searchResults.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIdx((prev) => (prev < searchResults.length - 1 ? prev + 1 : prev));
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIdx((prev) => (prev > 0 ? prev - 1 : 0));
    }

    if (e.key === "Enter" && selectedIdx >= 0) {
      e.preventDefault();
      handleSelect(searchResults[selectedIdx]);
    }
  };

  const toggleFaq = (index) => {
    setOpenFaq((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  if (!mounted) return null;

  const features = [
    {
      icon: <FaBolt />,
      title: "Proses Digital",
      desc: "Proses digital tanpa kertas termasuk verifikasi panggilan dan penyerahan dokumen secara daring.",
      color: "#3b82f6",
    },
    {
      icon: <FaUsers />,
      title: "Banyak Pilihan Mitra",
      desc: "Penawaran pinjaman dari lebih dari 10 mitra lembaga keuangan dengan beragam pilihan.",
      color: "#a855f7",
    },
    {
      icon: <FaCheck />,
      title: "Persetujuan Cepat",
      desc: "Lengkapi aplikasi untuk mendapatkan pencairan pinjaman cepat, mulai dari 48 jam*.",
      color: "#10b981",
    },
    {
      icon: <FaShieldAlt />,
      title: "Transparansi Lengkap",
      desc: "Semua syarat & ketentuan ditampilkan di muka agar Anda tetap terinformasi di setiap langkah.",
      color: "#f97316",
    },
  ];

  const steps = [
    {
      title: "Ajukan & Verifikasi",
      desc: "Bagikan detail dasar dan sediakan dokumen dasar kendaraan serta data pribadi Anda.",
      icon: <FaClipboardList />,
    },
    {
      title: "Tentukan Kebutuhan",
      desc: "Tentukan persyaratan pinjaman sesuai kebutuhan dalam batas yang disetujui.",
      icon: <FaCoins />,
    },
    {
      title: "Proses Berlangsung",
      desc: "Serahkan koordinasi kepada kami dan mitra lembaga keuangan untuk proses lebih lanjut.",
      icon: <FaCogs />,
    },
    {
      title: "Dana Cair",
      desc: "Terima penawaran pinjaman paling menguntungkan, akses dana, dan tetap kendarai kendaraan Anda.",
      icon: <FaCarSide />,
    },
  ];

  const guarantees = [
    {
      title: "Terdaftar & Diawasi OJK",
      desc: "Financier terdaftar dan diawasi OJK untuk keamanan dan kenyamanan Anda.",
      icon: <FaShieldAlt />,
    },
    {
      title: "Pinjaman Hingga 1 Miliar",
      desc: "Pinjaman yang cair hingga 1 Miliar Rupiah* untuk kebutuhan Anda.",
      icon: <FaCoins />,
    },
    {
      title: "Terpercaya Luas",
      desc: "Dipercaya oleh ratusan agen dan pelanggan di berbagai daerah.",
      icon: <FaCheck />,
    },
  ];

  const testimonials = [
    {
      quote: "Dana cepat cair, proses sangat mudah. Terima kasih DanaAuto Finance!",
      name: "Budi Santoso",
      car: "Toyota Avanza",
      rating: 5,
    },
    {
      quote: "Proses cepat, mobil tetap bisa digunakan. Sangat puas dengan pelayanannya.",
      name: "Rina Sari",
      car: "Honda Brio",
      rating: 5,
    },
    {
      quote: "Cepat dan praktis, tanpa ribet. Sangat direkomendasikan untuk kebutuhan dana darurat.",
      name: "Agus Pratama",
      car: "Suzuki Ertiga",
      rating: 5,
    },
    {
      quote: "Mobil tetap bisa dipakai, dan dana cair cepat. Layanan benar-benar membantu.",
      name: "Siti Nuraini",
      car: "Daihatsu Xenia",
      rating: 5,
    },
  ];

  const faqs = [
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
  ];

  return (
    <div style={{ background: "white", minHeight: "100vh", overflow: "hidden" }} id="home">
      {/* Hero Section */}
      <div
        style={{
          position: "relative",
          background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
          padding: "96px 0",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0, opacity: 0.1 }}>
          <div
            style={{
              position: "absolute",
              top: "10%",
              left: "5%",
              width: "400px",
              height: "400px",
              background: "white",
              borderRadius: "50%",
              filter: "blur(100px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "10%",
              right: "5%",
              width: "500px",
              height: "500px",
              background: "white",
              borderRadius: "50%",
              filter: "blur(120px)",
            }}
          />
        </div>

        <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1, padding: "0 32px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "64px", alignItems: "center" }}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              style={{ display: "flex", flexDirection: "column", gap: "32px" }}
            >
              <span
                style={{
                  background: "white",
                  color: "#15803d",
                  padding: "8px 16px",
                  borderRadius: "999px",
                  fontSize: "14px",
                  fontWeight: "600",
                  width: "fit-content",
                }}
              >
                 Pembiayaan Kendaraan Terpercaya
              </span>

              <h1
                style={{
                  fontSize: "clamp(36px, 5vw, 60px)",
                  color: "white",
                  lineHeight: "1.2",
                  fontWeight: "800",
                  margin: 0,
                }}
              >
                Pembiayaan Mobil{" "}
                <span style={{ color: "#a7f3d0" }}>Cepat & Mudah</span>
              </h1>

              <p style={{ fontSize: "20px", color: "#d1fae5", lineHeight: "1.8", maxWidth: "550px", margin: 0 }}>
                Bunga kompetitif mulai dari 0.76%, proses digital yang cepat, dan pencairan dana
                hingga 1 Miliar. Kendaraan tetap bisa digunakan!
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
                <button
                  onClick={() => setModalOpen(true)}
                  style={{
                    background: "white",
                    color: "#15803d",
                    padding: "16px 32px",
                    fontSize: "18px",
                    fontWeight: "700",
                    borderRadius: "12px",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.3s",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                  onMouseOver={(e) => (e.target.style.transform = "translateY(-2px)")}
                  onMouseOut={(e) => (e.target.style.transform = "translateY(0)")}
                >
                  Ajukan Sekarang
                </button>
              </div>

            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ position: "relative" }}
            >
              <div
                style={{
                  borderRadius: "24px",
                  overflow: "hidden",
                  boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
                  transform: "rotate(-2deg)",
                  transition: "transform 0.3s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.transform = "rotate(0deg) scale(1.02)")}
                onMouseOut={(e) => (e.currentTarget.style.transform = "rotate(-2deg)")}
              >
                <img
                  src="/images/hero-section.png"
                  alt="Pembiayaan Kendaraan"
                  style={{ width: "100%", height: "450px", objectFit: "cover", display: "block" }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 60%)",
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div style={{ padding: "96px 0", background: "#f9fafb" }} id="keunggulan_kami">
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 32px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "64px" }}>
            <div style={{ textAlign: "center", maxWidth: "768px", margin: "0 auto" }}>
              <span
                style={{
                  background: "#d1fae5",
                  color: "#15803d",
                  padding: "6px 16px",
                  borderRadius: "999px",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                Keunggulan Kami
              </span>
              <h2 style={{ fontSize: "clamp(32px, 4vw, 48px)", color: "#111827", margin: "16px 0" }}>
                Kenapa Memilih <span style={{ color: "#10b981" }}>DanaAuto Finance</span>?
              </h2>
              <p style={{ fontSize: "18px", color: "#6b7280", lineHeight: "1.8" }}>
                Solusi pembiayaan terpercaya dengan proses yang mudah dan transparan
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  style={{
                    background: "white",
                    padding: "32px",
                    borderRadius: "16px",
                    border: "1px solid #e5e7eb",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "-20px",
                      right: "-20px",
                      width: "80px",
                      height: "80px",
                      background: `${feature.color}20`,
                      borderRadius: "50%",
                      opacity: 0.5,
                    }}
                  />
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px", position: "relative" }}>
                    <div
                      style={{
                        background: feature.color,
                        color: "white",
                        width: "48px",
                        height: "48px",
                        borderRadius: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "24px",
                      }}
                    >
                      {feature.icon}
                    </div>
                    <h3 style={{ fontSize: "20px", color: "#111827", margin: 0 }}>{feature.title}</h3>
                    <p style={{ color: "#6b7280", lineHeight: "1.8", fontSize: "14px", margin: 0 }}>
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Steps Section */}
      <div style={{ padding: "96px 0", background: "#111827", color: "white" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 32px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "64px" }}>
            <div style={{ textAlign: "center" }}>
              <span
                style={{
                  background: "#10b981",
                  color: "white",
                  padding: "6px 16px",
                  borderRadius: "999px",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                Cara Kerja
              </span>
              <h2 style={{ fontSize: "clamp(32px, 4vw, 48px)", margin: "16px 0" }}>
                4 Langkah Mudah Mendapatkan Dana
              </h2>
              <p style={{ fontSize: "18px", color: "#9ca3af", maxWidth: "768px", margin: "0 auto" }}>
                Proses yang sederhana dan transparan untuk kebutuhan pembiayaan Anda
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "32px" }}>
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  style={{ position: "relative", textAlign: "center" }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: "24px", alignItems: "center" }}>
                    <div
                      style={{
                        position: "relative",
                        width: "80px",
                        height: "80px",
                        background: "#10b981",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "36px",
                        boxShadow: "0 0 30px rgba(16, 185, 129, 0.5)",
                      }}
                    >
                      {step.icon}
                      <div
                        style={{
                          position: "absolute",
                          top: "-4px",
                          right: "-4px",
                          background: "white",
                          color: "#15803d",
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: "700",
                          fontSize: "14px",
                        }}
                      >
                        {i + 1}
                      </div>
                    </div>
                    <div>
                      <h3 style={{ fontSize: "20px", margin: "0 0 8px 0" }}>{step.title}</h3>
                      <p style={{ color: "#9ca3af", fontSize: "14px", lineHeight: "1.8", margin: 0 }}>
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Guarantees Section */}
      <div style={{ padding: "96px 0", background: "white" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 32px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "64px" }}>
            <div style={{ textAlign: "center" }}>
              <span
                style={{
                  background: "#fed7aa",
                  color: "#c2410c",
                  padding: "6px 16px",
                  borderRadius: "999px",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                Jaminan Kami
              </span>
              <h2 style={{ fontSize: "clamp(32px, 4vw, 48px)", color: "#111827", margin: "16px 0" }}>
                Mengapa Kami Terpercaya?
              </h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "32px" }}>
              {guarantees.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -8 }}
                  style={{
                    background: "linear-gradient(135deg, #f9fafb 0%, white 100%)",
                    padding: "40px",
                    borderRadius: "16px",
                    border: "2px solid #e5e7eb",
                    textAlign: "center",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <span style={{ fontSize: "60px" }}>{item.icon}</span>
                    <h3 style={{ fontSize: "20px", color: "#111827", margin: 0 }}>{item.title}</h3>
                    <p style={{ color: "#6b7280", lineHeight: "1.8", margin: 0 }}>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div style={{ padding: "96px 0", background: "#f9fafb" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 32px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
            <div style={{ textAlign: "center" }}>
              <span
                style={{
                  background: "#e9d5ff",
                  color: "#7e22ce",
                  padding: "6px 16px",
                  borderRadius: "999px",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                Testimoni
              </span>
              <h2 style={{ fontSize: "clamp(32px, 4vw, 48px)", color: "#111827", margin: "16px 0" }}>
                Apa Kata Mereka?
              </h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
              {testimonials.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  style={{
                    background: "white",
                    padding: "24px",
                    borderRadius: "12px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    border: "1px solid #e5e7eb",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <div style={{ display: "flex", gap: "4px" }}>
                      {[...Array(5)].map((_, j) => (
                        <span key={j} style={{ color: j < item.rating ? "#fbbf24" : "#d1d5db", fontSize: "18px" }}>
                          ⭐
                        </span>
                      ))}
                    </div>
                    <p style={{ color: "#374151", fontSize: "14px", lineHeight: "1.8", fontStyle: "italic", margin: 0 }}>
                      "{item.quote}"
                    </p>
                    <div style={{ paddingTop: "16px", borderTop: "1px solid #e5e7eb" }}>
                      <p style={{ fontWeight: "700", color: "#111827", margin: "0 0 4px 0" }}>{item.name}</p>
                      <p style={{ fontSize: "14px", color: "#6b7280", margin: 0 }}>{item.car}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Car Selection & Calculator Section */}
      <div style={{ padding: "96px 0", background: "white" }} id="simulasi">
        <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 32px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
            <div style={{ textAlign: "center", maxWidth: "768px", margin: "0 auto" }}>
              <span
                style={{
                  background: "#dbeafe",
                  color: "#1e40af",
                  padding: "6px 16px",
                  borderRadius: "999px",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                Simulasi Kredit Mobil
              </span>
              <h2 style={{ fontSize: "clamp(32px, 4vw, 48px)", color: "#111827", margin: "16px 0" }}>
                Pilih Mobil dan Hitung Cicilan
              </h2>
              <p style={{ fontSize: "18px", color: "#6b7280" }}>
                Hitung estimasi cicilan dengan maksimal 85% dari harga mobil
              </p>
            </div>

            <div
              style={{
                background: "linear-gradient(135deg, #f0fdf4 0%, #dbeafe 100%)",
                borderRadius: "24px",
                padding: "48px",
                boxShadow: "0 20px 50px rgba(0,0,0,0.1)",
                border: "1px solid #e5e7eb",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
                
                {/* Step 1: Brand Selection */ }
                <div style={{ position: "relative" }}>
                    <label style={{ fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "8px", display: "block" }}>
                      Merek Mobil
                    </label>
                    <select
                      value={selectedBrand || ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value) {
                          handleBrandSelect(value);
                        } else {
                          setSelectedBrand("");
                          setSelectedType("");
                          setSelectedCar(null);
                          setCarTypes([]);
                          setCarModels([]);
                        }
                      }}
                      disabled={loadingCars}
                      style={{
                        width: "100%",
                        padding: "16px",
                        fontSize: "16px",
                        borderRadius: "12px",
                        border: "2px solid #e5e7eb",
                        background: loadingCars ? "#f3f4f6" : "white",
                        outline: "none",
                        cursor: loadingCars ? "not-allowed" : "pointer",
                        marginBottom: "8px",
                        opacity: loadingCars ? 0.6 : 1,
                        appearance: "none",
                        backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23374151' d='M10.293 3.293L6 7.586 1.707 3.293A1 1 0 00.293 4.707l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z'/%3E%3C/svg%3E\")",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 16px center",
                        paddingRight: "40px",
                      }}
                    >
                      <option value="">Pilih merek mobil...</option>
                      {!loadingCars && carBrands
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((brand) => (
                          <option key={brand.id} value={brand.id}>
                            {brand.logo} {brand.name}
                          </option>
                        ))}
                    </select>
                    {selectedBrand && (
                      <div style={{ fontSize: "14px", color: "#10b981", marginTop: "4px" }}>
                        Dipilih: {carBrands.find(b => b.id === selectedBrand)?.name}
                      </div>
                    )}
                    {loadingCars && (
                      <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px" }}>
                        Memuat data merek mobil...
                      </div>
                    )}
                  </div>
                

                {selectedBrand && (
                  <div>
                    <h3 style={{ fontSize: "20px", fontWeight: "600", color: "#111827", marginBottom: "16px" }}>
                      2. Pilih Tipe Mobil
                    </h3>
                    <div style={{ position: "relative" }}>
                      <select
                        value={selectedType || ""}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value) {
                            handleTypeSelect(value);
                          } else {
                            setSelectedType("");
                            setSelectedCar(null);
                            setCarModels([]);
                          }
                        }}
                        disabled={loadingCars}
                        style={{
                          width: "100%",
                          padding: "16px",
                          fontSize: "16px",
                          borderRadius: "12px",
                          border: "2px solid #e5e7eb",
                          background: loadingCars ? "#f3f4f6" : "white",
                          outline: "none",
                          cursor: loadingCars ? "not-allowed" : "pointer",
                          marginBottom: "8px",
                          opacity: loadingCars ? 0.6 : 1,
                          appearance: "none",
                          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23374151' d='M10.293 3.293L6 7.586 1.707 3.293A1 1 0 00.293 4.707l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z'/%3E%3C/svg%3E\")",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 16px center",
                          paddingRight: "40px",
                        }}
                      >
                        <option value="">Pilih tipe mobil...</option>
                        {!loadingCars && carTypes
                          .sort((a, b) => a.name.localeCompare(b.name))
                          .map((type) => (
                            <option key={type.id} value={type.id}>
                              {type.name}
                            </option>
                          ))}
                      </select>
                      {selectedType && (
                        <div style={{ fontSize: "14px", color: "#10b981", marginTop: "4px" }}>
                          Dipilih: {carTypes.find(t => t.id === selectedType)?.name}
                        </div>
                      )}
                      {loadingCars && (
                        <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px" }}>
                          Memuat data tipe mobil...
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {selectedType && carModels.length > 0 && (
                  <div>
                    <h3 style={{ fontSize: "20px", fontWeight: "600", color: "#111827", marginBottom: "16px" }}>
                      3. Pilih Model Mobil
                    </h3>
                    <div style={{ position: "relative" }}>
                      <select
                        value={selectedCar?.id || ""}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value) {
                            const model = carModels.find(m => m.id === value);
                            if (model) {
                              handleCarSelect(model);
                            }
                          } else {
                            setSelectedCar(null);
                            setPinjaman("");
                            setCicilan(null);
                            setTenor("");
                          }
                        }}
                        disabled={loadingCars}
                        style={{
                          width: "100%",
                          padding: "16px",
                          fontSize: "16px",
                          borderRadius: "12px",
                          border: "2px solid #e5e7eb",
                          background: loadingCars ? "#f3f4f6" : "white",
                          outline: "none",
                          cursor: loadingCars ? "not-allowed" : "pointer",
                          marginBottom: "8px",
                          opacity: loadingCars ? 0.6 : 1,
                          appearance: "none",
                          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23374151' d='M10.293 3.293L6 7.586 1.707 3.293A1 1 0 00.293 4.707l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z'/%3E%3C/svg%3E\")",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 16px center",
                          paddingRight: "40px",
                        }}
                      >
                        <option value="">Pilih model mobil...</option>
                        {!loadingCars && carModels
                          .sort((a, b) => a.name.localeCompare(b.name))
                          .map((model) => (
                            <option key={model.id} value={model.id}>
                              {model.image} {model.name} - Rp {model.price.toLocaleString("id-ID")}
                            </option>
                          ))}
                      </select>
                      {selectedCar && (
                        <div style={{ fontSize: "14px", color: "#10b981", marginTop: "4px" }}>
                          Dipilih: {selectedCar.image} {selectedCar.name} - Rp {selectedCar.price.toLocaleString("id-ID")}
                        </div>
                      )}
                      {loadingCars && (
                        <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px" }}>
                          Memuat data model mobil...
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Loan Configuration */}
                {selectedCar && (
                  <div>
                    <h3 style={{ fontSize: "20px", fontWeight: "600", color: "#111827", marginBottom: "16px" }}>
                      4. Konfigurasi Pinjaman
                    </h3>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "24px" }}>
                      <div>
                        <label style={{ fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "8px", display: "block" }}>
                          Jumlah Pinjaman (Max 80% Harga Mobil)
                        </label>
                        <input
                          type="number"
                          placeholder="Masukkan jumlah pinjaman..."
                          value={pinjaman}
                          onChange={(e) => setPinjaman(e.target.value)}
                          onBlur={(e) => {
                            const maxPinjaman = Math.floor(selectedCar.price * 0.8);
                            if (parseInt(pinjaman) > maxPinjaman) {
                              setPinjaman(maxPinjaman.toString());
                            }
                            e.target.style.borderColor = "#e5e7eb";
                          }}
                          style={{
                            width: "100%",
                            padding: "16px",
                            fontSize: "16px",
                            borderRadius: "12px",
                            border: "2px solid #e5e7eb",
                            background: "white",
                            outline: "none",
                            marginBottom: "8px",
                          }}
                          onFocus={(e) => (e.target.style.borderColor = "#10b981")}
                        />
                        <div style={{ fontSize: "12px", color: "#6b7280" }}>
                          Maksimal: Rp {Math.floor(selectedCar.price * 0.8).toLocaleString("id-ID")}
                        </div>
                        <button
                          onClick={handleMaxPinjaman}
                          style={{
                            marginTop: "8px",
                            padding: "8px 16px",
                            fontSize: "14px",
                            background: "#10b981",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                          }}
                        >
                          Gunakan Maksimal Pinjaman
                        </button>
                      </div>
                      
                      <div>
                        <label style={{ fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "8px", display: "block" }}>
                          Tenor (Bulan)
                        </label>
                        <select
                          value={tenor}
                          onChange={(e) => setTenor(e.target.value)}
                          style={{
                            width: "100%",
                            padding: "16px",
                            fontSize: "16px",
                            borderRadius: "12px",
                            border: "2px solid #e5e7eb",
                            background: "white",
                            outline: "none",
                            cursor: "pointer",
                            appearance: "none",
                            backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23374151' d='M10.293 3.293L6 7.586 1.707 3.293A1 1 0 00.293 4.707l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z'/%3E%3C/svg%3E\")",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "right 16px center",
                            paddingRight: "40px",
                          }}
                        >
                          <option value="">Pilih tenor...</option>
                          {[12, 24, 36, 48, 60].map((month) => (
                            <option key={month} value={month}>
                              {month} Bulan ({month/12} Tahun)
                            </option>
                          ))}
                        </select>
                        <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "8px" }}>
                          Suku bunga: 0.76% flat per tahun
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {cicilan && selectedCar && (
                  <>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
                      <div
                        style={{
                          background: "white",
                          padding: "32px",
                          borderRadius: "16px",
                          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                          border: "2px solid #86efac",
                        }}
                      >
                        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <div
                              style={{
                                background: "#10b981",
                                color: "white",
                                width: "32px",
                                height: "32px",
                                borderRadius: "8px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              ⚡
                            </div>
                            <span style={{ fontSize: "14px", fontWeight: "600", color: "#15803d" }}>
                              Cicilan per Bulan
                            </span>
                          </div>
                          <h3 style={{ fontSize: "36px", fontWeight: "700", color: "#15803d", margin: 0 }}>
                            Rp {Math.round(cicilan).toLocaleString("id-ID")}
                          </h3>
                        </div>
                      </div>

                      <div
                        style={{
                          background: "white",
                          padding: "32px",
                          borderRadius: "16px",
                          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                          border: "2px solid #93c5fd",
                        }}
                      >
                        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <div
                              style={{
                                background: "#3b82f6",
                                color: "white",
                                width: "32px",
                                height: "32px",
                                borderRadius: "8px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              💰
                            </div>
                            <span style={{ fontSize: "14px", fontWeight: "600", color: "#1e40af" }}>
                              Total Pembayaran
                            </span>
                          </div>
                          <h3 style={{ fontSize: "36px", fontWeight: "700", color: "#1e40af", margin: 0 }}>
                            Rp {Math.round(cicilan * tenor).toLocaleString("id-ID")}
                          </h3>
                          <p style={{ fontSize: "14px", color: "#6b7280", margin: 0 }}>
                            Total Bunga: Rp {Math.round((cicilan * tenor * bunga) / 100).toLocaleString("id-ID")}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Ajukan Button dengan Data Mobil */}
                    <div style={{ textAlign: "center", marginTop: "32px" }}>
                      <button
                        onClick={() => {
                          setModalData({
                            withCarData: true, 
                            carData: {
                              mobil: selectedCar.name,
                              pinjaman: pinjaman,
                              tenor: tenor,
                              cicilan: Math.round(cicilan)
                            }
                          });
                          setModalOpen(true);
                        }}
                        style={{
                          background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                          color: "white",
                          padding: "16px 32px",
                          fontSize: "16px",
                          fontWeight: "600",
                          borderRadius: "12px",
                          border: "none",
                          cursor: "pointer",
                          transition: "all 0.3s",
                          boxShadow: "0 4px 15px rgba(16, 185, 129, 0.3)",
                        }}
                        onMouseOver={(e) => {
                          e.target.style.transform = "translateY(-2px)";
                          e.target.style.boxShadow = "0 6px 20px rgba(16, 185, 129, 0.4)";
                        }}
                        onMouseOut={(e) => {
                          e.target.style.transform = "translateY(0)";
                          e.target.style.boxShadow = "0 4px 15px rgba(16, 185, 129, 0.3)";
                        }}
                      >
                        🚗 Ajukan Pembiayaan Ini
                      </button>
                      <p style={{ fontSize: "14px", color: "#6b7280", marginTop: "8px" }}>
                        Data mobil akan otomatis terisi di form
                      </p>
                    </div>
                  </>
                )}
                </div>
              </div>
            </div>
          </div>
        </div>

      {/* Requirements Section */}
      <div style={{ padding: "96px 0", background: "white" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 32px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
            <div style={{ textAlign: "center" }}>
              <span
                style={{
                  background: "#fecaca",
                  color: "#b91c1c",
                  padding: "6px 16px",
                  borderRadius: "999px",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                Persyaratan
              </span>
              <h2 style={{ fontSize: "clamp(32px, 4vw, 48px)", color: "#111827", margin: "16px 0" }}>
                Yang Anda Butuhkan
              </h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "32px" }}>
              <div
                style={{
                  background: "#f0fdf4",
                  padding: "40px",
                  borderRadius: "16px",
                  border: "2px solid #86efac",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div
                      style={{
                        background: "#10b981",
                        color: "white",
                        width: "48px",
                        height: "48px",
                        borderRadius: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "24px",
                      }}
                    >
                      👤
                    </div>
                    <h3 style={{ fontSize: "24px", color: "#111827", margin: 0 }}>Persyaratan</h3>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {["WNI", "Minimal usia 21 tahun", "Memiliki penghasilan tetap", "Dokumen pendukung lainnya"].map(
                      (item, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          <div
                            style={{
                              background: "#10b981",
                              color: "white",
                              width: "24px",
                              height: "24px",
                              borderRadius: "50%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "12px",
                              flexShrink: 0,
                            }}
                          >
                            ✓
                          </div>
                          <span style={{ color: "#374151", fontSize: "16px" }}>{item}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>

              <div
                style={{
                  background: "#eff6ff",
                  padding: "40px",
                  borderRadius: "16px",
                  border: "2px solid #93c5fd",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div
                      style={{
                        background: "#3b82f6",
                        color: "white",
                        width: "48px",
                        height: "48px",
                        borderRadius: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "24px",
                      }}
                    >
                      📄
                    </div>
                    <h3 style={{ fontSize: "24px", color: "#111827", margin: 0 }}>Dokumen</h3>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {[
                      "KTP",
                      "KTP Pasangan (jika sudah menikah)",
                      "Kartu Keluarga (KK)",
                      "STNK & dokumen kendaraan terkait",
                    ].map((item, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div
                          style={{
                            background: "#3b82f6",
                            color: "white",
                            width: "24px",
                            height: "24px",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "12px",
                            flexShrink: 0,
                          }}
                        >
                          ✓
                        </div>
                        <span style={{ color: "#374151", fontSize: "16px" }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div style={{ padding: "96px 0", background: "#f9fafb" }}>
        <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 32px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
            <div style={{ textAlign: "center" }}>
              <span
                style={{
                  background: "#cffafe",
                  color: "#0e7490",
                  padding: "6px 16px",
                  borderRadius: "999px",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                FAQ
              </span>
              <h2 style={{ fontSize: "clamp(32px, 4vw, 48px)", color: "#111827", margin: "16px 0" }}>
                Pertanyaan yang Sering Diajukan
              </h2>
              <p style={{ fontSize: "18px", color: "#6b7280", maxWidth: "768px", margin: "0 auto" }}>
                Informasi singkat untuk membantu Anda memahami proses dan ketentuan pembiayaan
              </p>
            </div>

            <div
              style={{
                background: "white",
                borderRadius: "16px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                border: "1px solid #e5e7eb",
                overflow: "hidden",
              }}
            >
              {faqs.map((item, index) => (
                <div
                  key={index}
                  style={{
                    borderBottom: index !== faqs.length - 1 ? "1px solid #e5e7eb" : "none",
                  }}
                >
                  <div
                    onClick={() => toggleFaq(index)}
                    style={{
                      padding: "24px 32px",
                      cursor: "pointer",
                      transition: "background 0.2s",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "16px",
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.background = "#f9fafb")}
                    onMouseOut={(e) => (e.currentTarget.style.background = "white")}
                  >
                    <span style={{ fontWeight: "600", color: "#111827", fontSize: "16px", textAlign: "left" }}>
                      {item.q}
                    </span>
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        background: "#d1fae5",
                        color: "#15803d",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "700",
                        fontSize: "20px",
                        flexShrink: 0,
                        transform: openFaq.includes(index) ? "rotate(45deg)" : "rotate(0deg)",
                        transition: "transform 0.3s",
                      }}
                    >
                      +
                    </div>
                  </div>

                  {openFaq.includes(index) && (
                    <div style={{ padding: "0 32px 24px 32px" }}>
                      <p style={{ color: "#374151", lineHeight: "1.8", fontSize: "16px", margin: 0 }}>
                        {item.a}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div
        style={{
          padding: "96px 0",
          background: "#111827",
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0, opacity: 0.1 }}>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "600px",
              height: "600px",
              background: "#10b981",
              borderRadius: "50%",
              filter: "blur(150px)",
            }}
          />
        </div>

        <div style={{ maxWidth: "1152px", margin: "0 auto", position: "relative", zIndex: 1, padding: "0 32px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "32px", textAlign: "center", alignItems: "center" }}>
            <span
              style={{
                background: "#10b981",
                color: "white",
                padding: "8px 16px",
                borderRadius: "999px",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              Siap Memulai?
            </span>
            <h2 style={{ fontSize: "clamp(32px, 5vw, 60px)", lineHeight: "1.2", margin: 0 }}>
              Ajukan Pembiayaan Anda{" "}
              <span style={{ color: "#6ee7b7" }}>Sekarang Juga</span>
            </h2>
            <p style={{ fontSize: "20px", color: "#9ca3af", maxWidth: "768px", margin: 0 }}>
              Proses cepat, aman, dan terpercaya. Dapatkan dana yang Anda butuhkan dalam waktu singkat.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "center" }}>
              <button
                onClick={() => {
                  setModalData({ withCarData: false });
                  setModalOpen(true);
                }}
                style={{
                  background: "#10b981",
                  color: "white",
                  padding: "20px 40px",
                  fontSize: "18px",
                  fontWeight: "700",
                  borderRadius: "12px",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s",
                }}
                onMouseOver={(e) => {
                  e.target.style.background = "#059669";
                  e.target.style.transform = "translateY(-2px)";
                }}
                onMouseOut={(e) => {
                  e.target.style.background = "#10b981";
                  e.target.style.transform = "translateY(0)";
                }}
              >
                Ajukan Pembiayaan Mobil
              </button>

            </div>
          </div>
        </div>
      </div>

      {/* AjukanModal Component */}
      <AjukanModal isOpen={modalOpen} setOpen={setModalOpen} modalData={modalData} />
    </div>
  );
}
