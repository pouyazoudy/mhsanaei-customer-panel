export function volumeCalculation(download, upload, total) {
  const totalUsed = (download + upload) / 1024 / 1024 / 1024;
  const totalVolume = total / 1024 / 1024 / 1024;

  if (total === 0) {
    return {
      totalUsed: totalUsed.toFixed(2),
      totalVolume: "∞",
      volumePercentage: 0,
    };
  }

  return {
    totalUsed: totalUsed.toFixed(2),
    totalVolume: totalVolume.toFixed(2),
    volumePercentage: ((totalUsed / totalVolume) * 100).toFixed(2),
  };
}

export function remainingTimeCalculation(expiryTime) {
  const currentTime = Date.now();
  const remainingTime = expiryTime - currentTime;

  if (expiryTime === 0) {
    return {
      duration: "∞",
      percentageTime: 0,
    };
  } else if (remainingTime < 0) {
    return {
      duration: "Expired",
      percentageTime: 100,
    };
  }

  const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));

  const startedDate = expiryTime - 30 * 24 * 60 * 60 * 1000;
  const percentageTime = (
    ((currentTime - startedDate) / (expiryTime - startedDate)) *
    100
  ).toFixed(2);

  return {
    duration: `${days}d ${hours}h ${minutes}m `,
    percentageTime: +percentageTime,
  };
}
