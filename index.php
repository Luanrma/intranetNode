<?php
/*require_once("vendor/autoload.php");

//require 'Slim/Slim.php';
//\Slim\Slim::registerAutoloader();

$app = new \Slim\App();

$app->get('/', function ($request, $response, $args) {
    header('Location:views/topics.html');
});

$app->get('/topic-create', function ($request, $response, $args) {
    header('Location:views/topic-create.html');
});

$app->run();*/

require_once("app/config/config.php");

/*$sql = new User();

$usuarios = $sql->select("SELECT * FROM users");

echo json_encode($usuarios);*/

//Busca pelo ID
//$root = new User();
//$root->loadById(3);
//echo $root;

//Busca todos
//$list = User::getList();
//echo json_encode($list);

//Busca pelo LIKE
//$search = User::search("Lu");
//echo json_encode($search);

//Carrega um usuário usando email e senha
$user = new User();
$user->login("teste@hotmail.com", "123" );
echo $user;