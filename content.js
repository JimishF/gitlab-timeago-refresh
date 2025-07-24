(function() {
  if (!window.location.hostname.includes('gitlab')) {
    return;
  }

  const timeUnits = [
    { unit: 'year', seconds: 31536000 },
    { unit: 'month', seconds: 2592000 },
    { unit: 'day', seconds: 86400 },
    { unit: 'hour', seconds: 3600 },
    { unit: 'minute', seconds: 60 }
  ];

  function timeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);

    if (seconds < 60) {
      return 'just now';
    }

    for (const { unit, seconds: unitSeconds } of timeUnits) {
      const interval = Math.floor(seconds / unitSeconds);
      if (interval >= 1) {
        return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
      }
    }
  }

  function updateAllTimes() {
    document.querySelectorAll('time[datetime]').forEach(timeElement => {
      const dateTime = timeElement.getAttribute('datetime');
      if (dateTime) {
        const date = new Date(dateTime);
        const newTimeAgo = timeAgo(date);
        if (timeElement.textContent !== newTimeAgo) {
          timeElement.textContent = newTimeAgo;
        }
      }
    });
  }

  // Initial update
  updateAllTimes();

  // Update every 15 seconds
  setInterval(updateAllTimes, 15000);
})();