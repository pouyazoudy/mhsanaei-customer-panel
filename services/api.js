import { generateVmess } from "@/utils/generate-vmess";

export const getClientData = async (uuid) => {
  const fetchOptions = {
    next: { revalidate: 30 },
    headers: {
      Accept: "application/json",
      Cookie: process.env.COOKIE_TWO,
    },
  };

  try {
    // Get client traffic data
    const trafficResponse = await fetch(
      `${process.env.BASE_URL}/getClientTrafficsById/${uuid}`,
      fetchOptions
    );
    
    if (!trafficResponse.ok) throw new Error(`HTTP error! Status: ${trafficResponse.status}`);
    const trafficData = await trafficResponse.json();

    // Get inbound data
    const inboundResponse = await fetch(
      `${process.env.BASE_URL}/get/${trafficData.obj[0].inboundId}`,
      { ...fetchOptions, headers: { ...fetchOptions.headers, Cookie: process.env.COOKIE_ONE } }
    );
    
    if (!inboundResponse.ok) throw new Error(`HTTP error! Status: ${inboundResponse.status}`);
    const inboundResult = await inboundResponse.json();

    // Process data
    const streamSettings = JSON.parse(inboundResult.obj.streamSettings);
    const externalProxy = streamSettings.externalProxy[0];
    const settings = JSON.parse(inboundResult.obj.settings);
    const matchedClient = settings.clients.find(client => client.id === uuid);

    if (!matchedClient) throw new Error("No client found with the specified UUID");

    // Generate VMESS config
    const vmessConfig = generateVmess({
      id: matchedClient.id,
      port: externalProxy.port,
      add: externalProxy.dest,
      ps: matchedClient.email,
      net: streamSettings.grpcSettings.network || "grpc",
      type: streamSettings.grpcSettings.multiMode ? "multi" : "none",
      tls: streamSettings.grpcSettings.security || "none",
      path: streamSettings.grpcSettings.serviceName || "",
      authority: streamSettings.grpcSettings.authority || "",
    });

    return {
      clientData: trafficData,
      inboundData: {
        matchedClient,
        streamSettings,
        vmessConfig
      }
    };

  } catch (error) {
    console.error("Error in getClientData:", error);
    throw new Error(`Failed to get client data: ${error.message}`);
  }
};