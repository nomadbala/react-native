import { useState } from "react";
import {
  Text,
  ScrollView,
  Switch,
  ImageBackground,
  StyleSheet,
  ActivityIndicator,
  Touchable,
  TouchableHighlight,
  Platform,
  Image,
  View,
  Button,
  Pressable,
} from "react-native";

import FontAwesome from "@expo/vector-icons/FontAwesome";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
}) {
  return <FontAwesome size={28} {...props} />;
}

const headerImage = {
  uri: "https://glovoapp.com/images/open-graph-image-glovo.jpeg",
};

const logo = {
  uri: "https://cdn.dribbble.com/users/167298/screenshots/15126729/media/d00e4db712cee758ae63bafd49f7ffcd.png",
};

const previewImg = {
  uri: "https://play-lh.googleusercontent.com/AffJ2USkplKsNYKFOT3_gWdvQrf1wh0iZSja820erpztWu6_ZBMqS4Qy721Kxw2Hiw=w526-h296-rw",
};

const HR = () => {
  return (
    <View
      style={{
        borderBottomColor: "black",
        borderBottomWidth: StyleSheet.hairlineWidth,
      }}
    />
  );
};

const VR = () => {
  return (
    <View
      style={{
        borderRightColor: "black",
        borderRightWidth: StyleSheet.hairlineWidth,
        height: 50,
      }}
    />
  );
};

export default function TabGalleryScreen() {
  return (
    <ScrollView>
      <ImageBackground
        source={headerImage}
        resizeMode="stretch"
        style={styles.headerImage}
      >
        <TouchableHighlight style={{ paddingLeft: 32, paddingTop: 56 }}>
          <TabBarIcon name="arrow-left" />
        </TouchableHighlight>
      </ImageBackground>

      <View style={styles.header}>
        <Image source={logo} style={styles.logo} />
        <View style={{ gap: 8, justifyContent: "space-between" }}>
          <View style={{ marginBottom: 12 }}>
            <Text style={styles.header_title}>
              Glovo: Food Delivery and more
            </Text>
            <Text style={styles.header_subtitle}>
              Order Takeaway & Groceries etc
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingRight: 8,
            }}
          >
            <Pressable style={styles.cta_btn}>
              <Text style={{ color: "white" }}>Update</Text>
            </Pressable>
            <TabBarIcon name="external-link" />
          </View>
        </View>
      </View>

      <HR />

      <ScrollView style={styles.info} horizontal={true}>
        <View style={{ gap: 16, flexDirection: "row", alignItems: "center" }}>
          <View style={styles.info_column}>
            <Text style={{ color: "gray", fontWeight: 400, fontSize: 10 }}>
              130K RATINGS
            </Text>
            <Text style={{ fontWeight: 800, color: "gray" }}>4.9</Text>
            <Text>★★★★★</Text>
          </View>
          <VR />
          <View style={styles.info_column}>
            <Text style={{ color: "gray", fontWeight: 400, fontSize: 10 }}>
              AGE
            </Text>
            <Text style={{ fontWeight: 800, color: "gray" }}>12+</Text>
            <Text style={{ fontWeight: 800, color: "gray" }}>Years Old</Text>
          </View>
          <VR />
          <View style={styles.info_column}>
            <Text style={{ color: "gray", fontWeight: 400, fontSize: 10 }}>
              CHART
            </Text>
            <Text style={{ fontWeight: 800, color: "gray" }}>NO. 2</Text>
            <Text style={{ fontWeight: 800, color: "gray" }}>Lifestyle</Text>
          </View>
          <VR />
          <View style={styles.info_column}>
            <Text style={{ color: "gray", fontWeight: 400, fontSize: 10 }}>
              DEVELOPER
            </Text>
            <Text>
              <TabBarIcon name="user" />
            </Text>
            <Text style={{ fontWeight: 800, color: "gray" }}>
              Glovoapp 23 SL
            </Text>
          </View>
          <VR />
          <View style={styles.info_column}>
            <Text style={{ color: "gray", fontWeight: 400, fontSize: 10 }}>
              Language
            </Text>
            <Text>
              <Text style={{ fontWeight: 800 }}>EN</Text>
            </Text>
            <Text style={{ fontWeight: 800, color: "gray" }}>+ 21 More</Text>
          </View>
          <VR />
          <View style={styles.info_column}>
            <Text style={{ color: "gray", fontWeight: 400, fontSize: 10 }}>
              SIZE
            </Text>
            <Text>
              <Text style={{ fontWeight: 800, color: "gray" }}>196.5</Text>
            </Text>
            <Text style={{ color: "gray" }}>MB</Text>
          </View>
        </View>
      </ScrollView>

      <HR />

      <View style={{ paddingHorizontal: 16, paddingTop: 8, gap: 8 }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontWeight: 800, fontSize: 24 }}>What`s new</Text>
          <Text style={{ color: "dodgerblue" }}>Version History</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ color: "gray" }}>Version 9.48.0</Text>
          <Text style={{ color: "gray" }}>4h ago</Text>
        </View>
        <Text style={{ fontSize: 16 }}>
          Glovo`s mission to deliver anything you need, fast! And today we`re
          raising the bar with some new improvements. Here`s what you`ll find in
          out latest release: <Text style={{ color: "dodgerblue" }}>more</Text>
        </Text>
      </View>

      <HR />

      <View style={{ marginTop: 16, paddingLeft: 16 }}>
        <Text
          style={{
            fontWeight: 800,
            fontSize: 24,
          }}
        >
          Preview
        </Text>
        <ScrollView horizontal={true}>
          <View style={{ flexDirection: "row", gap: 24 }}>
            <Image
              source={previewImg}
              style={{ height: 400, width: 200, borderRadius: 16 }}
            />
            <Image
              source={previewImg}
              style={{ height: 400, width: 200, borderRadius: 16 }}
            />
            <Image
              source={previewImg}
              style={{ height: 400, width: 200, borderRadius: 16 }}
            />
            <Image
              source={previewImg}
              style={{ height: 400, width: 200, borderRadius: 16 }}
            />
            <Image
              source={previewImg}
              style={{ height: 400, width: 200, borderRadius: 16 }}
            />
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    flex: 1,
    width: "100%",
    height: 200,
    marginBottom: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingLeft: 16,
    paddingVertical: 16,
  },
  logo: {
    height: 100,
    width: 100,
    borderRadius: 16,
    marginRight: 16,
  },
  header_title: {
    flexWrap: "wrap",
    fontWeight: "800",
  },
  header_subtitle: {
    color: "gray",
  },
  cta_btn: {
    backgroundColor: "dodgerblue",
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: "flex-start",
    borderRadius: 16,
  },
  info: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingTop: 8,
    marginBottom: 8,
  },
  info_column: {
    flexDirection: "column",
    alignItems: "center",
    paddingVertical: 8,
  },
});
