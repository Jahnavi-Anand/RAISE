pipeline {
    agent any

    environment {
        SONARQUBE_URL      = 'http://localhost:9000'
        SONAR_SCANNER_HOME = 'C:\\sonar-scanner-5.0.1.3006-windows'
        NODEJS_HOME        = 'C:\\Program Files\\nodejs'
    }

    triggers {
        pollSCM('H * * * *')
    }

    stages {
        stage('Install Dependencies') {
            steps {
                withEnv(["PATH=${env.NODEJS_HOME};${env.PATH}"]) {
                    bat 'npm install'
                }
            }
        }

        stage('SonarQube Analysis') {
    environment {
        SONAR_TOKEN = credentials('sonar-raise-token')  // ID from Jenkins, not the token value
    }
    steps {
        withSonarQubeEnv('SonarQube') {
            bat "\"${env.SONAR_SCANNER_HOME}\\bin\\sonar-scanner.bat\" " +
                "-Dsonar.projectKey=RAISE " +
                "-Dsonar.host.url=${env.SONARQUBE_URL} " +
                "-Dsonar.login=%SONAR_TOKEN%"
        }
    }
}


        stage('Build') {
            steps {
                withEnv(["PATH=${env.NODEJS_HOME};${env.PATH}"]) {
                    bat 'npm run build'
                }
            }
            post {
                success {
                    archiveArtifacts artifacts: 'build/**', allowEmptyArchive: true
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
