import React, { useState, useEffect } from "react"; // Import useState
import MapView, { Marker, Polyline, Circle } from "react-native-maps";
import ImagePicker from "react-native-image-picker";

import MapViewDirections from "react-native-maps-directions";
import { Camera } from "expo-camera";

import styles from "./styles";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faGrip } from "@fortawesome/free-solid-svg-icons";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  onSnapshot,
} from "firebase/firestore";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
library.add(faGrip);

import * as Location from "expo-location";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { intitializeApp } from "firebase/app";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  ImageBackground,
} from "react-native";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8s75_DInKWYrIgbzeoxzNuDENRd_KiK4",
  authDomain: "hunt-b5bb7.firebaseapp.com",
  projectId: "hunt-b5bb7",
  storageBucket: "hunt-b5bb7.appspot.com",
  messagingSenderId: "551062228074",
  appId: "1:551062228074:web:edc3f61d863710a8868e13",
};

export default function App() {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const [cameraActive, setCameraActive] = useState(false);

  const [profilePicture, setProfilePicture] = useState(
    require("./assets/jag.jpg")
  );
  const [editProfilePicture, setEditProfilePicture] = useState(false);

  const [name, setName] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState(""); // Add email state
  const [password, setPassword] = useState(""); // Add password state
  const [showRegistration, setShowRegistration] = useState(false);
  const [userAuthenticated, setUserAuthenticated] = useState(false);

  const [userLocation, setUserLocation] = useState(null);
  const [mapRegion, setMapRegion] = useState(initialRegion);
  const [markers, setMarkers] = useState([]);

  const [missionName, setMissionName] = useState("");
  const [missionTime, setMissionTime] = useState("");
  const [userUid, setUserUid] = useState(""); // Declare userUid state
  const [userMissions, setUserMissions] = useState([]);
  const [navigationStarted, setNavigationStarted] = useState(false);
  const [startCoordinate, setStartCoordinate] = useState(null);
  const [endCoordinate, setEndCoordinate] = useState(null);

  const [routeCoordinates, setRouteCoordinates] = useState([]);

  const [showArrivedPopup, setShowArrivedPopup] = useState(false);
  const [popupMarker, setPopupMarker] = useState(null);

  const [shownMarkers, setShownMarkers] = useState({});
  const [missionStarted, setMissionStarted] = useState(false);

  const checkProximityAndShowPopup = () => {
    if (!selectedMissionId) return; // No selected mission, do nothing

    const selectedMission = userMissions.find(
      (mission) => mission.id === selectedMissionId
    );

    if (!selectedMission) return; // Selected mission not found, do nothing

    for (const marker of selectedMission.markers) {
      if (marker && !shownMarkers[marker.id]) {
        const distance = calculateDistance(userLocation, marker.coordinate);
        console.log(`Distance to marker: ${distance}`);
        if (missionStarted === true && distance < 4) {
          console.log("Popup should show");
          console.log(missionStarted + " Mission has started");
          console.log("Popup marker:", marker);
          setPopupMarker(marker);
          setShowArrivedPopup(true);
          setShownMarkers((prevShownMarkers) => ({
            ...prevShownMarkers,
            [marker.id]: true,
          }));

          updateAchievements("Explorer");
          updateAchievements("Speed Runner");
        }
      }
    }
  };

  useEffect(() => {
    // Reset shownMarkers when user's location changes
    setShownMarkers({}); // Reset to empty object
    checkProximityAndShowPopup();
  }, [userLocation]);

  // A function to calculate distance between two coordinates using Haversine formula
  function calculateDistance(coord1, coord2) {
    const R = 6371; // Radius of the Earth in kilometers
    const lat1 = coord1.latitude;
    const lon1 = coord1.longitude;
    const lat2 = coord2.latitude;
    const lon2 = coord2.longitude;

    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // Distance in kilometers
    return distance;
  }

  useEffect(() => {
    // Check proximity when the user's location changes
    checkProximityAndShowPopup();
  }, [userLocation]);

  const handlePopupOK = () => {
    setShowArrivedPopup(false); // Hide the popup
    setCameraActive(true); // Show the camera component
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location.coords);

      // Update the mapRegion to the user's location
      if (location.coords.latitude && location.coords.longitude) {
        setMapRegion({
          ...mapRegion,
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      }
    })();
  }, []);

  const [initialRegion, setInitialRegion] = useState({
    latitude: userLocation ? userLocation.latitude : 37.78825,
    longitude: userLocation ? userLocation.longitude : -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [allowMarkerPlacement, setAllowMarkerPlacement] = useState(false);
  const [markerInfo, setMarkerInfo] = useState([]);

  const handleMapPress = (event) => {
    if (allowMarkerPlacement) {
      const { coordinate } = event.nativeEvent;
      // Here, you can add marker information with default name and description
      const newMarkerInfo = [
        ...markerInfo,
        { name: "", description: "", coordinate },
      ];
      setMarkerInfo(newMarkerInfo);
    }
  };
  const [showNextScreen, setShowNextScreen] = useState(false);

  const handleCreateMission = () => {
    setAllowMarkerPlacement(true);

    const missionData = {
      markers: markers,
    };

    // clear the markers array to start fresh for a new mission
    setMarkers([]);
  };

  const handlePublishMission = async () => {
    const missionData = {
      name: missionName,
      time: missionTime,
      markers: markerInfo,
      createdByUid: userUid, // Include the user UID
    };

    try {
      // Get a reference to the Firestore instance
      const db = getFirestore();

      // Create a reference to the "missions" collection
      const missionsCollection = collection(db, "missions");

      // Add the mission data to the "missions" collection
      const docRef = await addDoc(missionsCollection, missionData);

      console.log("Mission data added with ID: ", docRef.id);

      // Clear the markers array and mission inputs after publishing
      setMarkerInfo([]);
      setMissionName("");
      setMissionTime("");

      setShowNextScreen(false);
      setAllowMarkerPlacement(false);
    } catch (error) {
      console.error("Error adding mission data: ", error);
    }
  };

  const handleCancellCreateMission = () => {
    // If currently in marker placement mode, cancel it
    setAllowMarkerPlacement(false);
    setMarkers([]); // Clear any existing markers
  };

  const [achievements, setAchievements] = useState([]); // Initialize achievements state

  const updateAchievements = (achievementName) => {
    setAchievements((prevAchievements) =>
      prevAchievements.map((achievement) =>
        achievement.name === achievementName
          ? { ...achievement, unlocked: true }
          : achievement
      )
    );
  };

  const [achievementsData, setAchievementsData] = useState([]);

  const fetchAllMissions = () => {
    try {
      const db = getFirestore();
      const missionsCollection = collection(db, "missions");
      const q = query(missionsCollection);

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const allMissionData = [];
        snapshot.forEach((doc) => {
          allMissionData.push({ id: doc.id, ...doc.data() });
        });

        setUserMissions(allMissionData);
      });

      return unsubscribe; // Return the unsubscribe function
    } catch (error) {
      console.error("Error fetching missions:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = fetchAllMissions();

    return () => {
      // Unsubscribe from the real-time listener when the component unmounts
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const [selectedMarkerDescription, setSelectedMarkerDescription] =
    useState("");
  const [selectedMissionId, setSelectedMissionId] = useState(null);

  const handleMissionClick = (missionId) => {
    setSelectedMissionId(missionId);

    setIsHeaderExpanded(false);

    const selectedMission = userMissions.find(
      (mission) => mission.id === missionId
    );

    if (selectedMission) {
      const missionRouteCoordinates = selectedMission.markers.map(
        (marker) => marker.coordinate
      );

      setRouteCoordinates(missionRouteCoordinates);
      setStartCoordinate(missionRouteCoordinates[0]);
      setEndCoordinate(
        missionRouteCoordinates[missionRouteCoordinates.length - 1]
      );
      setNavigationStarted(false); // Reset navigation state when a new mission is clicked

      // Update the selectedMarkerDescription
      setSelectedMarkerDescription(
        selectedMission.markers[0] ? selectedMission.markers[0].description : ""
      );

      // Set up the markers for each step of the mission
      setMarkerInfo(selectedMission.markers);
    } else {
      console.log(`Mission with id ${missionId} not found.`);
    }
  };

  const handleCreateAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("account created");
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Signed In");
        const user = userCredential.user;
        setName(user.displayName); // Update the name
        setUserAuthenticated(true); // Update userAuthenticated state

        // Set the user's UID in the userUid state
        setUserUid(user.uid);
        // Console log the user UID
        console.log("User UID:", user.uid);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleMarkerNameChange = (text, index) => {
    const updatedMarkerInfo = [...markerInfo];
    updatedMarkerInfo[index].name = text;
    setMarkerInfo(updatedMarkerInfo);
  };

  const handleMarkerDescriptionChange = (text, index) => {
    const updatedMarkerInfo = [...markerInfo];
    updatedMarkerInfo[index].description = text;
    setMarkerInfo(updatedMarkerInfo);
  };
  const handleHeaderTouch = () => {
    if (userAuthenticated) {
      setHeaderHeight(90);
    }
  };
  const handleLoginButtonClick = () => {
    setShowLogin(true);
    setShowRegistration(false);
  };

  const handleCreateAccountButtonClick = () => {
    setShowRegistration(true);
    setShowLogin(false);
  };
  const handleBackButtonClick = () => {
    setShowLogin(false);
    setShowRegistration(false);
  };
  const [selectedMarkerCoordinate, setSelectedMarkerCoordinate] =
    useState(null);

  const [isHeaderExpanded, setIsHeaderExpanded] = useState(false);

  const toggleHeaderExpansion = () => {
    setIsHeaderExpanded(!isHeaderExpanded);
  };

  return (
    <View style={styles.container}>
      {cameraActive && (
        <View style={styles.camera}>
          <Camera style={styles.camera1}>
            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  width: 70,
                  height: 70,
                  marginBottom: 50,
                  borderRadius: 35,
                  backgroundColor: "white",
                }}
              />
            </View>
          </Camera>
        </View>
      )}
      <View style={styles.homeWelcome}>
        <Image
          source={require("./assets/imageLogo.png")}
          style={styles.imageLogo}
        />
        <Text style={styles.logText}>SNAPQUEST</Text>
      </View>

      {navigationStarted && startCoordinate && (
        <View style={styles.missionStarted}>
          {/* Content for the mission started view */}
          <Text style={styles.missionStartedText}>Mission has started!</Text>
          <Text style={styles.missionStartedText1}>
            Ta en bild på: {selectedMarkerDescription}
          </Text>
        </View>
      )}
      {navigationStarted && startCoordinate && (
        <View style={styles.missionStartedBottom}>
          {/* Content for the mission started view */}
          <Text style={styles.missionStartedText1}>
            Ungefär tid: 2 timmar för att slutföra uppdraget.
          </Text>
        </View>
      )}
      {showNextScreen && (
        <View style={styles.nextScreen}>
          <TouchableOpacity
            onPress={() => setShowNextScreen(!showNextScreen)}
            style={styles.editBackButtonText}
          >
            <Text>Avbryt</Text>
          </TouchableOpacity>
          <View style={styles.inputHolder}>
            <TextInput
              placeholder="Mission Name"
              style={styles.inputInfo}
              value={missionName}
              onChangeText={(text) => setMissionName(text)}
            />
            <TextInput
              placeholder="Hur långt tid den bör ta."
              style={styles.inputInfo}
              value={missionTime}
              onChangeText={(text) => setMissionTime(text)}
            />

            {markerInfo.map((marker, index) => (
              <View key={index}>
                <Text style={styles.inputInfoTitle}>Marker {index + 1}</Text>
                <TextInput
                  placeholder="Name"
                  style={styles.inputInfo}
                  value={marker.name}
                  onChangeText={(text) => handleMarkerNameChange(text, index)}
                />
                <TextInput
                  placeholder="Description"
                  style={styles.inputInfo}
                  value={marker.description}
                  onChangeText={(text) =>
                    handleMarkerDescriptionChange(text, index)
                  }
                />
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={styles.doneButton}
            onPress={handlePublishMission}
          >
            <View style={styles.iconContainer}>
              <Text style={styles.doneText}>Publicera</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
      {allowMarkerPlacement && (
        <View style={styles.editMode}>
          <TouchableOpacity
            onPress={handleCancellCreateMission}
            style={styles.editBackButtonText}
          >
            <Text>Avbryt</Text>
          </TouchableOpacity>
          {/* Content of the edit mode */}

          <Text style={styles.editModeText}>
            Zooma in och tryck på kartan för att placera ut markörer i den
            ordningen du vill at din hunt ska delas med dina vänner.
          </Text>
        </View>
      )}
      {allowMarkerPlacement && (
        <View style={styles.editModeBottom}>
          {/* Content of the edit mode */}
          <Text style={styles.editModeText}></Text>
          <TouchableOpacity
            style={styles.editModeNext}
            onPress={() => setShowNextScreen(!showNextScreen)}
          >
            <View style={styles.iconContainer}>
              <Text style={styles.doneText}>Gå vidare till nästa steg.</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
      <MapView style={styles.map} region={mapRegion} onPress={handleMapPress}>
        {userLocation && (
          <Circle
            center={userLocation}
            radius={10}
            fillColor="#222"
            strokeColor="#fff"
            strokeWidth={2}
          />
        )}
        {/* Display markers */}
        {markers}

        {/* Display additional markers */}
        {markerInfo.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.coordinate}
            title={marker.name}
            description={marker.description}
            pinColor={
              selectedMarkerCoordinate === marker.coordinate
                ? "green" // Selected marker
                : "blue" // Other markers
            }
            onPress={() => {
              // Set the selected marker's coordinate when pressed
              setSelectedMarkerCoordinate(marker.coordinate);
              setNavigationStarted(true); // Start navigation to the selected marker
            }}
          />
        ))}

        {/* Display navigation route between mission markers */}
        {routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeColor="blue"
            strokeWidth={1}
          />
        )}

        {/* Display navigation directions from your position to the start marker */}
        {navigationStarted && userLocation && startCoordinate && (
          <MapViewDirections
            origin={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }}
            destination={startCoordinate}
            apikey="AIzaSyB5oQYJxt12J1g_IcwOQXNItcuYQtfFeTg" // Replace with your API key
            strokeWidth={3}
            mode="WALKING"
            strokeColor="blue"
          />
        )}

        {/* Display navigation directions between the start and selected end marker */}
        {navigationStarted && startCoordinate && selectedMarkerCoordinate && (
          <MapViewDirections
            origin={startCoordinate}
            destination={selectedMarkerCoordinate}
            apikey="AIzaSyB5oQYJxt12J1g_IcwOQXNItcuYQtfFeTg" // Replace with your API key
            strokeWidth={3}
            mode="WALKING"
            strokeColor="blue"
          />
        )}

        {/* Add a Start button */}
        {!navigationStarted && startCoordinate && (
          <TouchableOpacity
            style={styles.startButton}
            onPress={() => {
              setNavigationStarted(true);
              setMissionStarted(true);
            }}
          >
            <Text style={styles.startButtonText}>Fortsätt</Text>
          </TouchableOpacity>
        )}
      </MapView>

      {showArrivedPopup && popupMarker && popupMarker.id && (
        <View style={styles.popupContainer}>
          <Text style={styles.popupText}>
            You arrived! Take a picture of {popupMarker.description}
          </Text>
          <TouchableOpacity style={styles.okButton} onPress={handlePopupOK}>
            <Text style={styles.okText}>Ok</Text>
          </TouchableOpacity>
        </View>
      )}
      <View
        style={[
          styles.header,
          {
            height: userAuthenticated
              ? isHeaderExpanded
                ? "90%"
                : "13%" /* 13% */
              : showLogin || showRegistration
              ? "105%"
              : "50%",
          },
        ]}
      >
        {/* Header Content */}
        {/* Header Content */}
        {!userAuthenticated ? (
          <>
            {!showLogin && !showRegistration ? (
              <>
                <Text style={styles.headerTitle}>
                  Utforska, Upplev och Vinn: Välkommen till Huntify!
                </Text>
                <Text style={styles.headerText}>
                  Skapa dina egna spännande "Hunts" och bjud in vänner och
                  familj att delta. Förflytta er till olika platser, ta
                  bevisfoton och utmana varandra i jakten på segern.
                  Upplevelserna väntar – är du redo att börja jaga?
                </Text>
                <TouchableOpacity
                  style={styles.headerButton}
                  onPress={handleCreateAccountButtonClick}
                >
                  <Text style={styles.buttonText}>Skapa ett konto</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.LoginButton}
                  onPress={handleLoginButtonClick} // Update this line
                >
                  <Text style={styles.HasAccountText}>
                    Har du redan ett konto? Logga in.
                  </Text>
                </TouchableOpacity>
              </>
            ) : showLogin ? (
              /* Render login inputs and submit button when showLogin is true */
              <>
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={handleBackButtonClick}
                >
                  <Text style={styles.backButtonText}></Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Logga In</Text>
                <TextInput
                  onChangeText={(text) => setEmail(text)}
                  placeholder="Användarnamn"
                  style={styles.input}
                />
                <TextInput
                  placeholder="Lösenord"
                  secureTextEntry
                  style={styles.input}
                  onChangeText={(text) => setPassword(text)}
                />
                <TouchableOpacity
                  onPress={handleSignIn}
                  style={styles.loginSubmitButton}
                >
                  <Text style={styles.buttonText}>Logga in</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.headerButton2}
                  onPress={handleCreateAccountButtonClick}
                >
                  <Text style={styles.buttonText1}>
                    Har du inget konto? Skapa ett konto.
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={handleBackButtonClick}
                >
                  <Text style={styles.backButtonText}>Tillbaka</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Registrering</Text>
                <Text style={styles.headerText}>
                  Skapa ett konto för att få tillgång till Huntify. Fyll i din
                  e-postadress och ett lösenord för att komma igång och börja
                  skapa dina egna "Hunts". Du kan också delta i hundratals olika
                  hunts.
                </Text>
                <TextInput
                  placeholder="Omar Al-Salem"
                  style={styles.input}
                  onChangeText={(text) => setName(text)}
                />
                <TextInput
                  placeholder="example@example.com"
                  style={styles.input}
                  onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                  placeholder="Lösenord"
                  secureTextEntry
                  style={styles.input}
                  onChangeText={(text) => setPassword(text)}
                />
                <TouchableOpacity
                  style={styles.loginSubmitButton}
                  onPress={handleCreateAccount}
                >
                  <Text style={styles.buttonText}>Skapa konto</Text>
                </TouchableOpacity>
              </>
            )}
          </>
        ) : (
          /* Display different content when user is authenticated */

          <View style={styles.center}>
            <TouchableOpacity style={styles.profilePicture}>
              <Image
                source={require("./assets/jag.jpg")}
                style={styles.profileImage}
              />
            </TouchableOpacity>
            {!isHeaderExpanded && (
              <TouchableOpacity
                onPress={handleCreateMission}
                style={styles.createButton}
              >
                <View style={styles.iconContainer}>
                  <Text style={styles.createText}>
                    <FontAwesomeIcon
                      icon={faSquarePlus}
                      style={{ color: "#fff" }}
                      size={35}
                    />
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.menuButton}
              onPress={toggleHeaderExpansion}
            >
              <Text
                style={{
                  ...styles.SocialText,
                  textAlign: "center",
                  fontSize: 15,
                }}
              >
                <FontAwesomeIcon
                  icon={faGrip}
                  style={{ color: "#222" }}
                  size={30}
                />
              </Text>
            </TouchableOpacity>
            <View style={styles.scrollW}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.activeHuntsContainer}>
                  <Text style={styles.indentText}>
                    Populära hunts i närheten just nu:
                  </Text>

                  <View style={styles.featuredSliderCarosell}>
                    <ScrollView
                      horizontal={true} // Enable horizontal scrolling
                    >
                      <ImageBackground
                        source={require("./assets/botanska.jpg")}
                        style={styles.backgroundImage}
                      >
                        <View style={styles.overlay}></View>
                        <TouchableOpacity style={styles.carosellButton}>
                          <Text style={styles.carosellText}>
                            Botaniska Trädgården
                          </Text>
                        </TouchableOpacity>
                      </ImageBackground>
                      <ImageBackground
                        source={require("./assets/slottskogen.jpg")}
                        style={styles.backgroundImage}
                      >
                        <View style={styles.overlay}></View>
                        <TouchableOpacity style={styles.carosellButton}>
                          <Text style={styles.carosellText}>Slottsskogen</Text>
                        </TouchableOpacity>
                      </ImageBackground>
                      <ImageBackground
                        source={require("./assets/konst.jpg")}
                        style={styles.backgroundImage}
                      >
                        <View style={styles.overlay}></View>
                        <TouchableOpacity style={styles.carosellButton}>
                          <Text style={styles.carosellText}>
                            Göteborg Konst
                          </Text>
                        </TouchableOpacity>
                      </ImageBackground>
                    </ScrollView>
                  </View>
                  <Text style={styles.indentText2}>Active hunts:</Text>
                  <View style={styles.activeHuntsNow}>
                    {userMissions
                      .filter((mission) => mission.createdByUid !== userUid) // Exclude missions created by the user
                      .map((mission) => (
                        <TouchableOpacity
                          style={styles.myHunts}
                          key={mission.id}
                          onPress={() => handleMissionClick(mission.id)}
                        >
                          <Text style={styles.missionName}>{mission.name}</Text>
                          <Text>{mission.description}</Text>
                          {/* Add more mission details as needed */}
                        </TouchableOpacity>
                      ))}
                    {userMissions.filter(
                      (mission) => mission.createdByUid !== userUid
                    ).length === 0 && (
                      <Text style={styles.indentText2}>
                        Your friends hasn't created any hunts yet.
                      </Text>
                    )}
                  </View>

                  <Text style={styles.indentText2}>Planned Hunts:</Text>

                  <View style={styles.myHuntsContainer}>
                    {userMissions.map((mission) => (
                      <TouchableOpacity
                        style={styles.myHunts}
                        key={mission.id}
                        onPress={() => handleMissionClick(mission.id)}
                      >
                        <Text style={styles.missionName}>{mission.name}</Text>
                        <Text>{mission.description}</Text>
                        {/* Add more mission details as needed */}
                      </TouchableOpacity>
                    ))}
                  </View>

                  <Text style={styles.indentText2}>Medals:</Text>

                  <View style={styles.medalContainer}>
                    {achievementsData.map(
                      (achievement, index) =>
                        achievement.unlocked && (
                          <View key={index} style={styles.achievement}>
                            <Text style={styles.achievementName}>
                              {achievement.name}
                            </Text>
                            <Text style={styles.achievementDescription}>
                              {achievement.description}
                            </Text>
                          </View>
                        )
                    )}
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}
