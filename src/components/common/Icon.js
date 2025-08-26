"use client";

import { ICONS, DefaultIcon } from "@/utils/iconMap";

export default function Icon(props) {
  const IconComponent = ICONS[props.name] || DefaultIcon;
  
  return <IconComponent {...props} />;
}
