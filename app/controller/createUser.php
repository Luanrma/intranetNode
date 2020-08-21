<?php

require_once ('../model/User.php');

//$senha = $_POST["inputSenha"];
//$verificaSenha = $_POST["inputVerificaSenha"];
$list = file_get_contents("php://input");

$data = json_decode($list, true);

$name  = $data["inputNome"];
$email = $data["inputEmail"];
$pass  = $data["inputSenha"];
//if ($senha === $verificaSenha && $senha != null && $verificaSenha != null) {
        $objUser = new Sql();

        $objUser->setName($name);
        $objUser->setEmail($email);
        $objUser->setPass($pass);
        $objUser->createUser();

    
//} else {
  //  $_SESSION['msgErro'] = 'Senhas diferentes';
    //header('Location:../view/cadastroPessoa.php');
//    exit();
//}