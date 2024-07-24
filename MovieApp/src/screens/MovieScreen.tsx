import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import MovieApiService from "../services/MovieApiService";
import { Movie } from "../app/types";
import { useAuth } from "../context/AuthContext";

const { width: screenWidth } = Dimensions.get("window");

export default function MovieScreen({ route, navigation }: any) {
  const { isLoggedIn } = useAuth();
  const { movieId } = route.params;
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movieService = new MovieApiService();
        const data = await movieService.fetchMovieById(movieId);
        setMovie(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching movie:", error);
        setError("Не удалось загрузить фильм. Пожалуйста, попробуйте позже.");
        setIsLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B00" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!movie) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Фильм не найден.</Text>
      </View>
    );
  }

  const handleBuyTickets = () => {
    if (isLoggedIn) {
      navigation.navigate("SessionSelectionScreen", {
        movieName: movie.name || movie.alternativeName,
      });
    } else {
      navigation.navigate("Register");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.posterContainer}>
          {movie.poster && (
            <Image
              source={{ uri: movie.poster.url }}
              style={styles.posterImage}
            />
          )}
          <LinearGradient
            colors={["transparent", "rgba(20,20,20,0.8)", "rgba(20,20,20,1)"]}
            style={styles.gradient}
          />
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Icon name="arrow-back" size={24} color="white" />
          </Pressable>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.movieName}>
            {movie.name || movie.alternativeName}
          </Text>
          <Text style={styles.movieDetails}>
            {movie.year} • {movie.type} •{" "}
            {movie.genres.map((g) => g.name).join(", ")}
          </Text>
          <View style={styles.ratingContainer}>
            <View style={styles.ratingBox}>
              <Text style={styles.ratingTitle}>Кинопоиск</Text>
              <Text style={styles.ratingValue}>
                {movie.rating.kp.toFixed(1)}
              </Text>
            </View>
            <View style={styles.ratingBox}>
              <Text style={styles.ratingTitle}>IMDb</Text>
              <Text style={styles.ratingValue}>
                {movie.rating.imdb.toFixed(1)}
              </Text>
            </View>
          </View>
          {movie.description && (
            <Text style={styles.movieDescription}>{movie.description}</Text>
          )}
          <Text style={styles.movieAdditionalInfo}>
            Страны: {movie.countries.map((c) => c.name).join(", ")}
          </Text>
        </View>
      </ScrollView>
      <Pressable style={styles.buyButton} onPress={handleBuyTickets}>
        <Text style={styles.buyButtonText}>Купить билеты</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414",
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#141414",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#141414",
  },
  posterContainer: {
    position: "relative",
    height: screenWidth * 1.5,
  },
  posterImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "50%",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
  },
  contentContainer: {
    padding: 20,
  },
  movieName: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  movieDetails: {
    color: "#CCC",
    fontSize: 16,
    marginBottom: 15,
  },
  ratingContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  ratingBox: {
    backgroundColor: "rgba(255, 107, 0, 0.1)",
    borderRadius: 8,
    padding: 10,
    marginRight: 15,
    alignItems: "center",
  },
  ratingTitle: {
    color: "#FF6B00",
    fontSize: 12,
    marginBottom: 5,
  },
  ratingValue: {
    color: "#FF6B00",
    fontSize: 18,
    fontWeight: "bold",
  },
  movieDescription: {
    color: "#CCC",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  movieAdditionalInfo: {
    color: "#999",
    fontSize: 14,
    marginBottom: 20,
  },
  errorText: {
    color: "#FF6B00",
    fontSize: 16,
    textAlign: "center",
  },
  buyButton: {
    backgroundColor: "#FF6B00",
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  buyButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
