import {
  IonAvatar,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
  useIonLoading,
  IonToast,
  IonToggle,
  ToggleCustomEvent,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { SearchResult, SearchType, useApi } from "../hooks/useApi";
import {
  gameControllerOutline,
  moonOutline,
  toggle,
  tvOutline,
  videocamOutline,
} from "ionicons/icons";
import "./Home.css";

const Home: React.FC = () => {
  const { searchData } = useApi();
  const [searchTerm, setSearchTerm] = useState("");
  const [type, setType] = useState<SearchType>(SearchType.all);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, dismiss] = useIonLoading();
  const [themeToggle, setThemeToggle] = useState(false);

  const loadData = async () => {
    await loading();
    const result: any = await searchData(searchTerm, type);
    console.log(" results", result);
    await dismiss();

    if (result?.Error) {
      setError(result.Error);
    } else {
      setResults(result.Search);
    }
  };

  useEffect(() => {
    if (searchTerm === "") {
      setResults([]);
      return;
    }

    loadData();
  }, [searchTerm, type]);

  const toggleDarkTheme = (shouldAdd: boolean) => {
    document.body.classList.toggle("dark", shouldAdd);
  };

  const toggleChange = (ev: ToggleCustomEvent) => {
    toggleDarkTheme(ev.detail.checked);
  };

  const initializeDarkTheme = (isDark: boolean) => {
    setThemeToggle(isDark);
    toggleDarkTheme(isDark);
  };

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
    initializeDarkTheme(prefersDark.matches);
    prefersDark.addEventListener("change", (mediaQuery) =>
      initializeDarkTheme(mediaQuery.matches)
    );
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"primary"}>
          <IonTitle>FilmFlow</IonTitle>
          <IonToggle
            aria-label="Dark toggle"
            color={"dark"}
            slot="end"
            className="ion-padding-end"
            checked={themeToggle}
            onIonChange={toggleChange}
          ></IonToggle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonSearchbar
          value={searchTerm}
          debounce={300}
          onIonChange={(e) => setSearchTerm(e.detail.value || "")}
        ></IonSearchbar>
        <IonItem>
          <IonLabel>Select SearchType</IonLabel>
          <IonSelect
            value={type || ""}
            onIonChange={(e) => setType(e.detail.value || "")}
          >
            <IonSelectOption value="">All</IonSelectOption>
            <IonSelectOption value="movie">Movies</IonSelectOption>
            <IonSelectOption value="series">Series</IonSelectOption>
            <IonSelectOption value="game">Game</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonList>
          {results.map((item: SearchResult) => (
            <IonItem
              button
              key={item.imdbID}
              routerLink={`/movies/${item.imdbID}`}
            >
              <IonAvatar slot="start">
                <img src={item.Poster} alt={item.Title} />
              </IonAvatar>
              <IonLabel className="ion-text-wrap">{item.Title}</IonLabel>
              {item.Type === "movie" && <IonIcon icon={videocamOutline} />}
              {item.Type === "series" && <IonIcon icon={tvOutline} />}
              {item.Type === "game" && <IonIcon icon={gameControllerOutline} />}
            </IonItem>
          ))}
        </IonList>
        <IonToast
          isOpen={!!error}
          message={error}
          duration={7000}
          onDidDismiss={() => setError("")}
          buttons={[{ text: "Dismiss", role: "cancel" }]}
        />
      </IonContent>
    </IonPage>
  );
};

export default Home;
