"use client"
import React from 'react';
import Typed from 'typed.js';

export default function _Typed({ strings }: {
  strings: string[]
}) {
  // Create reference to store the DOM element containing the animation
  const el = React.useRef(null);

  React.useEffect(() => {
    const typed = new Typed(el.current, {
      strings: strings,
      typeSpeed: 40,
      backSpeed: 20,
      backDelay: 6000,
      loop: true,
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, [strings]);

  return (
    <div className="App">
      <span ref={el} />
    </div>
  );
}