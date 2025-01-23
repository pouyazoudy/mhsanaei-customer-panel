export function generateVmess({
  id,
  port,
  add,
  ps,
  net,
  type,
  tls,
  path,
  authority,
}) {
  const vmessConfig = {
    v: "2",
    ps,
    add,
    port,
    id,
    net,
    type,
    tls,
    path,
    authority,
  };
  // تبدیل آبجکت به رشته JSON
  const jsonString = JSON.stringify(vmessConfig);

  // تبدیل رشته به UTF-8 و سپس به Base64
  const utf8Array = new TextEncoder().encode(jsonString);
  const base64String = btoa(String.fromCharCode(...utf8Array));

  // ساخت کانفیگ نهایی
  const vmessLink = `vmess://${base64String}`;

  return vmessLink;
}
