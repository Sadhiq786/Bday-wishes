import { useEffect } from "react";

const css = `
  @import url('https://fonts.googleapis.com/css?family=Poppins:300,400');
  @import url("https://fonts.googleapis.com/css?family=Caveat");

  .app-wrapper {
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    overflow: hidden;
    pointer-events: none;
    z-index: 0;
    font-family: 'Poppins', sans-serif;
    background: linear-gradient(to bottom, #090513 0%, #964987 75%, #fdbca3 100%);
  }

  .loading {
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: #FFF;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 15;
    pointer-events: none;
    animation: lm-fadeout 11s linear forwards;
  }

  .loading .bar {
    position: relative;
    width: 400px; height: 40px;
    background: transparent;
    margin: 0 20px;
    border: 2px solid #000;
    box-sizing: border-box;
  }

  .loading .bar:after {
    content: 'Loading...';
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 10px;
    text-align: center;
    line-height: 36px;
    color: #FFF;
    font-size: 20px;
    mix-blend-mode: difference;
  }

  .loading .bar:before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: #000;
    transform-origin: left;
    animation: lm-animate 10s linear forwards;
  }

  .center {
    position: absolute;
    top: 42%; left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    z-index: 5;
  }

  .center div {
    position: relative;
    margin: -30px 0;
    height: 100px;
    z-index: 2;
    transform: skewY(-5deg);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .center div:nth-child(2),
  .center div:nth-child(4) { transform: skewY(14.5deg); z-index: 1; }

  .center div:nth-child(4) {
    transform: skewY(25deg);
    transform-origin: left;
    top: -52px;
  }

  .center div:before {
    content: '';
    position: absolute;
    width: 100%; height: 100%;
  }

  .center div:nth-child(1):before,
  .center div:nth-child(3):before {
    background: linear-gradient(-160deg, #FF0058, #673AB7);
    transform: scaleX(0);
  }

  .center div:nth-child(2):before,
  .center div:nth-child(4):before {
    background: linear-gradient(-20deg, #FF0058, #673AB7);
    transform: scaleX(0);
  }

  .center div:nth-child(1):before {
    backface-visibility: hidden;
    animation: lm-animate 1s linear forwards;
    transform-origin: right;
    animation-delay: 12s;
  }

  .center div:nth-child(2):before {
    backface-visibility: hidden;
    animation: lm-animate 1s linear forwards;
    transform-origin: left;
    animation-delay: 13s;
  }

  .center div:nth-child(3):before {
    backface-visibility: hidden;
    animation: lm-animate 1s linear forwards;
    transform-origin: right;
    animation-delay: 14s;
  }

  .center div:nth-child(1):after,
  .center div:nth-child(3):after {
    content: '';
    position: absolute;
    bottom: 0; left: 0;
    width: 100%; height: 50%;
    background: rgba(255,255,255,0.2);
  }

  .center div h2 {
    position: relative;
    margin: 0; padding: 0;
    z-index: 10;
    opacity: 0;
    color: #FFF;
  }

  .center div:nth-child(1) h2 {
    animation: lm-fadeText 0.5s linear forwards;
    animation-delay: 13s;
    font-size: 40px;
  }

  .center div:nth-child(3) h2 {
    animation: lm-fadeText 0.5s linear forwards;
    animation-delay: 15s;
    font-size: 70px;
    font-weight: bold;
  }

  .lm-stars {
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
    animation: lm-rotation 360s infinite linear;
    z-index: 1;
  }

  .lm-stars:after, .lm-stars:before {
    content: "";
    display: block;
    position: absolute;
    top: 0; left: 0; bottom: 0; right: 0;
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAGQAQMAAAC6caSPAAAABlBMVEVHcEz///+flKJDAAAAAXRSTlMAQObYZgAAAIVJREFUeAHt2SEOwkAQhtFJKuqKRRGOgKzgUMgKRI/G0ZDoacNkN/ue/zJ+/ugBcI+01/EEAGBc04FkP58AVFoi7VaSLAEAAPB/j0hbK678AADMkXbZG03mGA0AAKsP3JgAAGDa88knsuZ8Mp1M6gEAPFtNrtEjtkh7lyRb3/PAWpS0BPgC0PMMdOEjXqoAAAAASUVORK5CYII=");
  }

  .lm-stars:after  { background-size: 100px; opacity: 0.4; }
  .lm-stars:before { background-size: 200px; opacity: 0.6; }

  .lm-mountains {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    width: auto; min-width: 100%;
    height: 60px;
    fill: #000022;
  }

  .lm-mountains--layer1 { z-index: 2; }
  .lm-mountains--layer2 { fill: #9d5189; z-index: 0; }

  @keyframes lm-animate {
    0%   { transform: scaleX(0); }
    100% { transform: scaleX(1); }
  }
  @keyframes lm-fadeText {
    0%   { opacity: 0; }
    100% { opacity: 1; }
  }
  @keyframes lm-fadeout {
    0%, 91% { opacity: 1; visibility: visible; }
    100%    { opacity: 0; visibility: hidden; }
  }
  @keyframes lm-rotation {
    0%   { transform: rotate(0); }
    100% { transform: rotate(360deg); }
  }
`;

const FW1_LEFT = "30%";
const FW2_LEFT = "70%";

// Each firework cycle (curve travel + burst) takes ~1.5s.
// After 3 plays the timeline completes. We then hide all mojs canvases
// so nothing lingers on screen.
const TOTAL_PLAYS = 50; // plays 3 times then stops

export default function LoaderMessage() {
  useEffect(() => {
    let mounted = true;

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/mojs/latest/mo.min.js";

    let timeline    = null;
    let delayTimer  = null;
    let stopTimer   = null;   // fires after 3 plays to purge canvases
    let clickHandler = null;

    const mojsCanvases = new Set();

    const snapshotMojsCanvases = () => {
      document.querySelectorAll(".mojs-canvas").forEach((el) => mojsCanvases.add(el));
    };

    const removeAllMojsCanvases = () => {
      snapshotMojsCanvases();
      mojsCanvases.forEach((el) => {
        try { el.parentNode?.removeChild(el); } catch (_) {}
      });
      document.querySelectorAll(".mojs-canvas").forEach((el) => {
        try { el.parentNode?.removeChild(el); } catch (_) {}
      });
      mojsCanvases.clear();
    };

    script.onload = () => {
      if (!mounted) return;

      const mojs = window.mojs;

      const B_CHILD = {
        fill: { "#ffffff": "#ef1cec" },
        delay: "rand(300, 359)",
        duration: 700,
        pathScale: "rand(0.8, 1)",
        isSwirl: true,
        swirlSize: "stagger(-2,2)",
        swirlFrequency: 1,
      };

      const burst1 = new mojs.Burst({
        count: "rand(15,20)", left: FW1_LEFT, top: "0%", x: 0, y: 320,
        radius: { 0: "rand(150,170)" },
        children: { ...B_CHILD },
      });
      const burst1_2 = new mojs.Burst({
        count: "rand(15,20)", left: FW1_LEFT, top: "0%", x: 0, y: 320,
        radius: { 0: "rand(150,170)" },
        children: { ...B_CHILD, delay: "rand(260,350)", pathScale: "rand(0.7,0.8)", degreeShift: 20 },
      });

      const burst2 = new mojs.Burst({
        count: "rand(15,20)", left: FW2_LEFT, top: "0%", x: 0, y: 300,
        radius: { 0: "rand(100,150)" },
        children: { ...B_CHILD, fill: { "#ffffff": "#d8ff00" } },
      });
      const burst2_2 = new mojs.Burst({
        count: "rand(15,20)", left: FW2_LEFT, top: "0%", x: 0, y: 300,
        radius: { 0: "rand(100,150)" },
        children: {
          ...B_CHILD, fill: { "#ffffff": "#d8ff00" },
          delay: "rand(260,350)", pathScale: "rand(0.7,0.8)", degreeShift: 20,
        },
      });

      const burst_tune = new mojs.Burst({
        count: "rand(15,20)", left: 0, top: 0, x: 0, y: 0,
        radius: { 0: "rand(100,150)" },
        children: { ...B_CHILD, delay: "rand(0,50)", fill: { "#ffffff": "#d8ff00" } },
      });
      const burst_tune_2 = new mojs.Burst({
        count: "rand(15,20)", left: 0, top: 0,
        radius: { 0: "rand(100,150)" },
        children: {
          ...B_CHILD, fill: { "#ffffff": "#d8ff00" },
          delay: "rand(10,150)", pathScale: "rand(0.7,0.8)", degreeShift: 20,
        },
      });

      clickHandler = (e) => {
        if (!mounted) return;
        burst_tune.generate().tune({ x: e.pageX, y: e.pageY }).replay();
        burst_tune_2.generate().tune({ x: e.pageX, y: e.pageY }).replay();
      };
      document.addEventListener("click", clickHandler);

      const FW_OPTS = {
        shape: "curve", fill: "none", isShowStart: false,
        strokeWidth: { 3: 0 }, stroke: "#ffffff",
        strokeDasharray: "100%", strokeDashoffset: { "-100%": "100%" },
        duration: 1000,
      };

      const fw1 = new mojs.Shape({
        ...FW_OPTS,
        radius: 170, radiusY: 20,
        left: FW1_LEFT, top: "0%", x: 0, y: 160, angle: -75,
        onStart() { if (mounted) { burst1.replay(0); burst1_2.replay(0); } },
      });

      const fw2 = new mojs.Shape({
        ...FW_OPTS,
        radius: 180, radiusY: 50,
        left: FW2_LEFT, top: "0%", x: 0, y: 150,
        strokeDashoffset: { "100%": "-100%" },
        angle: 60, delay: 200,
        onStart() { if (mounted) { burst2.replay(0); burst2_2.replay(0); } },
      });

      snapshotMojsCanvases();

      // ── KEY CHANGE: repeat: 2 = play 3 times total (1 initial + 2 repeats)
      // onPlaybackComplete fires after the final cycle finishes.
      timeline = new mojs.Timeline({
        repeat: TOTAL_PLAYS - 1,        // 0-based: 2 extra repeats = 3 total plays
        onPlaybackComplete() {
          if (!mounted) return;
          // Stop the timeline and wipe all canvases so nothing lingers
          try { timeline.stop(); } catch (_) {}
          removeAllMojsCanvases();
        },
      });
      timeline.add([fw1, fw2]);

      // Start after the 11s loading bar finishes
      delayTimer = setTimeout(() => {
        if (mounted && timeline) timeline.play();
      }, 11000);
    };

    document.head.appendChild(script);

    // ── CLEANUP — runs when App sets showLoader(false) ────────────────────
    return () => {
      mounted = false;

      if (delayTimer) { clearTimeout(delayTimer); delayTimer = null; }
      if (stopTimer)  { clearTimeout(stopTimer);  stopTimer  = null; }

      if (timeline) { try { timeline.stop(); } catch (_) {} timeline = null; }

      if (clickHandler) {
        document.removeEventListener("click", clickHandler);
        clickHandler = null;
      }

      removeAllMojsCanvases();

      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  return (
    <div className="app-wrapper">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div className="loading">
        <div className="bar"></div>
      </div>

      <div className="center">
        <div><h2>Heyaa, it's finally</h2></div>
        <div></div>
        <div><h2>March 19th</h2></div>
      </div>

      <div className="lm-stars"></div>

      <svg className="lm-mountains lm-mountains--layer1"
        xmlns="http://www.w3.org/2000/svg" width="1920" height="200"
        viewBox="0 0 1920 200" preserveAspectRatio="none">
        <title>bergskedja</title>
        <path d="M0,41.57s21.25,2.19,27.33,2.19,22.27-4.37,28.34,0-1,22.94,6.07,19.67S72.87,52,81,52.81s16.19,10.15,22.27,0,25.3-1.41,30.36,6.24,21.25,7.33,26.32,4.76,8.1-20.66,16.19-22,17.21-6.31,18.22,0,5.06,3,12.15,3,20.24-10.93,25.3-14.2S238.86,11,259.1,11s35.42,4.37,43.52,0S316.79.05,321.86.05,337-1,337,6.61s6.07,24.92,15.18,26.12,30.36,11,34.41,14.31,18.22-2.19,18.22-2.19c11.13,7.65,20.24,0,20.24,0S441.29,23,453.43,18.63s17.21,4.37,20.24,7.65S497,32.62,500,32.73s19.23-10.82,23.28-10.82,27.33-4.37,34.41-3.28,16.19,10.72,16.19,14.1S582,52.5,586,52.5s15.18,2.19,21.25,2.19,14.17,1.09,17.21,1.09,6.07-3.28,26.32-13.11S669,21.91,677.11,24.09s9.11,14.2,16.19,13.11,0-17.48,24.29-17.48a140.45,140.45,0,0,1,44.53,7.65s3,29.5,17.21,29.5c0,0,28.34-7.65,36.44-7.65s39.47,7.33,47.57,16.23,32.39,12.18,42.51,12.18,25.3,15.3,28.34,15.3,23.28,3.28,28.34-5.46S967.59,66.7,975.69,58s10.12-21.3,17.21-11.2,13.16,8.47,16.19,0,14.17-16.12,17.21-16.12,19.23,3.28,19.23,6.56,25.3-2.19,35.42-12,39.47-9.83,65.79-9.83,54.65,9.83,61.74,14.2,33.4,7.65,42.51,7.65,20.24,4.37,26.32,4.37,5.06,9.83,17.21,13.11,25.3-8.19,28.34-7.92,10.12-16.12,19.23-16.12,27.33,16.94,34.41,16.12,22.27,22.12,28.34,24.31,2,12.13,18.22,22.45,22.27,32.18,34.41,32.18,50.61-8.74,54.65-15.3,22.27-19.67,27.33-19.67,34.41-7.65,38.46-4.37,29.35,22.94,48.58,22.94,46.56-14.2,54.65-14.2,23.28-9.83,35.42-9.83,46.56,12,57.69,14.2,42.51,8.74,58.7,8.74,38.67-42.77,66.8-45.89c6.12-.68,20.24,1.09,20.24,1.09V200H0Z" />
      </svg>

      <svg className="lm-mountains lm-mountains--layer2"
        xmlns="http://www.w3.org/2000/svg" width="1920" height="200"
        viewBox="0 0 1920 200" preserveAspectRatio="none">
        <title>bergskedja2</title>
        <path d="M0,82.09s21.14-13,30.14-19,24-16,45-17.5,49.5-23.86,63-17c0,0,62.87.71,70.5,6.67s81,40.83,127.49,40.83,88.5-20.16,126-24.33,68.23-29.63,90-24.33,31.5,3.89,46.5-.72,25.5-19.61,42-19.61,25.5-7.1,51-7.1,39,11.59,63,11.59,60-3,75,3S864.1,4,882.09,4,934.41,22.09,960,17.59s58.59-7.5,75.09-4.5,36,16.9,61.5,25,82.5,17,97.5,18.55,51.77-6,67.5-10.5S1313,30,1330.81,38s23.76,44,44.76,44,45-6,57-12,31.5-22.5,45-22.5,12,7.5,31.5,7.5,42-4.5,57-4.5,24-25.5,49.5-22.5,66,1.9,90,13,49.5,30.55,78,33.55,54-16.5,69-12,44.91,19.5,67.45,19.5V200H0Z" />
      </svg>
    </div>
  );
}