(() => {
  const video = document.getElementById('marketing-film');
  if (!video) return;

  // Silent, inline playback is part of the hero, without a player interface.
  video.controls = false;
  video.defaultMuted = true;
  video.muted = true;

  function play() {
    if (document.hidden || !video.paused) return;
    const attempt = video.play();
    if (attempt) attempt.catch(() => {}); // Keep the clean poster if autoplay is blocked.
  }

  video.addEventListener('canplay', play);
  window.addEventListener('pageshow', play);
  window.addEventListener('focus', play);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) video.pause();
    else play();
  });
  // A normal page interaction can unlock autoplay on restrictive browsers.
  document.addEventListener('pointerdown', play, { passive: true });
  document.addEventListener('keydown', play);
  play();
})();
