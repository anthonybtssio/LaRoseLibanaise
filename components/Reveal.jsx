import { useEffect, useRef, useState } from 'react';

export default function Reveal({ children, className = '', style = {}, delay = 0, onReveal }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const onRevealRef = useRef(onReveal);
  onRevealRef.current = onReveal;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          onRevealRef.current && onRevealRef.current();
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'perspective(900px) rotateX(0deg) translateY(0)' : 'perspective(900px) rotateX(8deg) translateY(30px)',
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
