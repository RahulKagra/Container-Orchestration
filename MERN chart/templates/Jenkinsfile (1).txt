pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = 'github-creds-jigar' // Jenkins credentials ID
        DOCKERHUB_REPO = 'jigarmalam'
        BACKEND_IMAGE = 'mern-be'
        FRONTEND_IMAGE = 'mern-fe'
        HELM_RELEASE = 'mern-app'
        HELM_CHART = './mern-chart'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/JigarMalam/mern-helm-project.git'
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                script {
                    docker.build("${DOCKERHUB_REPO}/${BACKEND_IMAGE}:latest", "./learnerReportCS_backend")
                }
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                script {
                    docker.build("${DOCKERHUB_REPO}/${FRONTEND_IMAGE}:latest", "./learnerReportCS_frontend")
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', DOCKERHUB_CREDENTIALS) {
                        docker.image("${DOCKERHUB_REPO}/${BACKEND_IMAGE}:latest").push()
                        docker.image("${DOCKERHUB_REPO}/${FRONTEND_IMAGE}:latest").push()
                    }
                }
            }
        }

        stage('Deploy with Helm') {
            steps {
                withCredentials([file(credentialsId: 'kubeconfig-jenkins', variable: 'KUBECONFIG_FILE')]) {
                    script {
                        env.KUBECONFIG = "${KUBECONFIG_FILE}"

                        sh '''
                            echo "Using KUBECONFIG at $KUBECONFIG"
                            kubectl config current-context
                            kubectl get nodes
                            helm upgrade --install ${HELM_RELEASE} ${HELM_CHART}
                        '''
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline Completed Successfully!'
        }
        failure {
            echo 'Pipeline Failed! Check the logs.'
        }
    }
}
