const express = require("express");
const axios = require("axios");
const path = require("path");
const fs = require("fs");
const cfg = require("./config");

const app = express();
const PUBLIC = path.join(__dirname, "public");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function getDiscordUser(id) {
  const res = await axios.get(`https://discord.com/api/users/${id}`, {
    headers: {
      Authorization: `Bot ${cfg.DISCORD_BOT_TOKEN}`,
      "User-Agent": "DiscordBot (https://turk-devs.onrender.com, 1.0)"
    }
  });
  return res.data;
}

function serveHTML(res, file) {
  let html = fs.readFileSync(path.join(PUBLIC, file), "utf8");
  const vars = {
    SITE: cfg.SITE_NAME,
    DISCORD_INVITE: cfg.DISCORD_INVITE,
    HERO_BADGE: cfg.HERO_BADGE,
    HERO_SUB_TITLE: cfg.HERO_SUB_TITLE,
    HERO_DESC: cfg.HERO_DESC,
    HERO_BTN: cfg.HERO_BTN,
    TYPING1: cfg.HERO_TYPING1,
    TYPING2: cfg.HERO_TYPING2,
    ABOUT_TITLE: cfg.ABOUT_TITLE,
    ABOUT_SUB: cfg.ABOUT_SUB,
    CARD1_TITLE: cfg.CARD1_TITLE, CARD1_DESC: cfg.CARD1_DESC,
    CARD2_TITLE: cfg.CARD2_TITLE, CARD2_DESC: cfg.CARD2_DESC,
    CARD3_TITLE: cfg.CARD3_TITLE, CARD3_DESC: cfg.CARD3_DESC,
    STAT1_LABEL: cfg.STAT1_LABEL, STAT1_VALUE: cfg.STAT1_VALUE,
    STAT2_LABEL: cfg.STAT2_LABEL, STAT2_VALUE: cfg.STAT2_VALUE,
    STAT3_LABEL: cfg.STAT3_LABEL, STAT3_VALUE: cfg.STAT3_VALUE,
  };
  for (const [k, v] of Object.entries(vars)) {
    html = html.replace(new RegExp(`{{${k}}}`, "g"), v || "");
  }
  res.setHeader("Content-Type", "text/html").send(html);
}

app.get("/api/config", (req, res) => {
  res.json({
    siteName: cfg.SITE_NAME,
    discordInvite: cfg.DISCORD_INVITE,
    heroBadge: cfg.HERO_BADGE,
    heroSubTitle: cfg.HERO_SUB_TITLE,
    heroDesc: cfg.HERO_DESC,
    heroBtn: cfg.HERO_BTN,
    aboutTitle: cfg.ABOUT_TITLE,
    aboutSub: cfg.ABOUT_SUB,
    card1Title: cfg.CARD1_TITLE, card1Desc: cfg.CARD1_DESC,
    card2Title: cfg.CARD2_TITLE, card2Desc: cfg.CARD2_DESC,
    card3Title: cfg.CARD3_TITLE, card3Desc: cfg.CARD3_DESC,
  });
});

app.get("/api/team", async (req, res) => {
  const list = cfg.TEAM_MEMBERS;
  if (!list?.length) return res.json({ members: [] });

  const members = await Promise.all(list.map(async m => {
    try {
      const u = await getDiscordUser(m.id);
      return {
        id: u.id,
        tur: m.tur,
        username: u.username,
        displayName: u.global_name || u.username,
        avatar: u.avatar
          ? `https://cdn.discordapp.com/avatars/${u.id}/${u.avatar}.png?size=128`
          : "https://cdn.discordapp.com/embed/avatars/0.png",
        description: m.description || "",
        roblox_id: m.roblox_id || null,
      };
    } catch(e) {
      console.error(`[team] ${m.id}:`, e.response?.status, e.response?.data || e.message);
      return { id: m.id, tur: m.tur, username: "Bilinmiyor", displayName: "Bilinmiyor", avatar: "", description: m.description || "", roblox_id: m.roblox_id || null };
    }
  }));

  res.json({ members });
});

app.get("/api/stats", (req, res) => {
  res.json({
    stat1Label: cfg.STAT1_LABEL, stat1Value: cfg.STAT1_VALUE,
    stat2Label: cfg.STAT2_LABEL, stat2Value: cfg.STAT2_VALUE,
    stat3Label: cfg.STAT3_LABEL, stat3Value: cfg.STAT3_VALUE,
  });
});

app.get("/", (_, res) => serveHTML(res, "index.html"));
app.use(express.static(PUBLIC));

app.use((req, res) => {
  res.status(404).send(`<!DOCTYPE html><html lang="tr"><head><meta charset="UTF-8"/>
    <title>404 — ${cfg.SITE_NAME}</title>
    <style>*{margin:0;padding:0;box-sizing:border-box;}body{background:#0d0a0a;color:#fff;font-family:Inter,sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;gap:12px;}
    h1{font-size:4rem;font-weight:900;color:#dc2626;}p{color:rgba(255,255,255,.4);}a{color:#f87171;text-decoration:none;font-weight:600;margin-top:8px;display:block;}a:hover{color:#fff;}</style></head>
    <body><h1>404</h1><p>Sayfa bulunamadı.</p><a href="/">← Ana Sayfaya Dön</a></body></html>`);
});

app.listen(process.env.PORT || 8080, () => console.log(`[${cfg.SITE_NAME}] port ${process.env.PORT || 8080}`));