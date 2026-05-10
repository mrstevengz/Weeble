export function getDirection(order, guessed, secret) {
  const guessIndex = order.indexOf(guessed);
  const secretIndex = order.indexOf(secret);

  if (guessIndex === secretIndex) return "equal";
  return secretIndex > guessIndex ? "up" : "down";
}
export function getDecadeDirection(guessed, secret) {
  if (guessed === secret) return "equal";
  return secret > guessed ? "up" : "down";
}
export const age_group_order = [
  "Child (0-12)",
  "Teen (13-17)",
  "Young Adult (18-25)",
  "Adult (26-40)",
  "Older (40+)",
  "Ageless",
];
