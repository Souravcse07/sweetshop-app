export function getAutoStatus(createdAt) {
  const now = new Date();
  const created = new Date(createdAt);

  const diffMinutes = Math.floor(
    (now.getTime() - created.getTime()) / 60000
  );

  if (diffMinutes >= 30) return "Completed";
  if (diffMinutes >= 15) return "Ready";
  if (diffMinutes >= 5) return "Preparing";
  return "Placed";
}
