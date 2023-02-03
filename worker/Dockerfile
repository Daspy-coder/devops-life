FROM maven:3.5.4-jdk-8-alpine AS build

WORKDIR /code

COPY pom.xml /code/pom.xml
RUN ["mvn", "dependency:resolve", "--quiet"]
RUN ["mvn", "verify", "--quiet"]

# Adding source, compile and package into a fat jar
COPY ["src/main", "/code/src/main"]
RUN ["mvn", "package", "--quiet"]

FROM openjdk:8-jre-alpine3.9

COPY --from=build /code/target/worker-jar-with-dependencies.jar /

CMD ["java", "-XX:+UnlockExperimentalVMOptions", "-XX:+UseCGroupMemoryLimitForHeap", "-jar", "/worker-jar-with-dependencies.jar"]
