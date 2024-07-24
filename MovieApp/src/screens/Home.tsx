import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { loadFonts } from "../../expo-fonts";
import { useAuth } from "../context/AuthContext";
import MovieApiService from "../services/MovieApiService";
import { LinearGradient } from "expo-linear-gradient";
import { Movie } from "../app/types";

const HomeScreen = ({ navigation }: any) => {
  const [movies, setMovies] = useState<Movie[] | any[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    async function loadApp() {
      try {
        await loadFonts();
        await fetchMovies();
      } catch (err) {
        console.error("Error loading app:", err);
      }
    }
    loadApp();
  }, []);

  const fetchMovies = async () => {
    try {
      const movieService = new MovieApiService();
      const data = await movieService.fetchMovies(1, 5);
      setMovies(data.docs);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setError("Не удалось загрузить фильмы. Пожалуйста, попробуйте позже.");
      setIsLoading(false);
    }
  };

  const handleMoviePress = (movieId: string) => {
    if (isLoggedIn) {
      navigation.navigate("MovieScreen", { movieId });
    } else {
      navigation.navigate("Login");
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FC094C" />
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

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={["rgba(252, 9, 76, 0.8)", "transparent"]}
        style={styles.gradient}
      />
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Сейчас в кино</Text>
          <Text style={styles.location}>Фильмы в Астане</Text>
        </View>
        {isLoggedIn ? (
          <Pressable
            onPress={() => navigation.navigate("Profile")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Профиль</Text>
          </Pressable>
        ) : (
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.buttonText}>Войти</Text>
          </Pressable>
        )}
      </View>

      {movies && movies.length > 0 && (
        <>
          <Pressable onPress={() => handleMoviePress(movies[0].id.toString())}>
            <Image
              style={styles.banner}
              source={{ uri: movies[0].poster?.url }}
            />
            <LinearGradient
              colors={["transparent", "rgba(27, 24, 25, 0.8)"]}
              style={styles.bannerGradient}
            />
            <Text style={styles.bannerTitle}>{movies[0].name}</Text>
          </Pressable>

          <View style={styles.callToAction}>
            <Text style={styles.sectionTitle}>Все фильмы</Text>
            <Pressable
              style={styles.button}
              onPress={() => navigation.navigate("Browse")}
            >
              <Text style={styles.buttonText}>Смотреть все</Text>
            </Pressable>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.movieScroll}
          >
            {movies.slice(1).map((movie) => (
              <Pressable
                key={movie.id}
                onPress={() => handleMoviePress(movie.id.toString())}
                style={styles.movieItem}
              >
                <Image
                  style={styles.movieBanner}
                  source={{ uri: movie.poster?.previewUrl }}
                />
              </Pressable>
            ))}
          </ScrollView>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B1819",
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 200,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 24,
    fontFamily: "Poppins",
    fontWeight: "bold",
  },
  location: {
    color: "#CCCCCC",
    fontSize: 14,
  },
  banner: {
    width: "100%",
    height: 250,
    borderRadius: 12,
    marginBottom: 16,
  },
  bannerGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 16,
    height: 100,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  bannerTitle: {
    position: "absolute",
    bottom: 30,
    left: 16,
    right: 16,
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  callToAction: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "Poppins",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#FC094C",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  movieScroll: {
    paddingLeft: 24,
  },
  movieItem: {
    marginRight: 16,
  },
  movieBanner: {
    width: 120,
    height: 180,
    borderRadius: 8,
  },
  movieTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
    width: 120,
    marginTop: 8,
    marginBottom: 4,
  },
  movieRating: {
    color: "#FC094C",
    fontSize: 12,
    width: 120,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1B1819",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1B1819",
  },
  errorText: {
    color: "#FC094C",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});

export default HomeScreen;
