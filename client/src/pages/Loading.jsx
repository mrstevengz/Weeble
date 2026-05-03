import { useEffect, useRef } from 'react'
import {useNavigate} from 'react-router-dom'
import ParticleEngine from '../lib/ParticleEngine'

function Loading({ loading, error}) {

        const canvasRef = useRef(null);

        useEffect(() => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            function resizeCanvas() {
                const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
                canvas.width = window.innerWidth * pixelRatio;
                canvas.height = window.innerHeight * pixelRatio;
                canvas.style.width = `${window.innerWidth}px`;
                canvas.style.height = `${window.innerHeight}px`;
                canvas.getContext("2d").setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
            }

            resizeCanvas();

            const engine = new ParticleEngine(canvas);

            engine.start();

            const move = (e) => engine.addParticle(e.clientX, e.clientY);
            window.addEventListener("mousemove", move);
            window.addEventListener("resize", resizeCanvas);

            return () => {
                window.removeEventListener("mousemove", move);
                window.removeEventListener("resize", resizeCanvas);
                engine.stop();
            };
            }, []);

        const navigate = useNavigate()

        function enterApp() {
            navigate("/home")
            }

        return(
            <section className='loading-container'>
                <canvas ref={canvasRef} className='canvas-bg'/>
                <div className='loading-content'>
                    <h1>Weeble</h1>
                    <h2>5 tries to guess the correct animanga character.</h2>
                    {error && <p>{error}</p>}
                    {loading && <div className='spinner' />}
                    
                    <button disabled = {loading || error} onClick={enterApp}>{loading ? "Loading..." : "Enter App"}</button>
                </div>
            </section>
        )
}

export default Loading
