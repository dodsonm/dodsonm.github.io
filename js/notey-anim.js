document.querySelectorAll('.notey-close').forEach(el => {
  el.onclick = () => {
    gsap.to('#notey-splash-1', {
      y: 100,
      opacity: 0,
      duration: 0.3,
      ease: "power1.out",
      onComplete() {
        document.querySelector('#notey-splash-1').remove();
      }
    });
  };
});

gsap.from('#notey-splash-1', {
  // width: 0,
  y: -300,
  opacity: 0,
  duration: 1,
  ease: 'bounce',
  onComplete() {
    gsap.to('#notey-splash-1 .notey-head h1', {
      opacity: 1,
      fontSize: '64',
      duration: 0.5,
      ease: 'elastic',
      onComplete() {
        gsap.to('#notey-splash-1 p', {
          opacity: 1,
          duration: 0.2,
        });
      }
    });
  }
});
