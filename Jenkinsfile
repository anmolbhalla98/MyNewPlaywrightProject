pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/anmolbhalla98/MyNewPlaywrightProject.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }
        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install --with-deps'
            }
        }
        stage('Run Tests') {
            steps {
                bat 'npx playwright test'
            }
        }
    }
    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true
        }
    }
}
