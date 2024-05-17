import React, { useState, useEffect } from "react";
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai";

const PreferenceNav = () => {
  const [fontSize, setFontSize] = useState(18);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleFullScreen = () => {
    if (isFullScreen) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  };

  useEffect(() => {
    function exitHandler() {
      setIsFullScreen(!!document.fullscreenElement);
    }

    document.addEventListener("fullscreenchange", exitHandler);
    document.addEventListener("webkitfullscreenchange", exitHandler);
    document.addEventListener("mozfullscreenchange", exitHandler);
    document.addEventListener("MSFullscreenChange", exitHandler);

    return () => {
      document.removeEventListener("fullscreenchange", exitHandler);
      document.removeEventListener("webkitfullscreenchange", exitHandler);
      document.removeEventListener("mozfullscreenchange", exitHandler);
      document.removeEventListener("MSFullscreenChange", exitHandler);
    };
  }, []);
  useEffect(() => {
    console.log(isFullScreen);
  }, [isFullScreen]);

  return (
    <div className="flex items-center bg-white h-8 w-full justify-end">
      <div className="flex items-center mr-4">
        <button className="mx-2" aria-label="Toggle JavaScript">
          <div className="h-4 text-dark-gray-6 text-xs">JavaScript</div>
        </button>

        <button
          className="mx-2"
          onClick={handleFullScreen}
          aria-label={isFullScreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        >
          <div
            className="h-4 w-4 text-dark-gray-6 font-bold text-lg"
            onMouseEnter={() => setFontSize(21)}
            onMouseLeave={() => setFontSize(18)}
          >
            {!isFullScreen ? (
              <AiOutlineFullscreen fontSize={fontSize} />
            ) : (
              <AiOutlineFullscreenExit fontSize={fontSize} />
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default PreferenceNav;
