import SplashScreen from "@/components/screens/SplashScreen";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Game",
    name: "The Congress BJP Deal",
    description: "An interactive political exposé quiz where players identify Congress leaders who defected to the BJP. 10 rounds, real politicians, real historical deals.",
    url: "https://thecongressbjpdeal.com",
    image: "https://thecongressbjpdeal.com/og-image.png",
    gamePlayMode: "https://schema.org/SinglePlayer",
    genre: "Quiz",
    inLanguage: ["en", "ml"],
    numberOfPlayers: {
      "@type": "QuantitativeValue",
      minValue: 1,
      maxValue: 1,
    },
    about: {
      "@type": "Thing",
      name: "Indian Politics",
      description: "Political party defections in India from Congress to BJP",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd)
            .replace(/</g, "\\u003c")
            .replace(/>/g, "\\u003e")
            .replace(/&/g, "\\u0026"),
        }}
      />
      <SplashScreen />
    </>
  );
}
