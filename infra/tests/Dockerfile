# Using official python runtime base image
FROM python:2.7.18-alpine3.11

ENV AWS_REGION us-east-1
ENV AWS_ACCESS_KEY_ID none
ENV AWS_SECRET_ACCESS_KEY none

# Set the application directory
WORKDIR /app

# Install our requirements.txt
ADD requirements.txt /app/requirements.txt
RUN pip install -r requirements.txt

COPY test.py /app

CMD python test.py