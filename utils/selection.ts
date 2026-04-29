export function getSelectedText(
  selection: Selection | undefined | null,
): string {
  return selection?.toString().trim().replace(/\s+/g, " ") ?? "";
}

export function getSelectedHtml(
  selection: Selection | undefined | null,
): string {
  if (!selection?.rangeCount) return "";
  const range = selection.getRangeAt(0);
  const div = document.createElement("div");
  div.appendChild(range.cloneContents());
  return div.innerHTML;
}

export function getSelectionPosition(
  selection: Selection | undefined | null,
): DOMRect | null {
  if (!selection?.rangeCount) return null;
  return selection.getRangeAt(0).getBoundingClientRect();
}
