import express from "express";
import fetch from "node-fetch";

const app = express();
const port = 9999;

const sampleAlerts = async () => {
  try {
    const response = await fetch("https://www.kore.co.il/redAlert.json");

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    const now = new Date().toLocaleTimeString("he-IL");

    if (!data) {
      console.log(`[${now}] ❌ אין התראה`, data);
      return;
    }

    console.log(`\n[${now}] 🚨🚨🚨 התקבלה התראה חדשה`);
    console.log(data);
  } catch (error) {
    const now = new Date().toLocaleTimeString("he-IL");
    console.error(`[${now}] 🔥 שגיאה בשליפת התראה:`, error.message);
  }
};

// דגימה כל שנייה
setInterval(sampleAlerts, 1000);

// הפעלת שרת רק כדי שלא יסגר התהליך (אין צורך ב-API)
app.listen(port, () => {
  console.log(`📡 Alert logger running (no API) on port ${port}`);
});
