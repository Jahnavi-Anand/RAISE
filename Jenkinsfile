pipeline {
    agent {label 'windows'}
    environment {
        SONARQUBE_URL = 'http://localhost:9000'   
        SONAR_SCANNER_HOME = 'C:\\sonar-scanner-5.0.1.3006-windows' 
        NODEJS_HOME = 'C:\\Program Files\\nodejs'
    }
    triggers {
        pollSCM('H * * * *') 
    }
    stages {
        stage('Clone Repo') {
            steps {
                git branch: 'main', url: 'https://github.com/Jahnavi-Anand/RAISE.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                // Run npm install in the workspace root or adjust directory as required
                bat "\"${env.NODEJS_HOME}\\npm\" install"
            }
        }
        stage('Run App') {
            steps {
                bat "\"${env.NODEJS_HOME}\\npm\" start"
            }
        }
        stage('SonarQube Analysis') {
            environment {
                SONAR_TOKEN = credentials('sqp_43e00e0ade2d499ce17739735c05a0a9419e7679') 
            }
            steps {
                withSonarQubeEnv('SonarQube') {
                    bat "\"${env.SONAR_SCANNER_HOME}\\bin\\sonar-scanner.bat\" -Dsonar.projectKey=RAISE -Dsonar.host.url=${env.SONARQUBE_URL} -Dsonar.login=${env.SONAR_TOKEN}"
                }
            }
        }
        stage('Build') {
            steps {
                bat "\"${env.NODEJS_HOME}\\npm\" run build"
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
