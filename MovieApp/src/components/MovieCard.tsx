import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Movie } from "../app/types";

type MovieCardProps = {
  movie: Movie;
  navigation: any;
};

const MovieCard = ({ movie, navigation }: MovieCardProps) => {
  return (
    <Pressable
      key={movie.id}
      style={styles.movieItem}
      onPress={() =>
        navigation.navigate("MovieScreen", {
          movieId: movie.id,
        })
      }
    >
      <Image
        source={{ uri: movie.poster?.previewUrl }}
        style={styles.posterImage}
      />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.8)"]}
        style={styles.gradient}
      >
        <View style={styles.movieInfo}>
          <Text style={styles.movieName}>
            {movie.name || movie.alternativeName}
          </Text>
          <Text style={styles.movieDetails}>
            {movie.year} • {movie.type} •{" "}
            {movie.genres.map((g: any) => g.name).join(", ")}
          </Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.movieRating}>
              КП: {movie.rating.kp.toFixed(1)}
            </Text>
            <Text style={styles.movieRating}>
              IMDb: {movie.rating.imdb.toFixed(1)}
            </Text>
          </View>
        </View>
      </LinearGradient>
    </Pressable>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  movieItem: {
    marginBottom: 20,
    borderRadius: 8,
    overflow: "hidden",
  },
  posterImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "100%",
    justifyContent: "flex-end",
    padding: 15,
  },
  movieInfo: {
    justifyContent: "flex-end",
  },
  movieName: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  movieDetails: {
    color: "#CCC",
    fontSize: 14,
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  movieRating: {
    color: "#FF6B00",
    fontSize: 14,
    fontWeight: "bold",
  },
});
