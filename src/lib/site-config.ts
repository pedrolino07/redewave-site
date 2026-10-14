// Contatos da RedeWaves — substitua pelos dados reais.
export const site = {
  name: "RedeWaves",
  slogan: "Sua visão. Nossa tecnologia. Seus problemas, nossas soluções.",
  whatsappNumber: "5500000000000", // formato internacional, só números
  whatsappMessage: "Olá, RedeWaves! Gostaria de conversar sobre um projeto.",
  instagram: "https://instagram.com/redewaves",
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
