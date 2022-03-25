function formatTime(ms: number) {
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor(((ms % 360000) % 60000) / 1000);
  return `${hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
}

function getDistance([prevLatitude, prevLongitude], [latitude, longitude]) {
  const prevLatitudeInRad = toRad(prevLatitude);
  const prevLongitudeInRad = toRad(prevLongitude);
  const latitudeInRad = toRad(latitude);
  const longitudeInRad = toRad(longitude);

  return (
    6377.830272 *
    Math.acos(
      Math.sin(prevLatitudeInRad) * Math.sin(latitudeInRad) +
        Math.cos(prevLatitudeInRad * Math.cos(latitudeInRad) * Math.cos(longitudeInRad - prevLongitudeInRad))
    )
  );
}

function toRad(angle: number) {
  return (angle * Math.PI) / 180;
}

export { getDistance, formatTime };
