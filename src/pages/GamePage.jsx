import { Unity, useUnityContext } from "react-unity-webgl";
import Header from '../components/Header';
import { useState, useRef, useCallback } from "react";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from '../components/Header'
 
// Fullscreen icon SVG
function FullscreenIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 5V1H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 1H13V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13 9V13H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5 13H1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

const styles = {
  page: {
    backgroundColor: "#9B0032",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    fontFamily: "Arial, sans-serif",
    margin: 0,
    padding: 0,
  },
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 24px",
  },
  gameWrapper: {
    position: "relative",
    width: "100%",
    maxWidth: "960px",
    aspectRatio: "16 / 9",
  },
  // Overlay que cubre toda la pantalla con el rojo de fondo
  fullscreenOverlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "#9B0032",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
  // El canvas dentro del fullscreen respeta 16:9 con letterbox rojo
  fullscreenCanvas: {
    width: "100%",
    height: "100%",
    maxWidth: "calc(100vh * 16 / 9)",
    maxHeight: "calc(100vw * 9 / 16)",
    display: "block",
    backgroundColor: "#000000",
  },
  loadingOverlay: {
    position: "absolute",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000",
    borderRadius: "12px",
    zIndex: 10,
    gap: "16px",
  },
  loadingText: {
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: 600,
  },
  progressBarTrack: {
    width: "200px",
    height: "6px",
    backgroundColor: "#333",
    borderRadius: "3px",
    overflow: "hidden",
  },
  canvas: {
    display: "block",
    width: "100%",
    height: "100%",
    borderRadius: "12px",
    backgroundColor: "#000000",
    border: "1px solid rgba(255,255,255,0.08)",
  },
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: "960px",
    marginTop: "12px",
    padding: "0 2px",
  },
  footerHint: {
    color: "rgba(255,255,255,0.7)",
    fontSize: "13px",
  },
  fullscreenBtn: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    backgroundColor: "rgba(255,255,255,0.12)",
    color: "#ffffff",
    border: "1px solid rgba(255,255,255,0.25)",
    borderRadius: "8px",
    padding: "7px 14px",
    fontSize: "13px",
    fontWeight: 500,
    cursor: "pointer",
    backdropFilter: "blur(4px)",
    fontFamily: "Arial, sans-serif",
    transition: "background 0.15s",
  },
  exitHint: {
    position: "absolute",
    bottom: "16px",
    right: "16px",
    color: "rgba(255,255,255,0.6)",
    fontSize: "12px",
    pointerEvents: "none",
  },
};

function GamePage() {
  const { unityProvider, isLoaded, loadingProgression } = useUnityContext({
    loaderUrl: "/unity/game/VJ_ver3000.loader.js",
    dataUrl: "/unity/game/VJ_ver3000.data",
    frameworkUrl: "/unity/game/VJ_ver3000.framework.js",
    codeUrl: "/unity/game/VJ_ver3000.wasm",
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
    }
  }, [])
  const {
    unityProvider,
    isLoaded,
    loadingProgression,
    requestFullscreen,
  } = useUnityContext({
    loaderUrl: "/unity/game/VJ.loader.js",
    dataUrl: "/unity/game/VJ.data",
    frameworkUrl: "/unity/game/VJ.framework.js",
    codeUrl: "/unity/game/VJ.wasm",
  });

  const pct = Math.round(loadingProgression * 100);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Escuchar ESC o cambios nativos de fullscreen
  const handleKeyDown = useCallback((e) => {
    if (e.key === "Escape") setIsFullscreen(false);
  }, []);

  const enterFullscreen = () => {
    setIsFullscreen(true);
    window.addEventListener("keydown", handleKeyDown, { once: true });
  };

  const exitFullscreen = () => setIsFullscreen(false);

  const LoadingBar = () => (
    !isLoaded && (
      <div style={styles.loadingOverlay}>
        <p style={styles.loadingText}>Loading {pct}%</p>
        <div style={styles.progressBarTrack}>
          <div
            style={{
              height: "100%",
              width: `${pct}%`,           // ← bug arreglado
              backgroundColor: "#9B0032",
              borderRadius: "3px",
              transition: "width 0.2s ease",
            }}
          />
        </div>
      </div>
    )
  );

  // Modo fullscreen: overlay fixed con letterbox rojo
  if (isFullscreen) {
    return (
      <div style={styles.fullscreenOverlay} onClick={exitFullscreen}>
        <div
          style={{ position: "relative", ...styles.fullscreenCanvas }}
          onClick={(e) => e.stopPropagation()} // evita cerrar al clickear el canvas
        >
          <LoadingBar />
          <Unity unityProvider={unityProvider} style={{ width: "100%", height: "100%", display: "block" }} />
        </div>
        <p style={styles.exitHint}>Presiona ESC o haz clic fuera para salir</p>
      </div>
    );
  }

  // Modo normal
  return (
    <div style={styles.page}>
      <Header />
      <main style={styles.main}>
        <div style={styles.gameWrapper}>
          <LoadingBar />
          <Unity unityProvider={unityProvider} style={styles.canvas} />
        </div>

        <div style={styles.footer}>
          <span style={styles.footerHint}>Use keyboard &amp; mouse to interact with the game</span>
          <button
            style={styles.fullscreenBtn}
            onClick={enterFullscreen}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.22)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.12)")}
          >
            <FullscreenIcon />
            Fullscreen
          </button>
        </div>
      </main>
    </div>
  );
}

export default GamePage;