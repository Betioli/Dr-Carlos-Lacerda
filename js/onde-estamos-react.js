import React, { useEffect, useRef } from 'https://esm.sh/react@18.3.1';
import { createRoot } from 'https://esm.sh/react-dom@18.3.1/client';
import createGlobe from 'https://esm.sh/cobe';

const h = React.createElement;

const GLOBE_CONFIG = {
    width: 800,
    height: 800,
    devicePixelRatio: 2,
    phi: 0,
    theta: 0.2,
    dark: 0,
    diffuse: 1.2,
    mapSamples: 16000,
    mapBrightness: 6,
    mapBaseBrightness: 0,
    baseColor: [1, 1, 1],
    markerColor: [251 / 255, 100 / 255, 21 / 255],
    glowColor: [1, 1, 1],
    markers: [
        { location: [37.78, -122.44], size: 0.03, id: 'sf' },
        { location: [40.71, -74.01], size: 0.03, id: 'nyc' },
        { location: [51.51, -0.13], size: 0.03, id: 'london' },
        { location: [35.68, 139.65], size: 0.03, id: 'tokyo' },
        { location: [48.85, 2.35], size: 0.03, id: 'paris' },
        { location: [-23.55, -46.63], size: 0.03, id: 'sao-paulo' },
    ],
};

function Globe({ className = '', config = GLOBE_CONFIG }) {
    const canvasRef = useRef(null);
    const globeRef = useRef(null);
    const frameRef = useRef(0);
    const widthRef = useRef(0);
    const phiRef = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;

        if (!canvas) {
            return undefined;
        }

        const updateSize = () => {
            widthRef.current = canvas.offsetWidth || 640;
            globeRef.current?.update({
                width: widthRef.current * 2,
                height: widthRef.current * 2,
            });
        };

        window.addEventListener('resize', updateSize);
        updateSize();

        const globe = createGlobe(canvas, {
            ...config,
            width: widthRef.current * 2,
            height: widthRef.current * 2,
        });

        globeRef.current = globe;

        const animate = () => {
            phiRef.current += 0.005;
            globe.update({ phi: phiRef.current });
            frameRef.current = window.requestAnimationFrame(animate);
        };

        frameRef.current = window.requestAnimationFrame(animate);

        const timer = window.setTimeout(() => {
            canvas.style.opacity = '1';
        }, 0);

        return () => {
            window.clearTimeout(timer);
            window.cancelAnimationFrame(frameRef.current);
            window.removeEventListener('resize', updateSize);
            globe.destroy();
            globeRef.current = null;
        };
    }, [config]);

    return h(
        'div',
        { className: `onde-react-globe ${className}`.trim() },
        h('canvas', {
            ref: canvasRef,
            className: 'onde-react-globe-canvas',
        }),
    );
}

function OndeEstamosSection() {
    return h(
        'div',
        { className: 'onde-react-card' },
        h(
            'div',
            { className: 'onde-react-copy' },
            h('span', { className: 'onde-kicker' }, 'Atendimento presencial e online'),
            h(
                'p',
                { className: 'onde-react-text' },
                'Nosso escritório está localizado na cidade de Jaboticabal, SP, cobrindo toda a região, e também com atendimento online em todo o território nacional Brasileiro.',
            ),
        ),
        h(
            'div',
            { className: 'onde-globe-shell', 'aria-hidden': 'true' },
            h(Globe, null),
        ),
    );
}

const mountNode = document.getElementById('onde-estamos-react');

if (mountNode) {
    createRoot(mountNode).render(h(OndeEstamosSection));
}
