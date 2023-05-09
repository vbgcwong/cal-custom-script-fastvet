import ShortUniqueId from "short-unique-id";

export function getShortUid() {
  const shortUid = new ShortUniqueId({ length: 8 });

  return shortUid();
}
