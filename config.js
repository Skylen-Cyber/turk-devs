require("dotenv").config();

module.exports = {
  SITE_NAME: process.env.SITE_NAME,
  DISCORD_INVITE: process.env.DISCORD_GUILD_INVITE,
  SESSION_SECRET: process.env.SESSION_SECRET,
  DISCORD_BOT_TOKEN: process.env.DISCORD_BOT_TOKEN,

  HERO_BADGE: "Türk Geliştirici Topluluğu",
  HERO_TYPING1: "Projelerinizi",
  HERO_TYPING2: "Ekibinizi",
  HERO_SUB_TITLE: "birlikte inşa edin.",
  HERO_DESC: "Türk geliştiricilerin bir arada büyüdüğü, birbirini desteklediği ve proje geliştirdiği topluluk.",
  HERO_BTN: "Discord'a Katıl",

  ABOUT_TITLE: "Neden TurkDevs?",
  ABOUT_SUB: "Türk geliştiriciler için, Türk geliştiriciler tarafından.",

  CARD1_TITLE: "Güçlü Topluluk",
  CARD1_DESC: "Binlerce Türk geliştiriciyle tanış, işbirliği yap ve birlikte büyü.",

  CARD2_TITLE: "Proje Desteği",
  CARD2_DESC: "Projelerinizi sergileyin, geri bildirim alın ve ekibinizi bulun.",

  CARD3_TITLE: "Bilgi Paylaşımı",
  CARD3_DESC: "Deneyimli geliştiricilerden öğrenin, kendiniz de öğretin.",

  STAT1_LABEL: "Topluluk Üyesi",
  STAT1_VALUE: "1.500+",

  STAT2_LABEL: "Game Visits",
  STAT2_VALUE: "10M+",

  STAT3_LABEL: "Aktif Proje",
  STAT3_VALUE: "10+",

  TEAM_MEMBERS: [
    {
      id: "1454747716088234024",
      tur: "Kurucu",
      description: "Sitenin kurucusu.",
      roblox_id: 2359830447,
    },
  ],
};