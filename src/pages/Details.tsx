import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonLoading,
  useIonViewWillEnter,
} from "@ionic/react";
import React, { useState } from "react";
import { RouteComponentProps } from "react-router";
import { DetailsResult, useApi } from "../hooks/useApi";
import "./Home.css";
import {
  bodyOutline,
  clipboardOutline,
  starHalfOutline,
  trophyOutline,
} from "ionicons/icons";

interface DetailsPageProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const Details: React.FC<DetailsPageProps> = ({ match }) => {
  const { getDetails } = useApi();
  const [information, setInformation] = useState<DetailsResult | null>(null);
  const [loading, dismiss] = useIonLoading();

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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/movies"></IonBackButton>
          </IonButtons>
          <IonTitle>{information?.Genre}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {information && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>{information.Title}</IonCardTitle>
              <IonCardTitle>{information.Year}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonImg src={information.Poster} />
              <IonItem lines="none">
                <IonIcon icon={starHalfOutline} slot="start" color="warning" />
                <IonLabel>{information.imdbRating}</IonLabel>
              </IonItem>
            </IonCardContent>
          </IonCard>
        )}
        <IonModal
          trigger="open-modal"
          initialBreakpoint={0.25}
          breakpoints={[0, 0.25, 0.5, 0.75]}
        >
          <IonContent className="ion-padding">
            <IonItem lines="none">
              <IonIcon icon={clipboardOutline} slot="start" color="warning" />
              <IonLabel>{information?.Director}</IonLabel>
            </IonItem>

            <IonItem lines="none">
              <IonIcon icon={bodyOutline} slot="start" color="warning" />
              <IonLabel className="ion-text-wrap">
                {information?.Actors}
              </IonLabel>
            </IonItem>

            <IonItem lines="none">
              <IonIcon icon={trophyOutline} slot="start" color="warning" />
              <IonLabel className="ion-text-wrap">
                {information?.Awards}
              </IonLabel>
            </IonItem>

            <IonCard className="card">
              <IonCardHeader>
                <IonCardTitle>Plot</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>{information?.Plot}</IonCardContent>
            </IonCard>
          </IonContent>
        </IonModal>
        <IonFooter>
          <IonButton expand="full" id="open-modal">
            Show More
          </IonButton>
        </IonFooter>
      </IonContent>
    </IonPage>
  );
};

export default Details;
