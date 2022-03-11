### Build ###
FROM maven:3.8.4-jdk-17-alpine as build
# COPY source files
COPY /src /usr/src/wellApp/src
# COPY pom
COPY pom.xml /usr/src/wellApp
# COPY ojdbc driver
COPY ojdbc7.jar /usr/src/wellApp
# COPY Dockerfile (just)
COPY Dockerfile /usr/src/wellApp

# Build jar
RUN mvn -f /usr/src/wellApp/pom.xml clean install
WORKDIR /usr/src/wellApp/src
### RUN ###
FROM openjdk:17-alpine
# Add volume ?
VOLUME /tmp
# EXPOSE port
EXPOSE 8080
# COPY built jar
COPY target/wellApp-0.0.1-SNAPSHOT.jar app.jar
# RUN jar file
#ENTRYPOINT ["java", "-Djava.security.edg=file:/dev/./urandom", "-jar", "/app.jar"]
#
#CMD ["mvn", "spring-boot:run"]