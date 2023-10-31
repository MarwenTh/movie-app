import React from "react";
import {
  IonBackButton,
  IonButtons,
  IonTitle,
  IonToggle,
  ToggleCustomEvent,
} from "@ionic/react";
import { DetailsResult } from "../hooks/useApi";

interface DetailsHeaderProps {
  information: DetailsResult | null;
  themeToggle: boolean;
  toggleChange: (ev: ToggleCustomEvent) => void;
}

const DetailsHeader: React.FC<DetailsHeaderProps> = ({
  information,
  themeToggle,
  toggleChange,
}) => {
  return (
    <>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/movies"></IonBackButton>
      </IonButtons>
      <IonTitle>{information?.Genre}</IonTitle>
      <IonToggle
        aria-label="Dark toggle"
        color={"dark"}
        slot="end"
        className="ion-padding-end"
        checked={themeToggle}
        onIonChange={toggleChange}
      ></IonToggle>
    </>
  );
};

export default DetailsHeader;
