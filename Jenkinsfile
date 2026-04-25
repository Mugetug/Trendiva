pipeline {
    agent any

    stages {
        stage('Project Ready') {
            steps {
                echo 'Trendiva project hazır'
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker compose build'
            }
        }

        stage('Docker Run') {
            steps {
                sh 'docker compose up -d'
            }
        }
    }
}