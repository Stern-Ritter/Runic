function toRad(angle: number) {
  return (angle * Math.PI) / 180;
}

function getDistance([prevLatitude, prevLongitude]: number[], [latitude, longitude]: number[]) {
  const prevLatitudeInRad = toRad(prevLatitude);
  const prevLongitudeInRad = toRad(prevLongitude);
  const latitudeInRad = toRad(latitude);
  const longitudeInRad = toRad(longitude);

  return (
    6377.830272 *
    Math.acos(
      Math.sin(prevLatitudeInRad) * Math.sin(latitudeInRad) +
        Math.cos(prevLatitudeInRad * Math.cos(latitudeInRad) *
         Math.cos(longitudeInRad - prevLongitudeInRad))
    )
  );
}

export default getDistance;