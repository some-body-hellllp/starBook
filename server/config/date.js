function CurrentTime() {
  const now = new Date();
  const options = { timeZone: "Asia/Seoul" };

  const koreanTime = new Date(now.toLocaleString("en-US", options));

  console.log("현재 시간 :", koreanTime.getHours(), "시");

  const year = koreanTime.getFullYear();
  const month = String(koreanTime.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(koreanTime.getDate()).padStart(2, "0");

  const hours = String(koreanTime.getHours()).padStart(2, "0");
  const minutes = String(koreanTime.getMinutes()).padStart(2, "0");
  const seconds = String(koreanTime.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} (${hours}:${minutes}:${seconds})`;
}
module.exports = { CurrentTime };
