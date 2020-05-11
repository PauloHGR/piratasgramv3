# piratasgramv3
Trabalho 3 da matéria de desenvolvimento de software para Nuvem da MDCC UFC

O presente trabalho consiste na Implantação de uma rede social, usando os conceitos de Docker e Docker-compose.

Segue abaixo os passos necessários para rodar a seguinte aplicação:

1 - Baixe e instale o docker e o docker-compose em sua máquina
  https://docs.docker.com/get-docker/
  https://docs.docker.com/compose/install/

2 - Crie um diretorio, clone este repositorio e depois entre na pasta
  git clone https://github.com/PauloHGR/piratasgramv3.git

3 - rode o seguinte comando:
  sudo docker-compose up -d
  
  Com esse comando o docker-compose irá instalar os containers da aplicação e também do banco de dados Mysql. O arquivo de  build da aplicação está definido no arquivo Dockerfile na pasta corrente. Assim que finalizar os containers serão inicializados e estarão em execução. Porém a aplicação não estará pronta, pois o docker-compose instanciou apenas o container com banco de dados, faltando a criação das tabelas.
  
 4 - Para iniciar a instanciação das tabelas, finalize os containers com o comando:
  sudo docker-compose down
  
 5 - rode o comando:
  sudo docker-compose up
  
  Esse comando sobe novamente os containers. Isso força o sequelize a criar finalmente as tabelas.
  
 6 - Para armazenar as fotos e as curtidas, serão utlizados os serviços da Google Cloud Plataform: Cloud Storage e Datastore respectivamente. Para utilizá-las as credenciais de acesso devem ser coladas na pasta raiz da aplicação.
 
 7 - No arquivo docker-compose.yaml, deve se alterar as seguintes váriaveis
    GOOGLE_APPLICATION_CREDENTIALS e GCLOUD_PROJECT, de acordo com o seu respectivo projeto do GCP.

