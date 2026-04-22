export type BalanceParts = {
  wholePart: string;
  fractionPart: string;
  separator: "." | ",";
};

export const parseBalanceParts = (value: string | number): BalanceParts => {
  if (typeof value === "number") {
    const formatted = value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    const [wholePart, fractionPart = "00"] = formatted.split(".");
    return { wholePart, fractionPart, separator: "." };
  }

  const normalized = value.trim();
  const separatorIndex = Math.max(
    normalized.lastIndexOf("."),
    normalized.lastIndexOf(","),
  );

  if (separatorIndex === -1) {
    return { wholePart: normalized, fractionPart: "", separator: "." };
  }

  const separator = normalized[separatorIndex] === "," ? "," : ".";

  return {
    wholePart: normalized.slice(0, separatorIndex),
    fractionPart: normalized.slice(separatorIndex + 1),
    separator,
  };
};
