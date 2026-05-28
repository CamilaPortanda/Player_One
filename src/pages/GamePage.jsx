import { useState } from 'react'
import logo from '../assets/rockwell_automation_logo.png'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
 
function GamePage() {
<<<<<<< Updated upstream
    const [isLoaded, setIsLoaded] = useState(false)
    const [isFullscreen, setIsFullscreen] = useState(false)
=======
  const {
    unityProvider,
    isLoaded,
    loadingProgression,
    requestFullscreen,
  } = useUnityContext({
    loaderUrl: "/unity/game/VJ_v3.loader.js",
    dataUrl: "/unity/game/VJ_v3.data",
    frameworkUrl: "/unity/game/VJ_v3.framework.js",
    codeUrl: "/unity/game/VJ_v3.wasm",
  });
>>>>>>> Stashed changes
 
    // CONFIGURATION — replace this URL with your Unity WebGL build path
    // Options:
    //   - Hosted build:   "https://your-cdn.com/unitybuild/index.html"
    //   - Local (public): "/unity/index.html"
    const UNITY_BUILD_URL = "/unity/index.html"
 
    const handleFullscreen = () => {
        const iframe = document.getElementById('unity-iframe')
        if (iframe) {
            if (iframe.requestFullscreen) iframe.requestFullscreen()
            else if (iframe.webkitRequestFullscreen) iframe.webkitRequestFullscreen()
            setIsFullscreen(true)
        }
    }
 
    return (
        <div className="bg-[#9B0032] min-h-screen">
            <Header />
 
            <main className="flex flex-col justify-center items-center min-h-[calc(100vh-80px)] py-8 px-4">
 
                {/* Game container */}
                <div
                    className="relative bg-black rounded-2xl overflow-hidden shadow-[0px_8px_32px_rgba(0,0,0,0.45)]"
                    style={{ width: '100%', maxWidth: '960px', aspectRatio: '16/9' }}
                >
                    {/* Loading overlay — hidden once iframe fires onLoad */}
                    {!isLoaded && (
                        <div className="absolute inset-0 flex flex-col gap-4 justify-center items-center bg-[#0a0a1a] z-10">
                            {/* Spinner */}
                            <div className="w-14 h-14 rounded-full border-4 border-[#003e7e]/30 border-t-[#CD163F] animate-spin" />
                            <p className="text-white/60 text-sm tracking-widest uppercase">
                                Loading game…
                            </p>
                        </div>
                    )}
 
                    {/* Unity WebGL iframe */}
                    <iframe
                        id="unity-iframe"
                        src={UNITY_BUILD_URL}
                        title="Rockwell Automation Game"
                        onLoad={() => setIsLoaded(true)}
                        allow="fullscreen; autoplay"
                        className="w-full h-full border-0"
                        style={{ display: 'block' }}
                    />
                </div>
 
                {/* Controls bar */}
                <div className="w-full max-w-[960px] mt-3 flex justify-between items-center">
                    <p className="text-white/80 text-xs">
                        Use keyboard & mouse to interact with the game
                    </p>
                    <button
                        onClick={handleFullscreen}
                        className="flex items-center gap-2 text-white/80 hover:text-white text-xs border border-white/50 hover:border-white/80 rounded-lg px-3 py-1.5 transition-all duration-200 bg-white/5 hover:bg-white/10"
                    >
                        {/* Fullscreen icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 3 21 3 21 9" />
                            <polyline points="9 21 3 21 3 15" />
                            <line x1="21" y1="3" x2="14" y2="10" />
                            <line x1="3" y1="21" x2="10" y2="14" />
                        </svg>
                        Fullscreen
                    </button>
                </div>
 
            </main>
        </div>
    )
}
 
export default GamePage