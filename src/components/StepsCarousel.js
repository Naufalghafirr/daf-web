import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const StepsCarousel = ({ 
  steps, 
  activeSlide, 
  goToSlide, 
  handlePrev, 
  handleNext, 
  canPrev, 
  canNext, 
  swipeHandler,
  slidesPerView = 1,
}) => {
  const safeSlidesPerView = Math.max(1, Math.min(slidesPerView, steps.length || 1));
  const maxIndex = Math.max(0, (steps.length || 0) - safeSlidesPerView);
  const positions = Array.from({ length: maxIndex + 1 }, (_, i) => i);
  const translatePct = safeSlidesPerView > 0 ? (activeSlide * 100) / safeSlidesPerView : 0;

  return (
    <div
      data-carousel="steps"
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
        aria-label="Langkah sebelumnya"
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
          border: "1px solid #374151",
          background: canPrev ? "#1f2937" : "#111827",
          color: canPrev ? "white" : "#6b7280",
          cursor: canPrev ? "pointer" : "not-allowed",
          boxShadow: canPrev ? "0 4px 12px rgba(0,0,0,0.4)" : "none",
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
        aria-label="Langkah berikutnya"
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
          border: "1px solid #374151",
          background: canNext ? "#1f2937" : "#111827",
          color: canNext ? "white" : "#6b7280",
          cursor: canNext ? "pointer" : "not-allowed",
          boxShadow: canNext ? "0 4px 12px rgba(0,0,0,0.4)" : "none",
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
      <div style={{ maxWidth: "1152px", margin: "0 auto" }}>
        <div
          style={{
            overflow: "hidden",
            borderRadius: "16px",
            border: "1px solid #374151",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
            background: "#1f2937",
            cursor: "grab",
            userSelect: "none",
          }}
        >
          <div
            style={{
              display: "flex",
              transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              transform: `translateX(-${translatePct}%)`,
            }}
          >
            {steps.map((step, index) => (
              <div
                key={`step-slide-${index}`}
                style={{
                  flex: `0 0 ${100 / safeSlidesPerView}%`,
                  padding: "40px 32px",
                  boxSizing: "border-box",
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
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
                        {index + 1}
                      </div>
                    </div>
                    <div>
                      <h3 style={{ fontSize: "20px", margin: "0 0 8px 0", color: "white" }}>{step.title}</h3>
                      <p style={{ color: "#9ca3af", fontSize: "14px", lineHeight: "1.8", margin: 0 }}>
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "16px" }}>
        {positions.map((index) => (
          <button
            key={index}
            type="button"
            aria-label={`Pergi ke langkah ${index + 1}`}
            onClick={() => goToSlide(index)}
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              border: "none",
              background: activeSlide === index ? "#10b981" : "#374151",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default StepsCarousel;
