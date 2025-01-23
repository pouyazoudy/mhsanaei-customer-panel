"use server";

import { notFound, redirect } from "next/navigation";
import xss from "xss";

export default async function parseConfigs(formData) {
  const vmessUrl = formData.get("vmessUrl");

  if (!vmessUrl) {
    throw new Error("vmessUrl cannot be empty");
  }

  const sanitizedVmessUrl = xss(vmessUrl);

  if (!sanitizedVmessUrl.startsWith("vmess://")) {
    throw new Error("Invalid URL format");
  }

  const base64String = sanitizedVmessUrl.replace("vmess://", "");
  const base64Regex = /^[A-Za-z0-9+/=]+$/;

  if (!base64Regex.test(base64String)) {
    throw new Error("Invalid string");
  }

  let decodedString;
  try {
    decodedString = atob(base64String);
  } catch (error) {
    throw new Error("Failed to decode string");
  }

  let vmessConfig;
  try {
    vmessConfig = JSON.parse(decodedString);
  } catch (error) {
    throw new Error("Failed to parse string");
  }

  if (!vmessConfig.id) {
    throw new Error("Missing 'id' field in vmess config");
  }

  const uuid = vmessConfig.id;

  const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  if (!uuidRegex.test(uuid)) {
    throw new Error("Invalid format");
  }

  redirect(`/${uuid}`);
}
