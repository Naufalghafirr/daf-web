import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const FeaturesCarousel = ({ 
  features, 
  activeSlide, 
  goToSlide, 
  handlePrev, 
  handleNext, 
  canPrev, 
  canNext, 
  swipeHandler 
}) => {
  return (
    <div
      data-carousel="features"
      style={{
        width: "100%",
        padding: "0 16px",
        position: "relative",
      }}
      onMouseDown={swipeHandler}
      onTouchStart={swipeHandler}
    >
      {/* Left Navigation Button */}
      <button
        type="button"
        aria-label="Fitur sebelumnya"
        onClick={handlePrev}
        disabled={!canPrev}
        style={{
          position: "absolute",
          left: "0px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          border: "1px solid #d1d5db",
          background: canPrev ? "white" : "#f4f4f5",
          color: canPrev ? "#111827" : "#9ca3af",
          cursor: canPrev ? "pointer" : "not-allowed",
          boxShadow: canPrev ? "0 4px 12px rgba(15,23,42,0.15)" : "none",
          transition: "all 0.2s ease",
          fontSize: "16px",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FaChevronLeft style={{ margin: 0 }} />
      </button>

      {/* Right Navigation Button */}
      <button
        type="button"
        aria-label="Fitur berikutnya"
        onClick={handleNext}
        disabled={!canNext}
        style={{
          position: "absolute",
          right: "0px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          border: "1px solid #d1d5db",
          background: canNext ? "white" : "#f4f4f5",
          color: canNext ? "#111827" : "#9ca3af",
          cursor: canNext ? "pointer" : "not-allowed",
          boxShadow: canNext ? "0 4px 12px rgba(15,23,42,0.15)" : "none",
          transition: "all 0.2s ease",
          fontSize: "16px",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FaChevronRight style={{ margin: 0 }} />
      </button>

      {/* Card Container */}
      <div style={{ maxWidth: "320px", margin: "0 auto" }}>
        <div
          style={{
            overflow: "hidden",
            borderRadius: "16px",
            border: "1px solid #e5e7eb",
            boxShadow: "0 4px 20px rgba(15, 23, 42, 0.08)",
            background: "white",
            cursor: "grab",
            userSelect: "none",
          }}
        >
          <div
            style={{
              display: "flex",
              transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              transform: `translateX(-${activeSlide * 100}%)`,
            }}
          >
            {features.map((feature, index) => (
              <div
                key={`feature-slide-${index}`}
                style={{
                  flex: "0 0 100%",
                  padding: "32px",
                  boxSizing: "border-box",
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  style={{
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
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "16px" }}>
        {features.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Pergi ke fitur ${index + 1}`}
            onClick={() => goToSlide(index)}
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              border: "none",
              background: activeSlide === index ? "#10b981" : "#d1d5db",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturesCarousel;
