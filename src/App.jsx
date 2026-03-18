import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import CelebrationPage from "./components/CelebrationPage";
import Countdown from "./components/Countdown";
import Effects from "./components/Effects";
import Gallery from "./components/Gallery";
import Hearts from "./components/Hearts";
import LoaderMessage from "./components/LoaderMessage";
import MessageCard from "./components/MessageCard";
import MusicPlayer from "./components/MusicPlayer";

gsap.registerPlugin(ScrollToPlugin);

const purgeMojsCanvases = () => {
  document.querySelectorAll(".mojs-canvas").forEach((el) => {
    try { el.parentNode?.removeChild(el); } catch (_) {}
  });
};

function App() {
  const [currentPage, setCurrentPage] = useState(1);

  const [birthdayReached, setBirthdayReached] = useState(() => {
    const saved = localStorage.getItem("birthdayReached");
    return saved === "true";
  });

  const [showEffects, setShowEffects] = useState(false);
  const [loaderDone, setLoaderDone] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (!birthdayReached) return;

    setShowLoader(true);
    setLoaderDone(false);

    const timer = setTimeout(() => setLoaderDone(true), 11000);
    return () => clearTimeout(timer);
  }, [birthdayReached]);

  // ── NEW: start BdaySong the moment the loading bar completes ──────────────
  useEffect(() => {
    if (loaderDone && musicPlayerRef.current) {
      musicPlayerRef.current.startBday();
    }
  }, [loaderDone]);

  const page1Ref = useRef(null);
  const page2Ref = useRef(null);
  const page3Ref = useRef(null);
  const page4Ref = useRef(null);
  const musicPlayerRef = useRef(null);

  const goToPage = (pageNumber) => {
    const refs = { 1: page1Ref, 2: page2Ref, 3: page3Ref, 4: page4Ref };
    const currentPageRef = refs[currentPage];
    const nextPageRef = refs[pageNumber];

    const isForward = pageNumber > currentPage;

    if (currentPage === 1 && pageNumber !== 1) {
      setShowLoader(false);
      purgeMojsCanvases();
    }

    gsap.to(currentPageRef.current, {
      x: isForward ? "-100%" : "100%",
      opacity: 0,
      duration: 0.6,
      ease: "power2.inOut",
    });

    gsap.set(nextPageRef.current, {
      x: isForward ? "100%" : "-100%",
      opacity: 0,
      visibility: "visible",
    });

    gsap.to(nextPageRef.current, {
      x: "0%",
      opacity: 1,
      duration: 0.6,
      ease: "power2.inOut",
      delay: 0.2,
      onComplete: () => {
        setCurrentPage(pageNumber);
        gsap.set(currentPageRef.current, { x: "0%", visibility: "hidden" });
        gsap.to(window, { duration: 0.3, scrollTo: { y: 0 } });
      },
    });
  };

  const handleBirthdayReached = () => {
    setBirthdayReached(true);
    localStorage.setItem("birthdayReached", "true");
    setShowEffects(true);
    setTimeout(() => setShowEffects(false), 10000);
  };

  return (
    <div className="app">
      <Hearts />

      {/* MusicPlayer lives here at the top level so it is never remounted
          across page transitions — audio state is preserved throughout */}
      <MusicPlayer ref={musicPlayerRef} buttonVisible={loaderDone || currentPage !== 1} />

      {/* PAGE 1: Countdown Timer / Birthday Reached */}
      <div
        ref={page1Ref}
        className={`page ${currentPage === 1 ? "active" : ""}`}
        style={{ visibility: currentPage === 1 ? "visible" : "hidden" }}
      >
        {birthdayReached ? (
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-end",
              paddingBottom: "48px",
            }}
          >
            {showLoader && <LoaderMessage />}

            <button
              id="surpriseBtn"
              className="celebrate-btn"
              style={{
                position: "relative",
                zIndex: 50,
                opacity: loaderDone ? 1 : 0,
                pointerEvents: loaderDone ? "auto" : "none",
                transition: "opacity 0.8s ease",
              }}
              onClick={() => goToPage(2)}
            >
              Let's Celebrate 🎀
            </button>
          </div>
        ) : (
          <>
            <section className="hero">
              <h1
                id="heroTitle"
                style={{
                  fontFamily: "'Brush Script MT', cursive",
                  fontSize: "60px",
                }}
              >
                Counting down to <span className="highlight">[Name]'s</span>{" "}
                special day 🎂
              </h1>
            </section>

            <Countdown
              onBirthdayReached={handleBirthdayReached}
              birthdayReached={birthdayReached}
            />

            <section className="teaser">
              <h2 id="teaserHeading">
                ✨ A special celebration awaits you at midnight... ✨
              </h2>
              <p className="teaser-hint">
                Get ready… something magical is coming your way
              </p>
            </section>

            <button
              id="surpriseBtn"
              className="celebrate-btn"
              disabled={!birthdayReached}
              onClick={() => goToPage(2)}
            >
              🎀 Let's Celebrate
            </button>
          </>
        )}
      </div>

      {/* PAGE 2: Celebration/QNA Page */}
      <div
        ref={page2Ref}
        className={`page ${currentPage === 2 ? "active" : ""}`}
        style={{ visibility: currentPage === 2 ? "visible" : "hidden" }}
      >
        <CelebrationPage
          onComplete={() => goToPage(3)}
          musicPlayerRef={musicPlayerRef}
        />
      </div>

      {/* PAGE 3: Message Card */}
      <div
        ref={page3Ref}
        className={`page ${currentPage === 3 ? "active" : ""}`}
        style={{ visibility: currentPage === 3 ? "visible" : "hidden" }}
      >
        <button className="back-btn" onClick={() => goToPage(2)}>
          ← Back
        </button>
        <MessageCard isActive={currentPage === 3} />
        <button className="page-nav-btn" onClick={() => goToPage(4)}>
          View Our Memories
        </button>
      </div>

      {/* PAGE 4: Gallery */}
      <div
        ref={page4Ref}
        className={`page ${currentPage === 4 ? "active" : ""}`}
        style={{ visibility: currentPage === 4 ? "visible" : "hidden" }}
      >
        <button className="back-btn" onClick={() => goToPage(3)}>
          ← Back
        </button>
        <Gallery isActive={currentPage === 4} />
        <section className="final">
        </section>
      </div>

      {showEffects && <Effects />}
    </div>
  );
}

export default App;