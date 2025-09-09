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
                // Run tests with HTML report generation
                bat 'npx playwright test --reporter=html'
            }
        }
    }

    post {
        always {
            // Archive all Playwright reports
            archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true

            // Publish HTML report in Jenkins UI (requires HTML Publisher Plugin)
            publishHTML([
                allowMissing: true,
                reportName: 'Playwright HTML Report',
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                keepAll: true,
                alwaysLinkToLastBuild: true
            ])

            // Email notification (ready to work once SMTP is configured)
        //     mail to: 'anmolbhalla98@gmail.com',
        //          subject: "Jenkins Build ${currentBuild.fullDisplayName}",
        //          body: "Build ${currentBuild.fullDisplayName} finished with status: ${currentBuild.currentResult}"
        // }
    }
}
