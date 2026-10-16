// Contatos da RedeWaves — substitua pelos dados reais.
export const site = {
  name: "RedeWave ",
  slogan: "Sua visão. Nossa tecnologia. Seus problemas, nossas soluções.",
  whatsappNumber: "5562920069563", // formato internacional, só números
  whatsappMessage: "Olá, RedeWaves! Gostaria de conversar sobre um projeto.",
  instagram: "https://www.instagram.com/redwave.ms/",
  email: "contato@redewaves.com.br",
};

export const whatsappLink = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(site.whatsappMessage)}`;

export const navLinks = [
  { href: "#solucoes", label: "Soluções" },
  { href: "#diferenciais", label: "Diferenciais" },
  { href: "#processo", label: "Processo" },
  { href: "#sobre", label: "Sobre" },
  { href: "#contato", label: "Contato" },
];
