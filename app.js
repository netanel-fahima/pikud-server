import express from "express";
import fetch from "node-fetch";

const app = express();
const port = 9999;

const sampleAlerts = async () => {
  try {
    const response = await fetch(
      "https://www.kore.co.il/redAlert.json".concat("?qc=", Date.now()),
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const dataText = await response.text();

    if (dataText !== "null") {
      console.log("koreText", dataText);
    }

    const data = await JSON.parse(dataText);
    const now = new Date().toLocaleTimeString("he-IL");

    if (!data) {
      // console.log(`[${now}] ❌ אין התראה`, data);
      return;
    }

    console.log(`\n[${now}] 🚨🚨🚨 new kore alert`);
    console.log("kore", JSON.stringify(data));
  } catch (error) {
    const now = new Date().toLocaleTimeString("he-IL");
    console.error(`[${now}] 🔥 שגיאה בשליפת התראה:`, error.message);
  }
};

const kikarAlerts = async () => {
  try {
    const response = await fetch(
      "https://au.kikar.co.il/v1/oref/alerts".concat(
        "?time=",
        Math.round(Date.now() / 2e3)
      ),
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const dataText = await response.text();
    if (dataText !== "[]") {
      console.log("kikarText", dataText);
    }

    const data = await JSON.parse(dataText);
    const now = new Date().toLocaleTimeString("he-IL");

    if (!data || !data?.length) {
      // console.log(`[${now}] ❌ אין התראה`, data);
      return;
    }

    console.log(`\n[${now}] 🚨🚨🚨 Kikar alert`);
    console.log("kikar", JSON.stringify(data));
  } catch (error) {
    const now = new Date().toLocaleTimeString("he-IL");
    console.error(`[${now}] 🔥 שגיאה בשליפת התראה:`, error.message);
  }
};

// דגימה כל שנייה
setInterval(sampleAlerts, 1000);
setInterval(kikarAlerts, 1000);

// הפעלת שרת רק כדי שלא יסגר התהליך (אין צורך ב-API)
app.listen(port, () => {
  console.log(`📡 Alert logger running (no API) on port ${port}`);
});
