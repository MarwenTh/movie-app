import {
  IonButton,
  IonContent,
  IonFooter,
  IonHeader,
  IonModal,
  IonPage,
  IonToolbar,
  ToggleCustomEvent,
  useIonLoading,
  useIonViewWillEnter,
} from "@ionic/react";
import React, { useEffect, useRef, useState } from "react";
import { RouteComponentProps } from "react-router";
import { DetailsResult, useApi } from "../hooks/useApi";
import "./Home.css";
import DetailsHeader from "../components/DetailsHeader";
import DetailsContent from "../components/DetailsContent";
import DetailsModal from "../components/DetailsModal";

interface DetailsPageProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const Details: React.FC<DetailsPageProps> = ({ match }) => {
  const { getDetails } = useApi();
  const [information, setInformation] = useState<DetailsResult | null>(null);
  const [loading, dismiss] = useIonLoading();
  const [themeToggle, setThemeToggle] = useState(false);
  const modal = useRef<HTMLIonModalElement>(null);

  const fetchData = async () => {
    await loading();
    const id = match.params.id;
    const data = await getDetails(id);
    await dismiss();
    setInformation(data);
    console.log(data);
  };

  useIonViewWillEnter(() => {
    fetchData();
  });

  const toggleDarkTheme = (shouldAdd: boolean) => {
    document.body.classList.toggle("dark", shouldAdd);
  };

  const initializeDarkTheme = (isDark: boolean) => {
    setThemeToggle(isDark);
    toggleDarkTheme(isDark);
  };

  const toggleChange = (ev: ToggleCustomEvent) => {
    toggleDarkTheme(ev.detail.checked);
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
        <IonToolbar>
          <DetailsHeader
            information={information}
            themeToggle={false}
            toggleChange={toggleChange}
          />
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <DetailsContent information={information} />
        <IonModal
          ref={modal}
          trigger="open-model"
          initialBreakpoint={0.25}
          breakpoints={[0, 0.5, 1]}
        >
          <DetailsModal information={information} />
        </IonModal>
        <IonFooter>
          <IonButton expand="full" id="open-model">
            Show More
          </IonButton>
        </IonFooter>
      </IonContent>
    </IonPage>
  );
};

export default Details;
