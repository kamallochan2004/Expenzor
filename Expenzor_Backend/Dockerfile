# Use Eclipse Temurin JDK 21 for ARM64 (works on Raspberry Pi 4/5 with 64-bit OS)
FROM eclipse-temurin:21-jdk-jammy as base

# Set working directory
WORKDIR /app

# Copy the Spring Boot JAR file
COPY target/*.jar app.jar

# Expose the app port
EXPOSE 8080

# Run the Spring Boot app
ENTRYPOINT ["java", "-jar", "app.jar"]
