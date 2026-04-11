import { icons } from "@/constants/icons";
import dayjs from "dayjs";
import { ImageSourcePropType } from "react-native";

export const formatCurrency = (value: number, currency = "USD"): string => {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return value.toFixed(2);
  }
};

export const formatSubscriptionDateTime = (value?: string): string => {
  if (!value) return "Not provided";
  const parsedDate = dayjs(value);
  return parsedDate.isValid()
    ? parsedDate.format("MM/DD/YYYY")
    : "Not provided";
};

const iconMatchers: Array<{
  keywords: string[];
  icon: ImageSourcePropType;
}> = [
  { keywords: ["spotify", "music", "audio", "sound"], icon: icons.spotify },
  { keywords: ["netflix", "movie", "video", "stream"], icon: icons.netflix },
  { keywords: ["notion", "notes", "productivity", "docs"], icon: icons.notion },
  { keywords: ["figma", "design", "ux", "ui"], icon: icons.figma },
  {
    keywords: ["adobe", "creative", "photoshop", "illustrator", "premiere"],
    icon: icons.adobe,
  },
  {
    keywords: ["github", "git", "code", "dev", "developer"],
    icon: icons.github,
  },
  { keywords: ["canva", "graphics", "branding"], icon: icons.canva },
  { keywords: ["claude", "openai", "ai", "assistant"], icon: icons.claude },
  { keywords: ["dropbox", "cloud", "storage"], icon: icons.dropbox },
  { keywords: ["medium", "writing", "blog"], icon: icons.medium },
  { keywords: ["openai", "gpt", "chat", "ai tools"], icon: icons.openai },
];

export const getSubscriptionIcon = (name?: string): ImageSourcePropType => {
  const normalized = (name ?? "").toLowerCase();
  for (const matcher of iconMatchers) {
    if (matcher.keywords.some((keyword) => normalized.includes(keyword))) {
      return matcher.icon;
    }
  }

  return icons.wallet;
};

export const formatStatusLabel = (value?: string): string => {
  if (!value) return "Unknown";
  return value.charAt(0).toUpperCase() + value.slice(1);
};
