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
import './Tab2.css';

const Tab2: React.FC = () => {

  const [drivers, setDrivers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch data from the API
    axios
      .get("https://api.openf1.org/v1/drivers?session_key=latest")
      .then((response) => {
        setDrivers(response.data); // Assuming response.data is an array
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
          <IonTitle>Last race F1 Drivers</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {loading ? (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <IonSpinner />
            <p>Loading Drivers...</p>
          </div>
        ) : (
          <IonList>
            {drivers.map((driver, index) => (
              <IonItem key={index}>
                <IonLabel>
                  <h2>{driver.team_name}</h2>
                  <p>Driver Name: {driver.full_name}</p>
                  <p>Driver Number: {driver.driver_number}</p>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
