import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonGrid,
  IonCol,
  IonText,
  IonCardContent,
  IonImg,
  IonItem,
  IonIcon,
} from "@ionic/react";
import { starHalfOutline } from "ionicons/icons";
import React from "react";
import { DetailsResult } from "../hooks/useApi";

interface DetailsContentProps {
  information: DetailsResult | any;
}

const DetailsContent: React.FC<DetailsContentProps> = ({ information }) => {
  const formatVotes = (votes: string | undefined): string => {
    if (!votes) return "";
    const num = parseInt(votes.replace(/,/g, ""));
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else {
      return num.toString();
    }
  };

  return (
    <>
      {information && (
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>{information?.Title}</IonCardTitle>
          </IonCardHeader>
          <IonGrid className="ion-padding-start">
            <IonCol>
              <IonText>
                {information?.Type.charAt(0).toUpperCase() +
                  information?.Type.slice(1)}
              </IonText>
            </IonCol>
            <IonCol>
              <IonText>{information?.Year}</IonText>
            </IonCol>
            <IonCol>
              <IonText>{information?.Rated}</IonText>
            </IonCol>
            <IonCol>
              <IonText>{information?.Runtime}</IonText>
            </IonCol>
          </IonGrid>

          <IonCardContent>
            <IonImg src={information?.Poster} />
            <IonItem lines="none">
              <IonIcon
                icon={starHalfOutline}
                color="warning"
                className="ion-padding-end"
              />
              {information.imdbRating}/10
              <IonText className="padding">∘</IonText>
              <IonText className="padding">
                {formatVotes(information?.imdbVotes)}
              </IonText>
            </IonItem>
          </IonCardContent>
        </IonCard>
      )}
    </>
  );
};

export default DetailsContent;
