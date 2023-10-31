import React from "react";
import { DetailsResult } from "../hooks/useApi";
import {
  IonContent,
  IonItem,
  IonIcon,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from "@ionic/react";
import {
  clipboardOutline,
  manOutline,
  bodyOutline,
  trophyOutline,
  flagOutline,
  languageOutline,
  calendarClearOutline,
  walletOutline,
  tvOutline,
} from "ionicons/icons";

interface DetailsHeaderProps {
  information: DetailsResult | any;
}

const DetailsHeader: React.FC<DetailsHeaderProps> = ({ information }) => {
  return (
    <>
      <IonContent className="ion-padding content">
        {information?.Director && (
          <IonItem lines="none">
            <IonIcon icon={clipboardOutline} slot="start" color="warning" />
            <IonLabel className="ion-text-wrap">
              {information?.Director}
            </IonLabel>
          </IonItem>
        )}

        {information?.Writer && (
          <IonItem lines="none">
            <IonIcon icon={manOutline} slot="start" color="warning" />
            <IonLabel className="ion-text-wrap">{information?.Writer}</IonLabel>
          </IonItem>
        )}

        {information?.Actors && (
          <IonItem lines="none">
            <IonIcon icon={bodyOutline} slot="start" color="warning" />
            <IonLabel className="ion-text-wrap">{information?.Actors}</IonLabel>
          </IonItem>
        )}

        {information?.Awards && (
          <IonItem lines="none">
            <IonIcon icon={trophyOutline} slot="start" color="warning" />
            <IonLabel className="ion-text-wrap">{information?.Awards}</IonLabel>
          </IonItem>
        )}

        {information?.Country && (
          <IonItem lines="none">
            <IonIcon icon={flagOutline} slot="start" color="warning" />
            <IonLabel className="ion-text-wrap">
              {information?.Country}
            </IonLabel>
          </IonItem>
        )}

        {information?.Language && (
          <IonItem lines="none">
            <IonIcon icon={languageOutline} slot="start" color="warning" />
            <IonLabel className="ion-text-wrap">
              {information?.Language}
            </IonLabel>
          </IonItem>
        )}

        {information?.Released && (
          <IonItem lines="none">
            <IonIcon icon={calendarClearOutline} slot="start" color="warning" />
            <IonLabel className="ion-text-wrap">
              {information?.Released}
            </IonLabel>
          </IonItem>
        )}

        {information?.BoxOffice && (
          <IonItem lines="none">
            <IonIcon icon={walletOutline} slot="start" color="warning" />
            <IonLabel className="ion-text-wrap">
              {information?.BoxOffice}
            </IonLabel>
          </IonItem>
        )}

        {information?.totalSeasons && (
          <IonItem lines="none">
            <IonIcon icon={tvOutline} slot="start" color="warning" />
            <IonLabel className="ion-text-wrap">
              {information.totalSeasons} Seasons
            </IonLabel>
          </IonItem>
        )}

        {information?.Plot && (
          <IonCard className="card">
            <IonCardHeader>
              <IonCardTitle>Plot</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>{information?.Plot}</IonCardContent>
          </IonCard>
        )}
      </IonContent>
    </>
  );
};
export default DetailsHeader;
