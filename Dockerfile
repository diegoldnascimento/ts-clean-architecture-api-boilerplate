# Use the official RavenDB image from the Docker Hub
FROM ravendb/ravendb:latest

# Expose the necessary ports
# 8080 is for HTTP access to the RavenDB server
# 38888 is for the inter-node communication (clustering)
EXPOSE 8080
EXPOSE 38888

# Set the environment variables for the server configuration
# Adjust these as necessary for your deployment
ENV RAVEN_License_Eula_Accepted=true
ENV RAVEN_Setup_Mode=None

# Optional: Set the working directory if needed
WORKDIR /opt/ravendb

# Optional: Add any custom configuration or initialization scripts
# COPY init.sh /usr/local/bin/
# RUN chmod +x /usr/local/bin/init.sh
# CMD ["init.sh"]

# Define the default command to start RavenDB
CMD ["ravendb"]
