pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "rosaflores/e-commerce-backend"  
        DOCKER_COMPOSE_FILE = "docker-compose.yml"
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                  
                    git url: 'https://github.com/Chakwan1980/E-commercebackend.git', branch: 'master'
                }
            }
        }

        stage('Build') {
            steps {
                script {
                   
                    sh "docker build -t ${DOCKER_IMAGE} ."
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                   
                    sh "docker-compose -f ${DOCKER_COMPOSE_FILE} run --rm e-commerce-app npm test"
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
              
                    sh "docker-compose -f ${DOCKER_COMPOSE_FILE} up -d"
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline executed successfully!'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
