import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  baseAlpha: number;
  isRed: boolean;
}

interface WebNode {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  radius: number;
  ring: number;
  spoke: number;
}

interface WebCanvasProps {
  redAuraMode?: boolean;
}

export const WebCanvas: React.FC<WebCanvasProps> = ({ redAuraMode = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; isHovering: boolean }>({
    x: -1000,
    y: -1000,
    isHovering: false
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = width < 768;
    const particleCount = isMobile ? 35 : 75;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Initialize floating atmospheric particles
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      const isRed = Math.random() < (redAuraMode ? 0.45 : 0.15);
      const alpha = Math.random() * 0.35 + 0.1;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (prefersReducedMotion ? 0.05 : 0.35),
        vy: (Math.random() - 0.5) * (prefersReducedMotion ? 0.05 : 0.35),
        radius: Math.random() * 1.6 + 0.6,
        alpha,
        baseAlpha: alpha,
        isRed
      });
    }

    // Initialize geometric spider-web radial anchors
    const webNodes: WebNode[] = [];
    const webCenterX = width * 0.85;
    const webCenterY = height * 0.25;
    const numSpokes = isMobile ? 8 : 12;
    const numRings = isMobile ? 4 : 6;
    const maxRadius = isMobile ? 240 : 380;

    for (let r = 1; r <= numRings; r++) {
      const radius = (r / numRings) * maxRadius;
      for (let s = 0; s < numSpokes; s++) {
        const angle = (s / numSpokes) * Math.PI * 2 + (r % 2 === 0 ? 0.05 : 0);
        const nx = webCenterX + Math.cos(angle) * radius;
        const ny = webCenterY + Math.sin(angle) * radius;
        webNodes.push({
          x: nx,
          y: ny,
          originX: nx,
          originY: ny,
          vx: 0,
          vy: 0,
          radius: r === numRings ? 1.5 : 2,
          ring: r,
          spoke: s
        });
      }
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
        isHovering: true
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.isHovering = false;
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Ambient radial gradient spotlight
      const grad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.35,
        50,
        width * 0.5,
        height * 0.5,
        width * 0.8
      );
      if (redAuraMode) {
        grad.addColorStop(0, 'rgba(220, 38, 38, 0.08)');
        grad.addColorStop(0.5, 'rgba(15, 5, 5, 0.4)');
        grad.addColorStop(1, 'rgba(2, 2, 3, 0.98)');
      } else {
        grad.addColorStop(0, 'rgba(28, 28, 32, 0.12)');
        grad.addColorStop(0.6, 'rgba(6, 6, 8, 0.5)');
        grad.addColorStop(1, 'rgba(3, 3, 3, 0.98)');
      }
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Render & Animate Spider Web Structure
      const mouse = mouseRef.current;
      
      // Update Web Nodes with elastic tension
      webNodes.forEach((node) => {
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 180 && mouse.isHovering) {
          const force = (180 - dist) / 180;
          node.vx += (dx / dist) * force * 1.5;
          node.vy += (dy / dist) * force * 1.5;
        }

        // Return to origin spring
        const ox = node.originX - node.x;
        const oy = node.originY - node.y;
        node.vx += ox * 0.035;
        node.vy += oy * 0.035;
        node.vx *= 0.86;
        node.vy *= 0.86;

        node.x += node.vx;
        node.y += node.vy;
      });

      // Draw web spokes (radial lines)
      ctx.lineWidth = 0.65;
      for (let s = 0; s < numSpokes; s++) {
        ctx.beginPath();
        ctx.moveTo(webCenterX, webCenterY);
        for (let r = 1; r <= numRings; r++) {
          const node = webNodes.find((n) => n.spoke === s && n.ring === r);
          if (node) {
            ctx.lineTo(node.x, node.y);
          }
        }
        ctx.strokeStyle = redAuraMode
          ? 'rgba(220, 38, 38, 0.22)'
          : 'rgba(255, 255, 255, 0.07)';
        ctx.stroke();
      }

      // Draw concentric web rings
      for (let r = 1; r <= numRings; r++) {
        ctx.beginPath();
        for (let s = 0; s < numSpokes; s++) {
          const node = webNodes.find((n) => n.spoke === s && n.ring === r);
          if (node) {
            if (s === 0) ctx.moveTo(node.x, node.y);
            else ctx.lineTo(node.x, node.y);
          }
        }
        // close ring
        const firstNode = webNodes.find((n) => n.spoke === 0 && n.ring === r);
        if (firstNode) ctx.lineTo(firstNode.x, firstNode.y);
        ctx.strokeStyle = redAuraMode
          ? 'rgba(220, 38, 38, 0.18)'
          : 'rgba(255, 255, 255, 0.05)';
        ctx.stroke();
      }

      // Render Floating Dust & Star Particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around borders
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Gentle breathing alpha
        p.alpha = p.baseAlpha + Math.sin(time + p.x) * 0.08;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        if (p.isRed || redAuraMode) {
          ctx.fillStyle = `rgba(220, 38, 38, ${Math.max(0.05, p.alpha * 1.3)})`;
        } else {
          ctx.fillStyle = `rgba(220, 220, 230, ${Math.max(0.05, p.alpha)})`;
        }
        ctx.fill();
      });

      // Subtle dynamic red connection threads between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const alpha = (1 - dist / 110) * (redAuraMode ? 0.18 : 0.05);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = particles[i].isRed || redAuraMode
              ? `rgba(220, 38, 38, ${alpha * 1.5})`
              : `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [redAuraMode]);

  return (
    <canvas
      ref={canvasRef}
      id="starboy-ambient-web-canvas"
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.95 }}
    />
  );
};
