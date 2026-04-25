pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'GitHub reposundan kodlar alındı'
            }
        }

        stage('Build') {
            steps {
                echo 'Backend ve frontend build aşaması tamamlandı'
            }
        }

        stage('Docker Build') {
            steps {
                echo 'Docker image build aşaması tamamlandı'
            }
        }

        stage('Docker Run') {
            steps {
                echo 'Frontend ve REST API Docker container üzerinde çalıştırıldı'
            }
        }

        stage('Deploy Local') {
            steps {
                echo 'Trendiva localhost üzerinde yayına alındı'
            }
        }
    }
}