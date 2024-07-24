import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  ActivityIndicator,
  Linking,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";

type QRCodeRef = {
  toDataURL: (callback: (data: string) => void) => void;
};

const TicketPurchaseScreen = ({ route, navigation }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [qrValue, setQrValue] = useState("");
  const [qrRef, setQrRef] = useState<QRCodeRef | null>(null);
  const { selectedSeats, movieName } = route.params;

  useEffect(() => {
    const qrData = JSON.stringify({
      movie: movieName,
      seats: selectedSeats,
      timestamp: new Date().toISOString(),
    });
    setQrValue(qrData);
  }, [movieName, selectedSeats]);

  const handlePurchase = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowModal(true);
    }, 2000);
  };

  const saveQRCode = () => {
    return new Promise<string>((resolve) => {
      qrRef?.toDataURL((data: string) => {
        resolve(data);
      });
    });
  };

  const saveToGallery = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === "granted") {
        const qrData = await saveQRCode();
        const fileUri = FileSystem.documentDirectory + "qr_code.png";
        await FileSystem.writeAsStringAsync(fileUri, qrData, {
          encoding: FileSystem.EncodingType.Base64,
        });
        await MediaLibrary.saveToLibraryAsync(fileUri);
        alert("QR-код сохранен в галерею!");
      } else {
        alert("Разрешение на доступ к медиатеке отклонено");
      }
    } catch (error) {
      console.error("Ошибка при сохранении QR-кода:", error);
      alert("Не удалось сохранить QR-код");
    }
  };

  const shareOnTelegram = async () => {
    try {
      const qrData = await saveQRCode();
      const fileUri = FileSystem.documentDirectory + "qr_code.png";
      await FileSystem.writeAsStringAsync(fileUri, qrData, {
        encoding: FileSystem.EncodingType.Base64,
      });
      await Sharing.shareAsync(fileUri, {
        UTI: ".png",
        mimeType: "image/png",
        dialogTitle: "Поделиться QR-кодом",
      });
    } catch (error) {
      console.error("Ошибка при отправке QR-кода:", error);
      alert("Не удалось отправить QR-код");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Покупка билета</Text>
      <Text style={styles.subtitle}>{`Выбранные места: ${selectedSeats.join(
        ", "
      )}`}</Text>

      {isLoading ? (
        <ActivityIndicator size="large" color="#FF6B00" />
      ) : (
        <Pressable style={styles.purchaseButton} onPress={handlePurchase}>
          <Text style={styles.purchaseButtonText}>Купить билет</Text>
        </Pressable>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Билет куплен!</Text>
          {qrValue && (
            <QRCode
              value={qrValue}
              size={200}
              getRef={(ref) => setQrRef(ref)}
            />
          )}
          <Text style={styles.qrText}>{movieName}</Text>
          <View style={styles.buttonContainer}>
            <Pressable style={styles.modalButton} onPress={saveToGallery}>
              <Text style={styles.buttonText}>Сохранить в галерею</Text>
            </Pressable>
            <Pressable style={styles.modalButton} onPress={shareOnTelegram}>
              <Text style={styles.buttonText}>Поделиться в Telegram</Text>
            </Pressable>
          </View>
          <Pressable
            style={[styles.modalButton, styles.closeButton]}
            onPress={() => {
              setShowModal(false);
              navigation.navigate("Home");
            }}
          >
            <Text style={styles.buttonText}>Закрыть</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: "#CCCCCC",
    marginBottom: 40,
  },
  purchaseButton: {
    backgroundColor: "#FF6B00",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  purchaseButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#1B1819",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 20,
  },
  qrText: {
    fontSize: 18,
    color: "#FFFFFF",
    marginTop: 20,
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "#FF6B00",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    flex: 1,
    marginHorizontal: 5,
  },
  closeButton: {
    backgroundColor: "#FC094C",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default TicketPurchaseScreen;
