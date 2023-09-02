import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#edf2f7",
    alignItems: "center",
    justifyContent: "center",
  },
  usernameText: {
    color: "#222",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  headerImage: {
    aspectRatio: 16 / 9,
    resizeMode: "cover", // Adjust this to your image's aspect ratio
  },
  floatingMenuContainer: {
    zIndex: 1,
    position: "absolute",
    top: "10%",
    width: "500%",

    alignItems: "center",
    alignContent: "center",
  },
  floatingMenu: {
    height: 40,
    width: 140,
    backgroundColor: "#fff",
    flexDirection: "row",
    borderRadius: 30,
  },
  floatingMenuButton: {
    height: 40,
    width: 70,
    borderRadius: 30,
    backgroundColor: "#222",
    borderWidth: 1,
    borderColor: "#eee",
  },
  floatingMenuButtonUtforska: {
    height: 40,
    width: 70,
    borderRadius: 100,
    backgroundColor: "#fff",
    /*  borderWidth: 1,
    borderColor: "#eee", */
  },
  floatingMenuText: {
    color: "#fff",
  },
  floatingMenuText2: {
    color: "#222",
  },
  header: {
    position: "absolute", // Use "absolute" positioning
    bottom: "-1%",
    backgroundColor: "#fff",
    width: "100%",
    paddingVertical: "10%",
    alignItems: "center",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: "50%",
  },
  headerTitle: {
    color: "black",
    fontSize: 14,
    width: "90%", // Set width to 90%
    fontWeight: "bold",
  },
  headerText: {
    color: "black",
    fontSize: 15,
    width: "90%", // Set width to 90%
  },
  headerSelector: {
    backgroundColor: "#fff",
    width: "90%",
    paddingVertical: 35,
    borderRadius: 30,
    marginTop: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#edf2f7",
  },
  headerButton: {
    backgroundColor: "#abedc2",
    width: "90%",
    paddingVertical: 20,
    borderRadius: 30,
    marginTop: 20,
    alignItems: "center",
  },
  headerButton2: {
    backgroundColor: "#fff",
    marginTop: 50,
    width: "90%",
    paddingVertical: 20,
    borderRadius: 30,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  HasAccountText: {
    color: "black",
    fontSize: 16,
  },
  LoginButton: {
    backgroundColor: "#fff",
    width: "90%",
    paddingVertical: 20,
    marginTop: 20,
    alignItems: "center",
  },
  input: {
    backgroundColor: "#f3f4f6",
    width: "90%",
    paddingVertical: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#f3f4f6",
    marginTop: 20,
    alignItems: "center",

    paddingLeft: 15,
  },
  loginSubmitButton: {
    backgroundColor: "#abebc3",
    width: "90%",
    paddingVertical: 20,
    borderRadius: 30,
    marginTop: 20,
    alignItems: "center",
  },

  OrText: {
    paddingVertical: "20%",
    color: "#8c8d99",
    fontSize: 16,
  },

  socialButton: {
    backgroundColor: "#fff",
    width: "90%",
    paddingVertical: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#edf2f7",
    marginTop: 20,

    paddingLeft: 40,
    color: "black",
    fontSize: 16,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  SocialText: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },

  googleImage: {
    paddingRight: 10,
  },
  homeWelcome: {
    position: "absolute",
    top: "3%",
    /*     left: 20, */
    zIndex: 10,
    fontWeight: "bold",
    fontSize: 20,
    color: "#222",
    paddingTop: 5,
    height: 60,
    width: 120,
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    /*     borderRadius: 100,
    borderWidth: 1,
    borderColor: "#edf2f7", */
    alignItems: "center",
    flexDirection: "row",
  },
  logText: {
    paddingTop: 10,
    fontWeight: "bold",
  },
  imageLogo: {
    width: 30, // Adjust this value to control the image size
    height: 30, // Maintain the aspect ratio
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  profilePicture: {
    position: "absolute",
    backgroundColor: "transparent",
    width: 60,
    height: 60,

    borderRadius: "100%",

    marginTop: 20,

    color: "black",
    marginTop: "-5%",
    flexDirection: "row",
    left: "2.5%",
  },
  createButton: {
    position: "absolute",
    left: "30%",
    bottom: "20%",
    width: 140,
    height: 60,
    backgroundColor: "#222",
    alignItems: "center",
    borderRadius: 20,
  },
  editMode: {
    position: "absolute",
    top: 0,
    zIndex: 1,

    width: "100%",
    paddingVertical: 20,
    backgroundColor: "#fff",
    paddingRight: 20,
    paddingLeft: 20,
  },

  editModeBottom: {
    position: "absolute",
    bottom: 0,
    zIndex: 1,

    width: "100%",
    paddingVertical: 50,
    backgroundColor: "#fff",
    paddingRight: 20,
    paddingLeft: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  editModeNext: {
    position: "absolute",
    right: 20,
    bottom: "100%",
    width: "100%",
    height: 60,
    backgroundColor: "#222",
    alignItems: "center",
    borderRadius: 20,
  },
  doneButton: {
    position: "absolute",
    left: 20,
    bottom: "5%",
    width: "90%",
    height: 60,
    backgroundColor: "#222",
    alignItems: "center",
    borderRadius: 20,
  },
  editModeText: {
    paddingTop: 80,
  },
  backButtonText: {
    marginTop: 110,
  },
  editBackButtonText: {
    zIndex: 1,
    position: "absolute",
    top: 65,
    left: 20,
    color: "#222",
    width: 70,
    height: 34,
  },
  nextScreen: {
    zIndex: 2,
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,

    height: "100%",
    width: "100%",
    backgroundColor: "#FFF",
  },
  inputHolder: {
    paddingTop: 110,
    paddingLeft: "5%",
    width: "95%",
  },
  inputInfoTitle: {
    paddingTop: 10,
  },
  inputInfo: {
    marginTop: 10,
    paddingLeft: "5%",
    width: "100%",
    paddingVertical: 20,
    borderWidth: 2,
    borderColor: "#f3f4f6",
    borderRadius: 15,
    backgroundColor: "#f3f4f6",
  },
  doneText: {
    color: "#fff",
    paddingTop: 10,
    fontWeight: "bold",
  },
  createText: {
    color: "#FFF",
    paddingTop: 20,
    fontWeight: "bold",
  },
  iconContainer: {
    paddingTop: 15,
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
  },
  floatingIconContainer: {
    paddingTop: 10,
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
  },
  menuButton: {
    position: "absolute",
    right: "-2.5%",
    backgroundColor: "transparent",
    width: 60,
    heigh: 80,
    paddingVertical: 20,

    marginTop: 20,
    fontSize: 15,
    color: "black",
    marginTop: "-5%",
    flexDirection: "row",
  },
  medalContainer: {
    marginTop: 20,
    marginLeft: "2.5%",
    width: "105%",
    paddingVertical: 40,
    backgroundColor: "#f3f4f6",
  },
  activeHuntsContainer: {
    marginTop: 5,
    marginLeft: "-2.5%",
    width: "95%",
  },

  indentText: {
    marginLeft: "5%",
    marginTop: 20,
    paddingBottom: 20,
  },
  scrollW: {
    marginTop: 50,
    width: "100%",
  },
  indentText2: {
    marginLeft: "5%",
    marginTop: 10,
    paddingBottom: 0,
  },
  myHuntsContainer: {
    marginTop: 0,
    backgroundColor: "#fff",
  },
  myHunts: {
    borderRadius: 15,
    marginLeft: "5%",
    width: "100%",
    height: 90,
    borderWidth: 2,
    borderColor: "#f3f4f6",
    marginTop: 20,
    paddingLeft: 20,
  },
  featuredActiveHunts: {
    backgroundColor: "transparent",
    width: "100%",
    paddingVertical: 70,
    borderRadius: 15,

    marginTop: 20,

    paddingLeft: 20,
    marginLeft: "2.5%",
    color: "black",
    fontSize: 16,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  featuredScroll: {
    backgroundColor: "transparent",
    width: "100%",
    marginLeft: "4%",
    borderRadius: 15,
    color: "black",
    fontSize: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  featuredImage: {
    borderRadius: 15,
    borderWidth: 2,
    marginTop: 0,
    borderColor: "#edf2f7",
    marginLeft: 10,
    flex: 1,
    resizeMode: "cover", // This ensures the image covers the entire button
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  featuredText: {
    color: "#fff",
    width: "100%",
    height: "100%",
    alignItems: "center",
    fontWeight: "bold",
  },
  featuredSliderCarosell: {
    marginTop: 1,
    paddingBottom: 30,
    maxHeight: 90,
    marginLeft: 25,
    width: "100%",
  },
  missionName: {
    marginTop: 30,
  },

  sliderCarosell: {
    position: "absolute",
    bottom: "15%",
    maxHeight: 60,
  },

  carosellButtonContainer: {
    flexDirection: "row",
    paddingHorizontal: 30,
    overflow: "scroll", // Enable horizontal scrolling
    overflow: "hidden",
  },

  carosellButton: {
    backgroundColor: "transparent",
    paddingVertical: 20,
    paddingHorizontal: 20,

    borderRadius: 15,

    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  backgroundImage: {
    marginLeft: 10,
    flex: 1,
    resizeMode: "cover", // This ensures the image covers the entire button
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderRadius: 15,
    borderWidth: 0.1,
    borderColor: "#edf2f7",
  },
  carosellText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.2)", // Adjust the alpha value for darkness
    width: "100%",
    height: "100%",
    position: "absolute",
    borderRadius: 15,
  },
  startButton: {
    position: "absolute",
    bottom: "15%",
    left: "25%",
    height: 50,
    width: "50%",
    backgroundColor: "#222",
    borderRadius: 15,
    alignItems: "center",
  },
  startButtonText: {
    paddingTop: 15,
    color: "#fff",
  },
  missionStarted: {
    zIndex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    height: "20%",
    width: "100%",
    backgroundColor: "#fff",
  },
  missionStartedBottom: {
    zIndex: 2,
    position: "absolute",
    bottom: 0,
    left: 0,
    height: "23%",
    width: "100%",
    backgroundColor: "#fff",
  },
  popupContainer: {
    zIndex: 4,
    position: "absolute",
    top: "25%",
    left: "5%",
    height: "30%",
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: "30",
  },
  okButton: {
    width: "90%",
    marginTop: "5%",
    marginLeft: "5%",
    height: 50,
    backgroundColor: "#222",
    borderRadius: 15,
    alignContent: "center",
    alignItems: "center",
  },
  okText: {
    paddingTop: 20,
    color: "#fff",
  },
  popupText: {
    paddingTop: 70,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 25,
  },
  camera: {
    zIndex: 2,
    position: "absolute",
    left: 0,
    right: 0,
    height: "100%",
    width: "100%",
  },
  camera1: {
    zIndex: 5,
    position: "absolute",
    left: 0,
    right: 0,
    height: "100%",
    width: "100%",
  },
  missionStartedText: {
    marginTop: 90,
    paddingLeft: 20,
  },
  missionStartedText1: {
    paddingLeft: 20,
  },
});

export default styles;
