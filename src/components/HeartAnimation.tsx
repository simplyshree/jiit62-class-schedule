import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

export const HeartAnimation = () => {
  const [showHeart, setShowHeart] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [position, setPosition] = useState({ left: 50, bottom: 0 });

  useEffect(() => {
    // Show heart after 10 seconds
    const initialTimer = setTimeout(() => {
      setPosition({ left: Math.random() * 80 + 10, bottom: 0 });
      setShowHeart(true);
    }, 10000);

    return () => clearTimeout(initialTimer);
  }, []);

  const handleHeartClick = () => {
    // Play burst sound
    const audio = new Audio("data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTUIFmS58ed9MwgZaLvs55xLEAtPpuPxtmQcBjiP1/PMeS0GI3fH8N2RQAoUXrTp66hVFApGnt/yvmwhBSuAzvLaiTUIFmS58ed9MwgZZ7vs55xLEAtPpuPxtmQcBjiP1/PMeS0GI3fH8N2RQAoUXrTp66hVFApGnt/yvmwhBSuAzvLaiTUIFmS58ed9MwgZZ7vs55xLEAtPpuPxtmQcBjiP1/PMeS0GI3fH8N2RQAoUXrTp66hVFApGnt/yvmwhBSuAzvLaiTUIFmS58ed9MwgZZ7vs55xLEAtPpuPxtmQcBjiP1/PMeS0GI3fH8N2RQAoUXrTp66hVFApGnt/yvmwhBSuAzvLaiTUIFmS58ed9MwgZZ7vs55xLEAtPpuPxtmQcBjiP1/PMeS0GI3fH8N2RQAoUXrTp66hVFApGnt/yvmwhBSuAzvLaiTUIFmS58ed9MwgZZ7vs55xLEAtPpuPxtmQcBjiP1/PMeS0GI3fH8N2RQAoUXrTp66hVFApGnt/yvmwhBSuAzvLaiTUIFmS58ed9MwgZZ7vs55xLEAtPpuPxtmQcBjiP1/PMeS0GI3fH8N2RQAoUXrTp66hVFApGnt/yvmwhBSuAzvLaiTUIFmS58ed9MwgZZ7vs55xLEAtPpuPxtmQcBjiP1/PMeS0GI3fH8N2RQAoUXrTp66hVFApGnt/yvmwhBSuAzvLaiTUIFmS58ed9MwgZZ7vs55xLEAtPpuPxtmQcBjiP1/PMeS0GI3fH8N2RQAoUXrTp66hVFApGnt/yvmwhBSuAzvLaiTUIFmS58ed9Mw==");
    audio.play();

    // Show message
    setShowMessage(true);
    setShowHeart(false);

    // Hide message after 2 seconds
    setTimeout(() => {
      setShowMessage(false);
      
      // Show heart again after 30 seconds
      setTimeout(() => {
        setPosition({ left: Math.random() * 80 + 10, bottom: 0 });
        setShowHeart(true);
      }, 30000);
    }, 2000);
  };

  return (
    <>
      {showHeart && (
        <div
          className="fixed bottom-0 pointer-events-auto z-50 cursor-pointer animate-float-up"
          style={{
            left: `${position.left}%`,
            animationDuration: "8s",
          }}
          onClick={handleHeartClick}
        >
          <Heart className="w-16 h-16 fill-purple-500 text-purple-500 drop-shadow-lg hover:scale-110 transition-transform" />
        </div>
      )}

      {showMessage && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
          <div className="bg-purple-500/90 backdrop-blur-sm rounded-full px-12 py-6 shadow-2xl animate-scale-in">
            <p className="text-3xl font-bold text-white">Keep going! 💜</p>
          </div>
        </div>
      )}
    </>
  );
};
