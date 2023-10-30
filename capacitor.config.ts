import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.test.ionicApp",
  appName: "ionic-app",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
};

export default config;
