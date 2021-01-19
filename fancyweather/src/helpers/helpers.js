export default function convertTemperature(temperature) {
  return (temperature * 1.8 + 32).toFixed(1);
}

export function getMins(number) {
  if (number) {
    return Math.trunc((number % 1) * 100);
  }
  return Math.trunc((-number.lat % 1) * 100);
}
