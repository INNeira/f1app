import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonSpinner,
} from "@ionic/react";
import axios from "axios";
import './Tab1.css';

const Tab1: React.FC = () => {
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch data from the API
    axios
      .get("https://api.openf1.org/v1/sessions?year=2024")
      .then((response) => {
        setSessions(response.data); // Assuming response.data is an array
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>F1 Sessions</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {loading ? (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <IonSpinner />
            <p>Loading Sessions...</p>
          </div>
        ) : (
          <IonList>
            {sessions.map((session, index) => (
              <IonItem key={index}>
                <IonLabel>
                  <h2>{session.location}</h2>
                  <p>Date: {session.date_start}</p>
                  <p>Time: {session.session_type}</p>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
