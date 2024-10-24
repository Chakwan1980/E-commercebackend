pipeline {
    agent any

    environment {
        // Define any environment variables here
        DOCKER_IMAGE = 'ecommerce-app:latest'
        DOCKER_REGISTRY = 'docker.io' // Cambia esto si usas otro registro
    }

    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/Chakwan1980/E-commercebackend.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Construir la imagen de Docker
                    docker.build(DOCKER_IMAGE)
                }
            }
        }

        stage('Run Unit Tests') {
            steps {
                script {
                    // Ejecutar pruebas unitarias
                    def app = docker.image(DOCKER_IMAGE)
                    app.inside {
                        sh 'npm install'  // Instala las dependencias
                        sh 'npm test'     // Ejecuta las pruebas
                    }
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    // Opcional: Inicia sesión en el registro de Docker
                    sh "echo $DOCKER_PASSWORD | docker login $DOCKER_REGISTRY -u $DOCKER_USERNAME --password-stdin"

                    // Etiqueta la imagen y súbela al registro
                    sh "docker tag $DOCKER_IMAGE $DOCKER_REGISTRY/$DOCKER_USERNAME/$DOCKER_IMAGE"
                    sh "docker push $DOCKER_REGISTRY/$DOCKER_USERNAME/$DOCKER_IMAGE"
                }
            }
        }

        stage('Deploy') {
            steps {
                // Aquí puedes agregar los pasos para implementar tu aplicación
                echo 'Deploying the application...'
                // Por ejemplo, usando kubectl o cualquier otra herramienta
            }
        }
    }

    post {
        always {
            // Limpieza
            cleanWs()
        }
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
